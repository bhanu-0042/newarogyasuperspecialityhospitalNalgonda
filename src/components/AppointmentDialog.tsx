import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

const formSchema = z.object({
    // 1. Patient Details
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    mobileNumber: z.string().min(10, "Please enter a valid mobile number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select a gender"),

    // 2. Appointment Details
    department: z.string().min(1, "Please select a department"),
    doctor: z.string().optional(),
    consultationType: z.string().min(1, "Please select consultation type"),
    consultationMode: z.string().min(1, "Please select consultation mode"),

    // 3. Date & Time
    preferredDate: z.string().min(1, "Please select a preferred date"),
    timeSlot: z.string().min(1, "Please select a time slot"),
    alternateDate: z.string().optional(),

    // 4. Medical Information
    symptoms: z.string().optional(),
    existingCondition: z.enum(["Yes", "No"]).optional(),
    patientId: z.string().optional(),

    // 5. Location
    location: z.string().min(1, "Please select a location"),
    city: z.string().min(1, "City is required"),

    // 6. Insurance
    insuranceRequired: z.enum(["Yes", "No"]).optional(),
    insuranceProvider: z.string().optional(),

    // 8. Consent
    consent: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the Terms & Privacy Policy" }),
    }),
    whatsappUpdates: z.boolean().optional(),
});

interface AppointmentDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const genderOptions = ["Male", "Female", "Other"];
const consultationTypes = ["New Visit", "Follow-up"];
const consultationModes = ["In-person", "Online / Teleconsultation"];
const timeSlots = ["Morning (9-12)", "Afternoon (12-4)", "Evening (4-8)"];
const yesNoOptions = ["Yes", "No"];

export function AppointmentDialog({ trigger, open, onOpenChange }: AppointmentDialogProps) {
    const { toast } = useToast();
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            email: "",
            dob: "",
            gender: "",
            department: "",
            doctor: "",
            consultationType: "New Visit",
            consultationMode: "In-person",
            preferredDate: "",
            timeSlot: "",
            alternateDate: "",
            symptoms: "",
            existingCondition: "No",
            patientId: "",
            location: "Main Branch - Tulsi Nagar",
            city: "",
            insuranceRequired: "No",
            insuranceProvider: "",
            // @ts-ignore
            consent: false,
            whatsappUpdates: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const message = ` New Appointment Request 
-------------------------
Patient Name:* ${values.fullName}
Mobile:* ${values.mobileNumber}
Department:* ${values.department}
Doctor:* ${values.doctor || "Any Available"}
Date:* ${values.preferredDate}
Time:* ${values.timeSlot}
Type:* ${values.consultationType}
Mode:* ${values.consultationMode}
City:* ${values.city}
Hospital Branch:* ${values.location}
-------------------------
Sent from Website`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/918121214154?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        toast({
            title: "Redirecting to WhatsApp",
            description: "Please send the pre-filled message to confirm your appointment.",
        });
        setIsOpen && setIsOpen(false);
        form.reset();
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto w-full animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary">Book Appointment</DialogTitle>
                    <DialogDescription>
                        Fill in the details to schedule your visit with our specialists.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">

                        {/* 1. Patient Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">1. Patient Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
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
                                            <FormLabel>Mobile Number <span className="text-red-500">*</span></FormLabel>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {genderOptions.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Appointment Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">2. Appointment Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((d) => (
                                                        <SelectItem key={d.id} value={d.title}>{d.title}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="doctor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preferred Doctor</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Any Available Doctor" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Any">Any Available Doctor</SelectItem>
                                                    {doctors.map((doc, idx) => (
                                                        <SelectItem key={idx} value={doc.name}>
                                                            {doc.name} - {doc.specialty}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="consultationType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Consultation Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {consultationTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="consultationMode"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Mode of Consultation</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex space-x-4"
                                                >
                                                    {consultationModes.map((mode) => (
                                                        <FormItem key={mode} className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value={mode} />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">{mode}</FormLabel>
                                                        </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 3. Date & Time */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">3. Preferred Date & Time</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="preferredDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preferred Date <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="timeSlot"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time Slot <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Slot" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="alternateDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alternate Date (Optional)</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 4. Medical Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">4. Medical Information</h3>
                            <FormField
                                control={form.control}
                                name="symptoms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason for Visit / Symptoms</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Describe your symptoms or reason for visit..." className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="existingCondition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Existing Medical Condition?</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {yesNoOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="patientId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Previous Patient ID / UHID (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter ID if existing patient" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 5. Location */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">5. Location Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hospital Branch</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Branch" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Main Branch - Tulsi Nagar">Main Branch - Tulsi Nagar</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 6. Insurance */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">6. Insurance Details (Optional)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="insuranceRequired"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Insurance Required?</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {yesNoOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="insuranceProvider"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Insurance Provider Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Provider Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 7. Uploads */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">7. Upload Documents</h3>
                            <FormItem>
                                <FormLabel>Upload Prescription / Reports (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="file" multiple className="cursor-pointer file:text-primary hover:file:bg-primary/10" />
                                </FormControl>
                                <FormDescription>
                                    PDF, JPG, PNG (Max 5MB)
                                </FormDescription>
                            </FormItem>
                        </div>

                        {/* 8. Consent */}
                        <div className="space-y-4 pt-4 border-t">
                            <FormField
                                control={form.control}
                                name="consent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                I agree to the Terms & Privacy Policy
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="whatsappUpdates"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Get updates via WhatsApp / SMS
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-6 px-10 rounded-xl transition-all hover:scale-[1.02] shadow-lg">
                                Book Appointment
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
