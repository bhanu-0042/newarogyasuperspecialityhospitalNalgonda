import { Ambulance, Snowflake, Phone, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { EnquiryDialog } from "./EnquiryDialog";

const EmergencyServices = () => {
    const services = [
        {
            id: "ambulance",
            title: "Ambulance",
            subtitle: "Fully Equipped A/C Ventilator Ambulance",
            icon: Ambulance,
            color: "red",
            bg: "bg-red-50",
            border: "border-red-100",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            description: "Advanced life-support ambulance services available 24/7 for emergency and inter-hospital transfers.",
            features: [
                "Ventilator & oxygen support",
                "Cardiac monitor & defibrillator",
                "Trained medical staff onboard",
                "Fully air-conditioned",
                "Emergency & non-emergency transfers"
            ],
            cta: "Call Now",
            phone: "+911234567890"
        },
        {
            id: "freezer",
            title: "Body Freezer",
            subtitle: "Respectful Preservation Services",
            icon: Snowflake,
            color: "blue",
            bg: "bg-blue-50",
            border: "border-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            description: "Safe, hygienic, and respectful preservation of deceased bodies with temperature-controlled storage.",
            features: [
                "Maintains required preservation temperature",
                "Clean & secure storage facility",
                "Short-term & extended duration",
                "Available 24/7",
                "Supports medico-legal requirements"
            ],
            cta: "Contact Us"
        }
    ];

    return (
        <section className="py-12 bg-muted/50 border-t border-border overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center relative">
                    <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-soft max-w-full">
                        <div className="overflow-hidden whitespace-nowrap">
                            <h2 className="font-serif text-3xl font-bold text-primary inline-block animate-marquee pl-4">
                                24/7 Advanced Emergency Assistance
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {services.map((service) => (
                        <Dialog key={service.id}>
                            <DialogTrigger asChild>
                                <button className={`flex items-center gap-4 p-4 rounded-2xl bg-card border ${service.border} hover:shadow-soft transition-all duration-300 group text-left w-full`}>
                                    {service.id === 'ambulance' ? (
                                        <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                            <img
                                                src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&q=80&w=200&h=150"
                                                alt="Ambulance"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                            <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-foreground">{service.title}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{service.subtitle}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-4`}>
                                        <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                                    </div>
                                    <DialogTitle className="font-serif text-2xl font-bold">{service.subtitle}</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-primary" /> Key Features
                                    </h4>
                                    <ul className="grid gap-2">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-foreground/80 bg-muted/50 p-2 rounded-lg">
                                                <div className={`h-1.5 w-1.5 rounded-full ${service.id === 'ambulance' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-4 pt-4 border-t">
                                    {service.phone ? (
                                        <Button className="flex-1 gap-2" size="lg" onClick={() => window.open(`tel:${service.phone}`)}>
                                            <Phone className="h-4 w-4" /> {service.cta}
                                        </Button>
                                    ) : (
                                        <EnquiryDialog trigger={
                                            <Button className="flex-1 gap-2" size="lg">
                                                <Phone className="h-4 w-4" /> {service.cta}
                                            </Button>
                                        } />
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmergencyServices;
