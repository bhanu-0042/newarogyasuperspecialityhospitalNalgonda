import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBookings, type BookingRecord } from "@/lib/admin";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

function formatDateTime(value?: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusVariant(status: string) {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "default";
    case "COMPLETED":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

function getBookingLabel(booking: BookingRecord) {
  return booking.bookingType === "DOCTOR_APPOINTMENT"
    ? booking.department || booking.doctorName || "Doctor Appointment"
    : booking.checkupPackage || "Health Checkup";
}

const AdminBookings = () => {
  const navigate = useNavigate();
  const { session, logout } = useAdminAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadBookings = async (refreshing = false) => {
    if (!session?.accessToken) {
      return;
    }

    if (refreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError("");

    try {
      const data = await getBookings(session.accessToken);
      setBookings(data);
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Failed to load bookings.";
      setError(message);

      if (/unauthorized/i.test(message)) {
        logout();
        navigate("/admin/login", { replace: true });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return bookings;
    }

    return bookings.filter((booking) => {
      const haystack = [
        booking.referenceCode,
        booking.fullName,
        booking.mobileNumber,
        booking.department,
        booking.doctorName,
        booking.checkupPackage,
        booking.status,
        booking.bookingType,
        booking.sourceForm,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [bookings, search]);

  const totalCount = bookings.length;
  const pendingCount = bookings.filter((booking) => booking.status === "PENDING").length;
  const todayCount = bookings.filter((booking) => {
    const createdAt = booking.createdAt ? new Date(booking.createdAt) : null;
    if (!createdAt || Number.isNaN(createdAt.getTime())) {
      return false;
    }

    const today = new Date();
    return (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getDate() === today.getDate()
    );
  }).length;

  return (
    <div className="min-h-screen bg-muted/20 px-4 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-6 py-6 text-primary-foreground shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary-foreground/70">Admin Portal</p>
            <h1 className="mt-2 text-3xl font-serif font-bold">Patient Appointments</h1>
            <p className="mt-2 text-primary-foreground/80">
              Signed in as <span className="font-semibold">{session?.username}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => void loadBookings(true)} disabled={isRefreshing}>
              {isRefreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => {
                logout();
                navigate("/admin/login", { replace: true });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Bookings", value: totalCount },
            { label: "Pending", value: pendingCount },
            { label: "Today", value: todayCount },
          ].map((item) => (
            <Card key={item.label}>
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-3xl">{item.value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl font-serif">Appointments</CardTitle>
                <CardDescription>Search by name, mobile number, department, or reference code.</CardDescription>
              </div>
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search appointments"
                  className="pl-9"
                />
              </div>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading appointments...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                {search ? "No appointments match your search." : "No bookings found yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Visit</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.bookingId}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{booking.fullName}</p>
                            <p className="text-sm text-muted-foreground">{booking.referenceCode}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p>{booking.mobileNumber}</p>
                            <p className="text-sm text-muted-foreground">{booking.email || "—"}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant="secondary">{booking.bookingType.replace("_", " ")}</Badge>
                            <p className="text-sm text-muted-foreground">{getBookingLabel(booking)}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p>{booking.preferredDate || "—"}</p>
                            <p className="text-sm text-muted-foreground">{booking.preferredTimeSlot || "—"}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(booking.status) as "default" | "secondary" | "destructive" | "outline"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDateTime(booking.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBookings;
