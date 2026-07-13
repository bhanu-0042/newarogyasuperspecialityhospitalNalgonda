import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Properties;
import java.util.TimeZone;

public final class OracleBookingWriter {
    private static final String[] REQUIRED_STRING_FIELDS = new String[] {
        "bookingType",
        "sourceForm",
        "fullName",
        "mobileNumber",
        "email",
        "dob",
        "gender",
        "department",
        "doctor",
        "checkupPackage",
        "consultationType",
        "consultationMode",
        "preferredDate",
        "preferredTimeSlot",
        "alternateDate",
        "symptoms",
        "existingCondition",
        "patientId",
        "location",
        "city",
        "insuranceRequired",
        "insuranceProvider",
        "notes"
    };

    private OracleBookingWriter() {
    }

    public static void main(String[] args) throws Exception {
        String action = normalize(System.getenv("JDBC_ACTION"));
        Properties encoded = new Properties();
        try (InputStream inputStream = System.in;
             InputStreamReader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {
            encoded.load(reader);
        }

        String jdbcUrl = requiredEnv("JDBC_URL");
        String jdbcUser = requiredEnv("JDBC_USER");
        String jdbcPassword = requiredEnv("JDBC_PASSWORD");

        Class.forName("oracle.jdbc.driver.OracleDriver");

        try (Connection connection = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPassword)) {
            if ("LIST_BOOKINGS".equalsIgnoreCase(action)) {
                System.out.println(toJson(listBookings(connection)));
                return;
            }

            connection.setAutoCommit(false);

            int bookingId = nextBookingId(connection);

            try (PreparedStatement statement = connection.prepareStatement(
                "INSERT INTO BOOKINGS (" +
                    "ID, BOOKING_TYPE, SOURCE_FORM, FULL_NAME, MOBILE_NUMBER, EMAIL, DATE_OF_BIRTH, GENDER, " +
                    "DEPARTMENT, DOCTOR_NAME, CHECKUP_PACKAGE, CONSULTATION_TYPE, CONSULTATION_MODE, " +
                    "PREFERRED_DATE, PREFERRED_TIME_SLOT, ALTERNATE_DATE, SYMPTOMS, EXISTING_CONDITION, " +
                    "PATIENT_ID, BRANCH_LOCATION, CITY, INSURANCE_REQUIRED, INSURANCE_PROVIDER, " +
                    "WHATSAPP_UPDATES, CONSENT, NOTES, STATUS" +
                ") VALUES (" +
                    "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?" +
                ")"
            )) {
                int parameterIndex = 1;
                statement.setInt(parameterIndex++, bookingId);
                statement.setString(parameterIndex++, decode(encoded, "bookingType"));
                statement.setString(parameterIndex++, decode(encoded, "sourceForm"));
                statement.setString(parameterIndex++, decode(encoded, "fullName"));
                statement.setString(parameterIndex++, decode(encoded, "mobileNumber"));
                setNullableString(statement, parameterIndex++, decode(encoded, "email"));
                setNullableDate(statement, parameterIndex++, decode(encoded, "dob"));
                setNullableString(statement, parameterIndex++, decode(encoded, "gender"));
                setNullableString(statement, parameterIndex++, decode(encoded, "department"));
                setNullableString(statement, parameterIndex++, decode(encoded, "doctor"));
                setNullableString(statement, parameterIndex++, decode(encoded, "checkupPackage"));
                setNullableString(statement, parameterIndex++, decode(encoded, "consultationType"));
                setNullableString(statement, parameterIndex++, decode(encoded, "consultationMode"));
                setNullableDate(statement, parameterIndex++, decode(encoded, "preferredDate"));
                setNullableString(statement, parameterIndex++, decode(encoded, "preferredTimeSlot"));
                setNullableDate(statement, parameterIndex++, decode(encoded, "alternateDate"));
                setNullableString(statement, parameterIndex++, decode(encoded, "symptoms"));
                setNullableString(statement, parameterIndex++, decode(encoded, "existingCondition"));
                setNullableString(statement, parameterIndex++, decode(encoded, "patientId"));
                setNullableString(statement, parameterIndex++, decode(encoded, "location"));
                setNullableString(statement, parameterIndex++, decode(encoded, "city"));
                setNullableString(statement, parameterIndex++, decode(encoded, "insuranceRequired"));
                setNullableString(statement, parameterIndex++, decode(encoded, "insuranceProvider"));
                statement.setInt(parameterIndex++, parseBoolean(encoded, "whatsappUpdates") ? 1 : 0);
                statement.setInt(parameterIndex++, parseBoolean(encoded, "consent") ? 1 : 0);
                setNullableString(statement, parameterIndex++, decode(encoded, "notes"));
                statement.setString(parameterIndex, "PENDING");

                statement.executeUpdate();
            }

            connection.commit();
            System.out.println("BOOKING_ID=" + bookingId);
        }
    }

    private static List<BookingRecord> listBookings(Connection connection) throws Exception {
        List<BookingRecord> bookings = new ArrayList<>();

        try (PreparedStatement statement = connection.prepareStatement(
            "SELECT " +
                "ID, BOOKING_TYPE, SOURCE_FORM, FULL_NAME, MOBILE_NUMBER, EMAIL, DATE_OF_BIRTH, GENDER, " +
                "DEPARTMENT, DOCTOR_NAME, CHECKUP_PACKAGE, CONSULTATION_TYPE, CONSULTATION_MODE, " +
                "PREFERRED_DATE, PREFERRED_TIME_SLOT, ALTERNATE_DATE, SYMPTOMS, EXISTING_CONDITION, " +
                "PATIENT_ID, BRANCH_LOCATION, CITY, INSURANCE_REQUIRED, INSURANCE_PROVIDER, " +
                "WHATSAPP_UPDATES, CONSENT, NOTES, STATUS, CREATED_AT, UPDATED_AT " +
            "FROM BOOKINGS ORDER BY CREATED_AT DESC, ID DESC"
        );
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                bookings.add(BookingRecord.from(resultSet));
            }
        }

        return bookings;
    }

    private static String requiredEnv(String name) {
        String value = System.getenv(name);
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalStateException(name + " is missing.");
        }
        return value;
    }

    private static String normalize(String value) {
        if (value == null) {
            return "";
        }

        return value.trim();
    }

    private static String decode(Properties encoded, String key) {
        String value = encoded.getProperty(key, "");
        if (value.isEmpty()) {
            return "";
        }
        byte[] bytes = Base64.getDecoder().decode(value);
        return new String(bytes, StandardCharsets.UTF_8);
    }

    private static boolean parseBoolean(Properties encoded, String key) {
        return Boolean.parseBoolean(decode(encoded, key));
    }

    private static void setNullableString(PreparedStatement statement, int parameterIndex, String value) throws Exception {
        if (value == null || value.isEmpty()) {
            statement.setNull(parameterIndex, Types.VARCHAR);
            return;
        }
        statement.setString(parameterIndex, value);
    }

    private static void setNullableDate(PreparedStatement statement, int parameterIndex, String value) throws Exception {
        if (value == null || value.isEmpty()) {
            statement.setNull(parameterIndex, Types.DATE);
            return;
        }
        statement.setDate(parameterIndex, java.sql.Date.valueOf(value));
    }

    private static int nextBookingId(Connection connection) throws Exception {
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT BOOKINGS_SEQ.NEXTVAL FROM DUAL")) {
            if (!resultSet.next()) {
                throw new IllegalStateException("Could not allocate a booking id.");
            }
            return resultSet.getInt(1);
        }
    }

    private static String toJson(List<BookingRecord> bookings) {
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        for (int index = 0; index < bookings.size(); index++) {
            if (index > 0) {
                builder.append(",");
            }
            builder.append(bookings.get(index).toJson());
        }
        builder.append("]");
        return builder.toString();
    }

    private static String jsonString(String value) {
        if (value == null) {
            return "null";
        }

        StringBuilder builder = new StringBuilder();
        builder.append("\"");
        for (int index = 0; index < value.length(); index++) {
            char character = value.charAt(index);
            switch (character) {
                case '"':
                    builder.append("\\\"");
                    break;
                case '\\':
                    builder.append("\\\\");
                    break;
                case '\b':
                    builder.append("\\b");
                    break;
                case '\f':
                    builder.append("\\f");
                    break;
                case '\n':
                    builder.append("\\n");
                    break;
                case '\r':
                    builder.append("\\r");
                    break;
                case '\t':
                    builder.append("\\t");
                    break;
                default:
                    if (character < 0x20) {
                        builder.append(String.format("\\u%04x", (int) character));
                    } else {
                        builder.append(character);
                    }
                    break;
            }
        }
        builder.append("\"");
        return builder.toString();
    }

    private static String jsonNumber(Number value) {
        if (value == null) {
            return "null";
        }
        return value.toString();
    }

    private static String jsonBoolean(boolean value) {
        return value ? "true" : "false";
    }

    private static String dateOnly(java.util.Date value) {
        if (value == null) {
            return null;
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        return format.format(value);
    }

    private static String timestamp(java.util.Date value) {
        if (value == null) {
            return null;
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        return format.format(value);
    }

    private static final class BookingRecord {
        private final int bookingId;
        private final String bookingType;
        private final String sourceForm;
        private final String fullName;
        private final String mobileNumber;
        private final String email;
        private final String dateOfBirth;
        private final String gender;
        private final String department;
        private final String doctorName;
        private final String checkupPackage;
        private final String consultationType;
        private final String consultationMode;
        private final String preferredDate;
        private final String preferredTimeSlot;
        private final String alternateDate;
        private final String symptoms;
        private final String existingCondition;
        private final String patientId;
        private final String branchLocation;
        private final String city;
        private final String insuranceRequired;
        private final String insuranceProvider;
        private final boolean whatsappUpdates;
        private final boolean consent;
        private final String notes;
        private final String status;
        private final String createdAt;
        private final String updatedAt;

        private BookingRecord(
            int bookingId,
            String bookingType,
            String sourceForm,
            String fullName,
            String mobileNumber,
            String email,
            String dateOfBirth,
            String gender,
            String department,
            String doctorName,
            String checkupPackage,
            String consultationType,
            String consultationMode,
            String preferredDate,
            String preferredTimeSlot,
            String alternateDate,
            String symptoms,
            String existingCondition,
            String patientId,
            String branchLocation,
            String city,
            String insuranceRequired,
            String insuranceProvider,
            boolean whatsappUpdates,
            boolean consent,
            String notes,
            String status,
            String createdAt,
            String updatedAt
        ) {
            this.bookingId = bookingId;
            this.bookingType = bookingType;
            this.sourceForm = sourceForm;
            this.fullName = fullName;
            this.mobileNumber = mobileNumber;
            this.email = email;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.department = department;
            this.doctorName = doctorName;
            this.checkupPackage = checkupPackage;
            this.consultationType = consultationType;
            this.consultationMode = consultationMode;
            this.preferredDate = preferredDate;
            this.preferredTimeSlot = preferredTimeSlot;
            this.alternateDate = alternateDate;
            this.symptoms = symptoms;
            this.existingCondition = existingCondition;
            this.patientId = patientId;
            this.branchLocation = branchLocation;
            this.city = city;
            this.insuranceRequired = insuranceRequired;
            this.insuranceProvider = insuranceProvider;
            this.whatsappUpdates = whatsappUpdates;
            this.consent = consent;
            this.notes = notes;
            this.status = status;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        private static BookingRecord from(ResultSet resultSet) throws Exception {
            int id = resultSet.getInt("ID");
            return new BookingRecord(
                id,
                resultSet.getString("BOOKING_TYPE"),
                resultSet.getString("SOURCE_FORM"),
                resultSet.getString("FULL_NAME"),
                resultSet.getString("MOBILE_NUMBER"),
                resultSet.getString("EMAIL"),
                dateOnly(resultSet.getDate("DATE_OF_BIRTH")),
                resultSet.getString("GENDER"),
                resultSet.getString("DEPARTMENT"),
                resultSet.getString("DOCTOR_NAME"),
                resultSet.getString("CHECKUP_PACKAGE"),
                resultSet.getString("CONSULTATION_TYPE"),
                resultSet.getString("CONSULTATION_MODE"),
                dateOnly(resultSet.getDate("PREFERRED_DATE")),
                resultSet.getString("PREFERRED_TIME_SLOT"),
                dateOnly(resultSet.getDate("ALTERNATE_DATE")),
                resultSet.getString("SYMPTOMS"),
                resultSet.getString("EXISTING_CONDITION"),
                resultSet.getString("PATIENT_ID"),
                resultSet.getString("BRANCH_LOCATION"),
                resultSet.getString("CITY"),
                resultSet.getString("INSURANCE_REQUIRED"),
                resultSet.getString("INSURANCE_PROVIDER"),
                resultSet.getInt("WHATSAPP_UPDATES") == 1,
                resultSet.getInt("CONSENT") == 1,
                resultSet.getString("NOTES"),
                resultSet.getString("STATUS"),
                timestamp(resultSet.getTimestamp("CREATED_AT")),
                timestamp(resultSet.getTimestamp("UPDATED_AT"))
            );
        }

        private String toJson() {
            StringBuilder builder = new StringBuilder();
            builder.append("{");
            appendField(builder, "bookingId", jsonNumber(bookingId));
            appendField(builder, "referenceCode", jsonString("BK-" + String.format("%06d", bookingId)));
            appendField(builder, "bookingType", jsonString(bookingType));
            appendField(builder, "sourceForm", jsonString(sourceForm));
            appendField(builder, "fullName", jsonString(fullName));
            appendField(builder, "mobileNumber", jsonString(mobileNumber));
            appendField(builder, "email", jsonString(email));
            appendField(builder, "dateOfBirth", jsonString(dateOfBirth));
            appendField(builder, "gender", jsonString(gender));
            appendField(builder, "department", jsonString(department));
            appendField(builder, "doctorName", jsonString(doctorName));
            appendField(builder, "checkupPackage", jsonString(checkupPackage));
            appendField(builder, "consultationType", jsonString(consultationType));
            appendField(builder, "consultationMode", jsonString(consultationMode));
            appendField(builder, "preferredDate", jsonString(preferredDate));
            appendField(builder, "preferredTimeSlot", jsonString(preferredTimeSlot));
            appendField(builder, "alternateDate", jsonString(alternateDate));
            appendField(builder, "symptoms", jsonString(symptoms));
            appendField(builder, "existingCondition", jsonString(existingCondition));
            appendField(builder, "patientId", jsonString(patientId));
            appendField(builder, "branchLocation", jsonString(branchLocation));
            appendField(builder, "city", jsonString(city));
            appendField(builder, "insuranceRequired", jsonString(insuranceRequired));
            appendField(builder, "insuranceProvider", jsonString(insuranceProvider));
            appendField(builder, "whatsappUpdates", jsonBoolean(whatsappUpdates));
            appendField(builder, "consent", jsonBoolean(consent));
            appendField(builder, "notes", jsonString(notes));
            appendField(builder, "status", jsonString(status));
            appendField(builder, "createdAt", jsonString(createdAt));
            appendField(builder, "updatedAt", jsonString(updatedAt));
            removeTrailingComma(builder);
            builder.append("}");
            return builder.toString();
        }

        private static void appendField(StringBuilder builder, String key, String value) {
            builder.append(jsonString(key)).append(":").append(value).append(",");
        }

        private static void removeTrailingComma(StringBuilder builder) {
            int lastIndex = builder.length() - 1;
            if (lastIndex >= 0 && builder.charAt(lastIndex) == ',') {
                builder.deleteCharAt(lastIndex);
            }
        }
    }
}
