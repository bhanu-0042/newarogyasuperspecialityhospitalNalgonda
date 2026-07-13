export type BookingType = "DOCTOR_APPOINTMENT" | "HEALTH_CHECKUP";

export interface BookingRequest {
  bookingType: BookingType;
  sourceForm: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  dob?: string;
  gender?: string;
  department?: string;
  doctor?: string;
  checkupPackage?: string;
  consultationType?: string;
  consultationMode?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  alternateDate?: string;
  symptoms?: string;
  existingCondition?: string;
  patientId?: string;
  location?: string;
  city?: string;
  insuranceRequired?: string;
  insuranceProvider?: string;
  whatsappUpdates?: boolean;
  consent: boolean;
  notes?: string;
}

export interface BookingResponse {
  bookingId: number;
  referenceCode: string;
  message: string;
}

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
const bookingEndpoint = `${apiBaseUrl}/api/bookings`;

export async function submitBooking(payload: BookingRequest): Promise<BookingResponse> {
  const response = await fetch(bookingEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data.message === "string"
        ? data.message
        : `Booking request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as BookingResponse;
}
