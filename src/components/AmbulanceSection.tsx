import { Ambulance, Snowflake, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ambulanceImg from "@/assets/ambulance_icu.png";

const AmbulanceSection = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-red-50 via-white to-blue-50 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Animated Ambulance */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 via-white to-red-100 p-8">
                                {/* Animated Ambulance SVG */}
                                <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-xl">
                                    <img
                                        src={ambulanceImg}
                                        alt="Ambulance"
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                                        24/7 Emergency Services
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service Information */}
                        <div className="space-y-6">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    Emergency Assistance
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                                    Advanced Emergency <span className="text-primary">Services</span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We provide comprehensive emergency services with state-of-the-art equipment and trained medical professionals available round the clock.
                                </p>
                            </div>

                            {/* Service Cards */}
                            <div className="space-y-4">
                                {/* Ambulance Service */}
                                <div className="bg-white rounded-xl p-5 border border-red-100 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Ambulance className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-foreground text-lg mb-1">Ambulance Service</h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Fully Equipped A/C Ventilator Ambulance
                                            </p>
                                            <ul className="space-y-1.5 text-sm text-foreground/80">
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                                    Ventilator & Oxygen Support
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                                    Cardiac Monitor & Defibrillator
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                                    Trained Medical Staff Onboard
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Body Freezer Service */}
                                <div className="bg-white rounded-xl p-5 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Snowflake className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-foreground text-lg mb-1">Body Freezer</h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Respectful Preservation Services
                                            </p>
                                            <ul className="space-y-1.5 text-sm text-foreground/80">
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                    Temperature-Controlled Storage
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                    Clean & Secure Facility
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                    Available 24/7
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Button
                                    size="lg"
                                    className="gap-2 shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => window.open('tel:+911234567890')}
                                >
                                    <Phone className="h-5 w-5" />
                                    Call for Emergency
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AmbulanceSection;
