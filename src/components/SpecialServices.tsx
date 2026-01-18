import {
    Stethoscope,
    ShieldAlert,
    Users,
    Scissors,
    Ambulance,
    Microscope,
    Activity,
    Accessibility,
    Bed
} from "lucide-react";

const specialServices = [
    {
        title: "OPD & Diagnostic Services",
        desc: "BP, Sugar, Thyroid, Dengue and other routine health check-ups with accurate diagnostics.",
        icon: Stethoscope
    },
    {
        title: "24/7 Emergency & Casualty Care",
        desc: "Round-the-clock emergency, casualty, and mortuary services with immediate medical attention.",
        icon: ShieldAlert
    },
    {
        title: "Inpatient & Outpatient Care",
        desc: "Comprehensive OPD and IP services for men, women, and children.",
        icon: Users
    },
    {
        title: "Minor & Major Surgeries",
        desc: "Safe and well-equipped operation theatres for minor and major surgical procedures.",
        icon: Scissors
    },
    {
        title: "Accident & Trauma Care",
        desc: "Immediate care for accidents, fractures, injuries, and trauma emergencies.",
        icon: Ambulance
    },
    {
        title: "Advanced Diagnostics",
        desc: "X-Ray, ECG, EEG (Brain Test), and EMG facilities for accurate diagnosis.",
        icon: Microscope
    },
    {
        title: "Dialysis & Nephrology",
        desc: "Dedicated dialysis unit and kidney care under specialist supervision.",
        icon: Activity
    },
    {
        title: "Physiotherapy & Rehabilitation",
        desc: "Physiotherapy, wound dressing, and post-treatment recovery care.",
        icon: Accessibility
    },
    {
        title: "General Ward Facilities",
        desc: "Clean, comfortable general wards with continuous nursing care.",
        icon: Bed
    }
];

const SpecialServices = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Comprehensive Care</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-2">
                        Our <span className="text-primary">Special Services</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary/20 mx-auto mt-4 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary w-1/2 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {specialServices.map((service, i) => (
                        <div
                            key={i}
                            className="group p-8 rounded-[2.5rem] border border-border/50 bg-card hover:bg-white hover:shadow-elevated transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[5rem] -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />

                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                                <service.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="text-xl font-serif font-bold mb-4 text-foreground group-hover:text-primary transition-colors relative z-10">
                                {service.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                {service.desc}
                            </p>

                            <div className="mt-6 w-8 h-1 bg-primary/20 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialServices;
