import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { submitBooking } from "@/lib/bookings";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  mobileNumber: z.string().min(10, "Please enter a valid mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  city: z.string().min(1, "City is required"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  checkupPackage: z.string().min(1, "Please select a checkup package"),
  notes: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: "You must agree to the Terms & Privacy Policy",
  }),
});

interface AppointmentProps {
  departmentName?: string;
}

const preferredTimeSlots = ["Morning (9-12)", "Afternoon (12-4)", "Evening (4-8)"];

const checkupPackages = [
  "Master Health Checkup",
  "General Health Checkup",
  "BP / Sugar Screening",
  "Thyroid Screening",
  "Cardiac Screening",
];

const Appointment = ({ departmentName }: AppointmentProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      city: "",
      preferredDate: "",
      preferredTime: "",
      checkupPackage: "",
      notes: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const response = await submitBooking({
        bookingType: "HEALTH_CHECKUP",
        sourceForm: "department-checkup-booking",
        fullName: values.fullName,
        mobileNumber: values.mobileNumber,
        email: values.email || undefined,
        department: departmentName || "General Checkup",
        checkupPackage: values.checkupPackage,
        consultationType: "Health Checkup",
        consultationMode: "In-person",
        preferredDate: values.preferredDate,
        preferredTimeSlot: values.preferredTime,
        location: "Main Branch - Tulsi Nagar",
        city: values.city,
        whatsappUpdates: false,
        consent: values.consent,
        symptoms: values.notes || undefined,
        notes: values.notes || undefined,
      });

      toast({
        title: "Checkup booked",
        description: `Reference ${response.referenceCode} has been created.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Unable to save checkup",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="appointment" className="py-12 bg-wavy relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003366] tracking-wide uppercase">
              Book a Health Checkup
            </h2>
            <div className="w-16 h-1 bg-red-500 mx-auto rounded-full" />
            <p className="text-sm md:text-base text-muted-foreground">
              Schedule a preventive screening or routine checkup and save it directly into Oracle.
            </p>
            {departmentName ? (
              <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
                Booking for {departmentName}
              </p>
            ) : null}
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-border/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {preferredTimeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="checkupPackage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Checkup Package</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {checkupPackages.map((packageName) => (
                            <SelectItem key={packageName} value={packageName}>
                              {packageName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The booking will be saved in Oracle for follow-up by the care team.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes / Symptoms (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share any symptoms, concerns, or special instructions..."
                          className="resize-none min-h-[110px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the Terms & Privacy Policy.</FormLabel>
                        <FormDescription>
                          Your booking details will be stored securely for appointment coordination.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-[#1e447e] hover:bg-[#163462] text-white font-bold py-6 px-8 rounded-xl transition-all hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Saving..." : "Book Checkup"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
