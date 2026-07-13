import { spawnSync } from "node:child_process";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { delimiter, dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import oracledb from "oracledb";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(__dirname, "..", ".env"));

const PORT = Number(process.env.API_PORT ?? 3001);
const MAX_BODY_SIZE = 1_000_000;
const BOOKING_TYPES = new Set(["DOCTOR_APPOINTMENT", "HEALTH_CHECKUP"]);
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

let poolPromise = null;
let oracleClientInitialized = false;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function ensureOracleClient() {
  if (oracleClientInitialized) {
    return;
  }

  oracleClientInitialized = true;

  const libDir = process.env.ORACLE_CLIENT_LIB_DIR;
  if (libDir) {
    oracledb.initOracleClient({ libDir });
  }
}

async function getPool() {
  if (poolPromise) {
    return poolPromise;
  }

  const user = process.env.ORACLE_USER;
  const password = process.env.ORACLE_PASSWORD;
  const connectString = process.env.ORACLE_CONNECTION_STRING;

  if (!user || !password || !connectString) {
    throw new Error(
      "Oracle connection settings are missing. Set ORACLE_USER, ORACLE_PASSWORD, and ORACLE_CONNECTION_STRING.",
    );
  }

  ensureOracleClient();

  poolPromise = oracledb.createPool({
    user,
    password,
    connectString,
    poolMin: 0,
    poolMax: 10,
    poolIncrement: 1,
    stmtCacheSize: 20,
  });

  return poolPromise;
}

async function closePool() {
  if (!poolPromise) {
    return;
  }

  const pool = await poolPromise;
  await pool.close(10);
  poolPromise = null;
}

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing.`);
  }

  return value;
}

function getDatabaseDriver() {
  return normalizeString(process.env.BOOKINGS_DB_DRIVER || "oracledb").toLowerCase();
}

function getAdminUsername() {
  return getRequiredEnv("ADMIN_USERNAME");
}

function getAdminPassword() {
  return getRequiredEnv("ADMIN_PASSWORD");
}

function getAdminAuthSecret() {
  return process.env.ADMIN_AUTH_SECRET || process.env.AUTH_TOKEN_SECRET || "arogya-admin-secret";
}

function toBase64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
}

function signAdminToken(payload) {
  const body = toBase64Url(JSON.stringify(payload));
  const signature = toBase64Url(
    createHmac("sha256", getAdminAuthSecret()).update(body).digest(),
  );

  return `${body}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [body, signature] = parts;
  const expectedSignature = toBase64Url(
    createHmac("sha256", getAdminAuthSecret()).update(body).digest(),
  );

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(body));

    if (!payload || payload.role !== "admin" || typeof payload.exp !== "number") {
      return null;
    }

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function issueAdminSession(username) {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + ADMIN_SESSION_TTL_MS;
  const payload = {
    sub: username,
    role: "admin",
    iat: issuedAt,
    exp: expiresAt,
  };

  return {
    accessToken: signAdminToken(payload),
    tokenType: "Bearer",
    username,
    role: "admin",
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

function getBearerToken(req) {
  const header = req.headers.authorization;

  if (!header) {
    return "";
  }

  const [scheme, token] = header.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return "";
  }

  return token.trim();
}

function requireAdmin(req, res) {
  const token = getBearerToken(req);
  const payload = verifyAdminToken(token);

  if (!payload) {
    writeJson(res, 401, { message: "Unauthorized. Please sign in again." });
    return null;
  }

  return payload;
}

function writeJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = "";
    let totalBytes = 0;

    req.on("data", (chunk) => {
      rawBody += chunk.toString("utf8");
      totalBytes += Buffer.byteLength(chunk);

      if (totalBytes > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });

    req.on("error", reject);
  });
}

function normalizeBooking(body) {
  const preferredTimeSlot =
    normalizeString(body.preferredTimeSlot) ||
    normalizeString(body.timeSlot) ||
    normalizeString(body.preferredTime);

  const notes =
    normalizeString(body.notes) ||
    normalizeString(body.message) ||
    normalizeString(body.symptoms);

  return {
    bookingType: normalizeString(body.bookingType),
    sourceForm: normalizeString(body.sourceForm),
    fullName: normalizeString(body.fullName),
    mobileNumber: normalizeString(body.mobileNumber),
    email: normalizeString(body.email),
    dob: normalizeString(body.dob),
    gender: normalizeString(body.gender),
    department: normalizeString(body.department),
    doctor: normalizeString(body.doctor),
    checkupPackage: normalizeString(body.checkupPackage),
    consultationType: normalizeString(body.consultationType),
    consultationMode: normalizeString(body.consultationMode),
    preferredDate: normalizeString(body.preferredDate),
    preferredTimeSlot,
    alternateDate: normalizeString(body.alternateDate),
    symptoms: normalizeString(body.symptoms) || normalizeString(body.message),
    existingCondition: normalizeString(body.existingCondition),
    patientId: normalizeString(body.patientId),
    location: normalizeString(body.location),
    city: normalizeString(body.city),
    insuranceRequired: normalizeString(body.insuranceRequired),
    insuranceProvider: normalizeString(body.insuranceProvider),
    whatsappUpdates: body.whatsappUpdates === true || body.whatsappUpdates === "true",
    consent: body.consent === true || body.consent === "true",
    notes,
  };
}

function validateBooking(booking) {
  const errors = [];

  if (!BOOKING_TYPES.has(booking.bookingType)) {
    errors.push("bookingType must be DOCTOR_APPOINTMENT or HEALTH_CHECKUP.");
  }

  if (!booking.sourceForm) {
    errors.push("sourceForm is required.");
  }

  if (booking.fullName.length < 2) {
    errors.push("fullName is required.");
  }

  if (booking.mobileNumber.replace(/\D/g, "").length < 10) {
    errors.push("mobileNumber must contain at least 10 digits.");
  }

  if (!booking.preferredDate) {
    errors.push("preferredDate is required.");
  }

  if (!booking.preferredTimeSlot) {
    errors.push("preferredTimeSlot is required.");
  }

  if (!booking.consent) {
    errors.push("consent must be true.");
  }

  if (booking.bookingType === "DOCTOR_APPOINTMENT" && !booking.department) {
    errors.push("department is required for doctor appointments.");
  }

  if (booking.bookingType === "HEALTH_CHECKUP" && !booking.checkupPackage) {
    errors.push("checkupPackage is required for checkup bookings.");
  }

  return errors;
}

function getJdbcDriverJarPath() {
  return (
    process.env.BOOKINGS_JDBC_DRIVER_JAR ||
    "C:\\oracle\\product\\10.2.0\\db_2\\jdbc\\lib\\ojdbc14.jar"
  );
}

function getJavaExecutablePath() {
  return process.env.BOOKINGS_JAVA_PATH || "java";
}

function getJavacExecutablePath() {
  return process.env.BOOKINGS_JAVAC_PATH || "javac";
}

function inferJdbcUrl(connectString) {
  if (connectString.startsWith("jdbc:")) {
    return connectString;
  }

  const match = connectString.match(/^([^:/\s]+)(?::(\d+))?[/:]([^/\s]+)$/);

  if (!match) {
    throw new Error(
      `Unsupported ORACLE_CONNECTION_STRING format: ${connectString}. Use host:port/SID.`,
    );
  }

  const [, host, port = "1521", sid] = match;
  return `jdbc:oracle:thin:@${host}:${port}:${sid}`;
}

function encodePropertyValue(value) {
  return Buffer.from(String(value ?? ""), "utf8").toString("base64");
}

function buildJdbcPayload(booking) {
  const properties = {
    bookingType: booking.bookingType,
    sourceForm: booking.sourceForm,
    fullName: booking.fullName,
    mobileNumber: booking.mobileNumber,
    email: booking.email,
    dob: booking.dob,
    gender: booking.gender,
    department: booking.department,
    doctor: booking.doctor === "Any" ? "" : booking.doctor,
    checkupPackage: booking.checkupPackage,
    consultationType: booking.consultationType,
    consultationMode: booking.consultationMode,
    preferredDate: booking.preferredDate,
    preferredTimeSlot: booking.preferredTimeSlot,
    alternateDate: booking.alternateDate,
    symptoms: booking.symptoms,
    existingCondition: booking.existingCondition,
    patientId: booking.patientId,
    location: booking.location,
    city: booking.city,
    insuranceRequired: booking.insuranceRequired,
    insuranceProvider: booking.insuranceProvider,
    whatsappUpdates: booking.whatsappUpdates ? "true" : "false",
    consent: booking.consent ? "true" : "false",
    notes: booking.notes,
  };

  return Object.entries(properties)
    .map(([key, value]) => `${key}=${encodePropertyValue(value)}`)
    .join("\n");
}

function ensureJdbcHelperCompiled() {
  const sourcePath = resolve(__dirname, "java", "OracleBookingWriter.java");
  const outputDir = resolve(__dirname, "java", "bin");
  const classPath = resolve(outputDir, "OracleBookingWriter.class");
  const jdbcJarPath = getJdbcDriverJarPath();

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing JDBC helper source at ${sourcePath}.`);
  }

  const sourceMtime = statSync(sourcePath).mtimeMs;
  const classMtime = existsSync(classPath) ? statSync(classPath).mtimeMs : 0;

  if (classMtime >= sourceMtime) {
    return { outputDir, jdbcJarPath };
  }

  mkdirSync(outputDir, { recursive: true });

  const compileResult = spawnSync(
    getJavacExecutablePath(),
    ["-cp", jdbcJarPath, "-d", outputDir, sourcePath],
    {
      encoding: "utf8",
      windowsHide: true,
    },
  );

  if (compileResult.status !== 0) {
    throw new Error(
      (compileResult.stderr || compileResult.stdout || "Failed to compile JDBC helper.").trim(),
    );
  }

  return { outputDir, jdbcJarPath };
}

function runJdbcHelper(action, payload, env) {
  const helper = ensureJdbcHelperCompiled();
  const classpath = `${helper.outputDir}${delimiter}${helper.jdbcJarPath}`;
  const javaResult = spawnSync(
    getJavaExecutablePath(),
    ["-cp", classpath, "OracleBookingWriter"],
    {
      encoding: "utf8",
      input: payload,
      env: {
        ...env,
        JDBC_ACTION: action,
      },
      windowsHide: true,
    },
  );

  if (javaResult.error) {
    throw javaResult.error;
  }

  if (javaResult.status !== 0) {
    throw new Error(
      (javaResult.stderr || javaResult.stdout || "Java JDBC helper failed.").trim(),
    );
  }

  return javaResult.stdout;
}

async function createBookingWithJdbc(booking) {
  const jdbcUrl = inferJdbcUrl(getRequiredEnv("ORACLE_CONNECTION_STRING"));
  const user = getRequiredEnv("ORACLE_USER");
  const password = getRequiredEnv("ORACLE_PASSWORD");
  const payload = buildJdbcPayload(booking);

  const output = runJdbcHelper("INSERT_BOOKING", payload, {
    ...process.env,
    JDBC_URL: jdbcUrl,
    JDBC_USER: user,
    JDBC_PASSWORD: password,
  });

  const bookingIdMatch = output.match(/BOOKING_ID=(\d+)/);

  if (!bookingIdMatch) {
    throw new Error("Booking was saved, but the JDBC helper did not return a booking id.");
  }

  const bookingId = Number(bookingIdMatch[1]);

  return {
    bookingId,
    referenceCode: `BK-${String(bookingId).padStart(6, "0")}`,
  };
}

async function listBookingsWithJdbc() {
  const jdbcUrl = inferJdbcUrl(getRequiredEnv("ORACLE_CONNECTION_STRING"));
  const user = getRequiredEnv("ORACLE_USER");
  const password = getRequiredEnv("ORACLE_PASSWORD");
  const output = runJdbcHelper(
    "LIST_BOOKINGS",
    "",
    {
      ...process.env,
      JDBC_URL: jdbcUrl,
      JDBC_USER: user,
      JDBC_PASSWORD: password,
    },
  );

  const parsed = JSON.parse(output);

  if (!Array.isArray(parsed)) {
    throw new Error("The JDBC helper returned an invalid bookings payload.");
  }

  return parsed;
}

function normalizeOracleDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return normalizeString(value) || null;
}

function normalizeOracleTimestamp(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return normalizeString(value) || null;
}

function normalizeBookingRow(row) {
  const bookingId = Number(row.ID ?? row.bookingId ?? 0);

  return {
    bookingId,
    referenceCode: `BK-${String(bookingId).padStart(6, "0")}`,
    bookingType: row.BOOKING_TYPE ?? row.bookingType ?? null,
    sourceForm: row.SOURCE_FORM ?? row.sourceForm ?? null,
    fullName: row.FULL_NAME ?? row.fullName ?? null,
    mobileNumber: row.MOBILE_NUMBER ?? row.mobileNumber ?? null,
    email: row.EMAIL ?? row.email ?? null,
    dateOfBirth: normalizeOracleDate(row.DATE_OF_BIRTH ?? row.dateOfBirth),
    gender: row.GENDER ?? row.gender ?? null,
    department: row.DEPARTMENT ?? row.department ?? null,
    doctorName: row.DOCTOR_NAME ?? row.doctorName ?? null,
    checkupPackage: row.CHECKUP_PACKAGE ?? row.checkupPackage ?? null,
    consultationType: row.CONSULTATION_TYPE ?? row.consultationType ?? null,
    consultationMode: row.CONSULTATION_MODE ?? row.consultationMode ?? null,
    preferredDate: normalizeOracleDate(row.PREFERRED_DATE ?? row.preferredDate),
    preferredTimeSlot: row.PREFERRED_TIME_SLOT ?? row.preferredTimeSlot ?? null,
    alternateDate: normalizeOracleDate(row.ALTERNATE_DATE ?? row.alternateDate),
    symptoms: row.SYMPTOMS ?? row.symptoms ?? null,
    existingCondition: row.EXISTING_CONDITION ?? row.existingCondition ?? null,
    patientId: row.PATIENT_ID ?? row.patientId ?? null,
    branchLocation: row.BRANCH_LOCATION ?? row.branchLocation ?? null,
    city: row.CITY ?? row.city ?? null,
    insuranceRequired: row.INSURANCE_REQUIRED ?? row.insuranceRequired ?? null,
    insuranceProvider: row.INSURANCE_PROVIDER ?? row.insuranceProvider ?? null,
    whatsappUpdates: Number(row.WHATSAPP_UPDATES ?? row.whatsappUpdates ?? 0) === 1,
    consent: Number(row.CONSENT ?? row.consent ?? 0) === 1,
    notes: row.NOTES ?? row.notes ?? null,
    status: row.STATUS ?? row.status ?? "PENDING",
    createdAt: normalizeOracleTimestamp(row.CREATED_AT ?? row.createdAt),
    updatedAt: normalizeOracleTimestamp(row.UPDATED_AT ?? row.updatedAt),
  };
}

async function listBookingsWithOracleDb() {
  const pool = await getPool();
  const connection = await pool.getConnection();

  try {
    const result = await connection.execute(
      `
        SELECT
          ID,
          BOOKING_TYPE,
          SOURCE_FORM,
          FULL_NAME,
          MOBILE_NUMBER,
          EMAIL,
          DATE_OF_BIRTH,
          GENDER,
          DEPARTMENT,
          DOCTOR_NAME,
          CHECKUP_PACKAGE,
          CONSULTATION_TYPE,
          CONSULTATION_MODE,
          PREFERRED_DATE,
          PREFERRED_TIME_SLOT,
          ALTERNATE_DATE,
          SYMPTOMS,
          EXISTING_CONDITION,
          PATIENT_ID,
          BRANCH_LOCATION,
          CITY,
          INSURANCE_REQUIRED,
          INSURANCE_PROVIDER,
          WHATSAPP_UPDATES,
          CONSENT,
          NOTES,
          STATUS,
          CREATED_AT,
          UPDATED_AT
        FROM BOOKINGS
        ORDER BY CREATED_AT DESC, ID DESC
      `,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    return (result.rows ?? []).map(normalizeBookingRow);
  } finally {
    await connection.close();
  }
}

async function listBookings() {
  const databaseDriver = getDatabaseDriver();

  if (databaseDriver === "jdbc" || databaseDriver === "sqlplus") {
    return listBookingsWithJdbc();
  }

  return listBookingsWithOracleDb();
}

async function createBookingWithOracleDb(booking) {
  const pool = await getPool();
  const connection = await pool.getConnection();

  try {
    const result = await connection.execute(
      `
        INSERT INTO BOOKINGS (
          BOOKING_TYPE,
          SOURCE_FORM,
          FULL_NAME,
          MOBILE_NUMBER,
          EMAIL,
          DATE_OF_BIRTH,
          GENDER,
          DEPARTMENT,
          DOCTOR_NAME,
          CHECKUP_PACKAGE,
          CONSULTATION_TYPE,
          CONSULTATION_MODE,
          PREFERRED_DATE,
          PREFERRED_TIME_SLOT,
          ALTERNATE_DATE,
          SYMPTOMS,
          EXISTING_CONDITION,
          PATIENT_ID,
          BRANCH_LOCATION,
          CITY,
          INSURANCE_REQUIRED,
          INSURANCE_PROVIDER,
          WHATSAPP_UPDATES,
          CONSENT,
          NOTES,
          STATUS
        ) VALUES (
          :bookingType,
          :sourceForm,
          :fullName,
          :mobileNumber,
          NULLIF(:email, ''),
          CASE WHEN :dob IS NULL OR :dob = '' THEN NULL ELSE TO_DATE(:dob, 'YYYY-MM-DD') END,
          NULLIF(:gender, ''),
          NULLIF(:department, ''),
          NULLIF(:doctor, ''),
          NULLIF(:checkupPackage, ''),
          NULLIF(:consultationType, ''),
          NULLIF(:consultationMode, ''),
          CASE WHEN :preferredDate IS NULL OR :preferredDate = '' THEN NULL ELSE TO_DATE(:preferredDate, 'YYYY-MM-DD') END,
          NULLIF(:preferredTimeSlot, ''),
          CASE WHEN :alternateDate IS NULL OR :alternateDate = '' THEN NULL ELSE TO_DATE(:alternateDate, 'YYYY-MM-DD') END,
          NULLIF(:symptoms, ''),
          NULLIF(:existingCondition, ''),
          NULLIF(:patientId, ''),
          NULLIF(:location, ''),
          NULLIF(:city, ''),
          NULLIF(:insuranceRequired, ''),
          NULLIF(:insuranceProvider, ''),
          :whatsappUpdates,
          :consent,
          NULLIF(:notes, ''),
          'PENDING'
        )
        RETURNING ID INTO :bookingId
      `,
      {
        bookingType: booking.bookingType,
        sourceForm: booking.sourceForm,
        fullName: booking.fullName,
        mobileNumber: booking.mobileNumber,
        email: booking.email,
        dob: booking.dob,
        gender: booking.gender,
        department: booking.department,
        doctor: booking.doctor === "Any" ? "" : booking.doctor,
        checkupPackage: booking.checkupPackage,
        consultationType: booking.consultationType,
        consultationMode: booking.consultationMode,
        preferredDate: booking.preferredDate,
        preferredTimeSlot: booking.preferredTimeSlot,
        alternateDate: booking.alternateDate,
        symptoms: booking.symptoms,
        existingCondition: booking.existingCondition,
        patientId: booking.patientId,
        location: booking.location,
        city: booking.city,
        insuranceRequired: booking.insuranceRequired,
        insuranceProvider: booking.insuranceProvider,
        whatsappUpdates: booking.whatsappUpdates ? 1 : 0,
        consent: booking.consent ? 1 : 0,
        notes: booking.notes,
        bookingId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      },
      { autoCommit: true },
    );

    const returnedId = Array.isArray(result.outBinds?.bookingId)
      ? result.outBinds.bookingId[0]
      : result.outBinds?.bookingId;
    const bookingId = Number(returnedId);

    return {
      bookingId,
      referenceCode: `BK-${String(bookingId).padStart(6, "0")}`,
    };
  } finally {
    await connection.close();
  }
}

async function createBooking(booking) {
  const databaseDriver = getDatabaseDriver();

  if (databaseDriver === "jdbc" || databaseDriver === "sqlplus") {
    return createBookingWithJdbc(booking);
  }

  return createBookingWithOracleDb(booking);
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    writeJson(res, 400, { message: "Missing request URL." });
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && requestUrl.pathname === "/api/health") {
    writeJson(res, 200, {
      ok: true,
      service: "arogya-bookings-api",
    });
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/admin/login") {
    try {
      const body = await parseBody(req);
      const username = normalizeString(body.username);
      const password = normalizeString(body.password);

      if (!username || !password) {
        writeJson(res, 400, { message: "Username and password are required." });
        return;
      }

      if (username !== getAdminUsername() || password !== getAdminPassword()) {
        writeJson(res, 401, { message: "Invalid username or password." });
        return;
      }

      writeJson(res, 200, {
        message: "Signed in successfully.",
        ...issueAdminSession(username),
      });
      return;
    } catch (error) {
      writeJson(res, 500, {
        message: error instanceof Error ? error.message : "Failed to sign in.",
      });
      return;
    }
  }

  if (req.method === "POST" && requestUrl.pathname === "/api/bookings") {
    try {
      const body = await parseBody(req);
      const booking = normalizeBooking(body);
      const errors = validateBooking(booking);

      if (errors.length > 0) {
        writeJson(res, 400, {
          message: "Please fix the highlighted booking details.",
          errors,
        });
        return;
      }

      const bookingRecord = await createBooking(booking);

      writeJson(res, 201, {
        bookingId: bookingRecord.bookingId,
        referenceCode: bookingRecord.referenceCode,
        message: "Booking saved successfully.",
      });
      return;
    } catch (error) {
      writeJson(res, 500, {
        message: error instanceof Error ? error.message : "Failed to save booking.",
      });
      return;
    }
  }

  if (req.method === "GET" && requestUrl.pathname === "/api/bookings") {
    try {
      const admin = requireAdmin(req, res);

      if (!admin) {
        return;
      }

      const bookings = await listBookings();

      writeJson(res, 200, {
        bookings,
      });
      return;
    } catch (error) {
      writeJson(res, 500, {
        message: error instanceof Error ? error.message : "Failed to load bookings.",
      });
      return;
    }
  }

  writeJson(res, 404, { message: "Route not found." });
});

server.listen(PORT, () => {
  console.log(`Bookings API is listening on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await closePool();
  server.close(() => process.exit(0));
});

process.on("SIGTERM", async () => {
  await closePool();
  server.close(() => process.exit(0));
});
