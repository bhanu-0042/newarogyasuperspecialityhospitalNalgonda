import { useState, useEffect } from "react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, Award, Clock, MapPin, Target, Eye, ShieldCheck, Heart, CheckCircle2 } from "lucide-react";
import building from "@/assets/equip8.jpg";

const hospitalImages = [
    {
        url: building,
        caption: "Main Entrance",
        position: "object-center"
    },
    {
        url: building,
        caption: "Full Building View",
        position: "object-top scale-110"
    },
    {
        url: building,
        caption: "Signage & Logo",
        position: "object-[center_35%] scale-[2.5]"
    },
    {
        url: building,
        caption: "Emergency Entry View",
        position: "object-bottom scale-[1.5]"
    }
];

import DrRameshImg from "@/assets/dr-ramesh.jpg";
import DrPhaniImg from "@/assets/phanikumar.jpeg";
import equip8 from "@/assets/equip8.jpg";
import equip10 from "@/assets/equip10.jpg";
import equip17 from "@/assets/equip17.jpg";

const AboutUs = () => {
    const heroImages = [building, equip8, equip10, equip17];
    const [currentHeroImage, setCurrentHeroImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-44">

                {/* Our Story - Moved Up and Reduced padding */}
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-colors" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                    {heroImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroImage ? "opacity-100" : "opacity-0"
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Arogya Facility ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
                                        Empowering Health <br />
                                        Through <span className="text-accent font-normal italic">Innovation</span>
                                    </h2>
                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                                        Arogya Hospital began with a simple yet powerful goal: to provide high-quality
                                        healthcare to the people of Nalgonda. Over the decades, we have evolved
                                        into a hub of clinical expertise, housing advanced trauma care and
                                        multi-specialty departments.
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            "Advanced Diagnostic Laboratory",
                                            "Modern Post-Operative Care Units",
                                            "In-house Pharmacy and Quick Response Team",
                                            "Sustainable Healthcare Practices"
                                        ].map((point, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <CheckCircle2 className="h-3 w-3 text-primary" />
                                                </div>
                                                <span className="text-sm md:text-base font-medium text-foreground/80">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Founder's Story & Leadership */}
                <section className="py-12 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">The Visionaries Behind <span className="text-accent">Arogya</span></h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our journey began with a shared dream: to ensure that the people of Nalgonda wouldn't have to travel hundreds of kilometers for specialized medical care.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                            <div className="space-y-6 animate-slide-right">
                                <h3 className="text-2xl font-serif font-bold text-primary">Why We Started</h3>
                                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 text-lg">
                                    "We saw families struggling during emergencies due to the lack of advanced critical care in our region. Our goal was to create a hospital that combines cutting-edge technology with the warmth of local community trust. We wanted to bring 'Metro-Standard' healthcare to Nalgonda's doorstep."
                                </p>
                                <div className="pt-4 flex items-center gap-4">
                                    <div className="h-1 w-12 bg-primary rounded-full" />
                                    <span className="font-semibold text-foreground uppercase tracking-widest text-sm">Founder's Mission</span>
                                </div>
                            </div>

                            <div className="flex justify-center md:justify-end animate-slide-up">
                                <div className="bg-muted rounded-3xl p-8 w-72 flex flex-col items-center justify-center text-center shadow-soft hover:shadow-elevated transition-all group border-2 border-primary/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                                    <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-background shadow-md group-hover:scale-105 transition-transform duration-300">
                                        <img src={DrPhaniImg} alt="Dr. C. Phani Kumar" className="w-full h-full object-cover" />
                                    </div>

                                    <h4 className="font-serif font-bold text-xl text-foreground leading-tight mb-1">Dr. C. Phani Kumar</h4>
                                    <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">Co-Founder</p>

                                    <div className="h-px w-16 bg-border mb-3" />

                                    <p className="text-muted-foreground text-xs font-medium px-2">
                                        Gen Physician & Cardiology
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </section>


                {/* Vision, Mission, Values - Moved Down and Reduced padding */}
                <section className="py-12 overflow-hidden bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Eye,
                                    title: "Our Vision",
                                    desc: "To be the most trusted healthcare partner, setting global benchmarks in medical excellence and patient satisfaction.",
                                    color: "bg-blue-500"
                                },
                                {
                                    icon: Target,
                                    title: "Our Mission",
                                    desc: "To provide affordable and quality healthcare services through continuous innovation, specialized expertise, and a compassionate heart.",
                                    color: "bg-primary"
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Our Values",
                                    desc: "Integrity, Excellence, Compassion, and Respect are at the core of everything we do, ensuring every patient is treated like family.",
                                    color: "bg-accent"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-card p-6 md:p-8 rounded-3xl shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 group">
                                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">{item.title}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div >
    );
};

export default AboutUs;
