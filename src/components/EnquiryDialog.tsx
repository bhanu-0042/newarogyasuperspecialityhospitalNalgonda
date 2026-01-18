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
    // 1. Patient / Enquirer Details
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    mobileNumber: z.string().min(10, "Please enter a valid mobile number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    dob: z.string().optional(),
    gender: z.string().optional(),

    // 2. Enquiry Type
    enquiryType: z.string().min(1, "Please select an enquiry type"),

    // 3. Department / Service
    department: z.string().min(1, "Please select a department"),
    doctor: z.string().optional(),

    // 4. Message / Medical Concern
    message: z.string().min(10, "Message must be at least 10 characters"),

    // 5. Appointment Preferences (Optional)
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    consultationMode: z.string().optional(),

    // 6. Location Details (Optional)
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),

    // 8. Consent & Privacy
    consent: z.literal(true, {
        errorMap: () => ({ message: "You must agree to be contacted and accept the Privacy Policy" }),
    }),
});

interface EnquiryDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const enquiryTypes = [
    "Appointment request",
    "Consultation",
    "Second opinion",
    "Treatment / procedure enquiry",
    "Admission enquiry",
    "Health check-up",
    "Insurance / billing enquiry",
    "General Inquiry",
    "Other"
];

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const consultationModes = ["In-person", "Online / Teleconsultation"];

export function EnquiryDialog({ trigger, open, onOpenChange }: EnquiryDialogProps) {
    const { toast } = useToast();
    const [internalOpen, setInternalOpen] = useState(false);

    // Handle both controlled and uncontrolled state
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
            enquiryType: "",
            department: "",
            doctor: "",
            message: "",
            preferredDate: "",
            preferredTime: "",
            consultationMode: "In-person",
            city: "",
            state: "",
            country: "",
            // @ts-ignore - Checkbox needs boolean true/false but schema expects literal true for validation
            consent: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Enquiry Submitted",
            description: "Our team will contact you within 24 hours.",
        });
        setIsOpen && setIsOpen(false);
        form.reset();
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-full animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary">Enquire Now</DialogTitle>
                    <DialogDescription>
                        Please fill in the details below. Our team handles your data with strict confidentiality (HIPAA compliant).
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">

                        {/* 1. Patient Details */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">1. Patient / Enquirer Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
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
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com (Optional)" {...field} />
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
                                                <FormLabel>Date of Birth</FormLabel>
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
                                                <FormLabel>Gender</FormLabel>
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

                        {/* 2. Enquiry Type & 3. Department */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">2. Service Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="enquiryType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason for Enquiry <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select reason" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enquiryTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map((d) => (
                                                        <SelectItem key={d.id} value={d.title}>
                                                            {d.title}
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
                                name="doctor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Doctor (Optional)</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a doctor" />
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

                        {/* 4. Message */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">3. Medical Concern</h3>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description of Problem / Question <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Please describe your symptoms, queries, or medical history..."
                                                className="resize-none min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* 5. Preferences & 6. Location */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">4. Preferences & Location (Optional)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <FormLabel>Preferred Time Slot</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select time" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Morning">Morning (9 AM - 12 PM)</SelectItem>
                                                    <SelectItem value="Afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                                                    <SelectItem value="Evening">Evening (4 PM - 8 PM)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                                                className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                                            >
                                                {consultationModes.map((mode) => (
                                                    <FormItem key={mode} className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value={mode} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {mode}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="State" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 7. Attachments */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-foreground/80 border-b pb-2">5. Attachments (Optional)</h3>
                            <FormItem>
                                <FormLabel>Upload Medical Reports / Prescriptions</FormLabel>
                                <FormControl>
                                    <Input type="file" multiple className="cursor-pointer file:text-primary hover:file:bg-primary/10" />
                                </FormControl>
                                <FormDescription>
                                    Supported formats: PDF, JPG, PNG (Max 5MB)
                                </FormDescription>
                            </FormItem>
                        </div>

                        {/* 8. Consent */}
                        <div className="space-y-4 pt-2">
                            <FormField
                                control={form.control}
                                name="consent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                I agree to be contacted by the hospital and accept the Privacy Policy.
                                            </FormLabel>
                                            <FormDescription>
                                                Your data is secure with us (HIPAA Compliant).
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 rounded-xl transition-all hover:scale-[1.02] shadow-lg">
                                Submit Enquiry
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
