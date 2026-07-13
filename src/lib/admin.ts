import type { BookingType } from "./bookings";

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
const adminLoginEndpoint = `${apiBaseUrl}/api/admin/login`;
const bookingsEndpoint = `${apiBaseUrl}/api/bookings`;

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminSession {
  accessToken: string;
  tokenType: "Bearer";
  username: string;
  role: "admin";
  expiresAt: string;
}

export interface BookingRecord {
  bookingId: number;
  referenceCode: string;
  bookingType: BookingType;
  sourceForm: string;
  fullName: string;
  mobileNumber: string;
  email?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  department?: string | null;
  doctorName?: string | null;
  checkupPackage?: string | null;
  consultationType?: string | null;
  consultationMode?: string | null;
  preferredDate?: string | null;
  preferredTimeSlot?: string | null;
  alternateDate?: string | null;
  symptoms?: string | null;
  existingCondition?: string | null;
  patientId?: string | null;
  branchLocation?: string | null;
  city?: string | null;
  insuranceRequired?: string | null;
  insuranceProvider?: string | null;
  whatsappUpdates: boolean;
  consent: boolean;
  notes?: string | null;
  status: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface BookingsListResponse {
  bookings: BookingRecord[];
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function loginAdmin(payload: AdminLoginRequest): Promise<AdminSession> {
  const response = await fetch(adminLoginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<AdminSession & { message?: string }>(response);
}

export async function getBookings(accessToken: string): Promise<BookingRecord[]> {
  const response = await fetch(bookingsEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await parseResponse<BookingsListResponse>(response);
  return data.bookings ?? [];
}
