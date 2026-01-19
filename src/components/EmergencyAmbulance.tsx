import { Ambulance, Snowflake, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ambulanceImg from "@/assets/ambulance_icu.png";

const EmergencyAmbulance = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
                            Emergency Services
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                            24/7 Emergency <span className="text-primary">Assistance</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Ambulance Photo */}
                        <div className="relative group order-2 md:order-1">
                            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={ambulanceImg}
                                    alt="Fully Equipped Ambulance"
                                    className="w-full h-[350px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            </div>
                        </div>

                        {/* Service Information */}
                        <div className="space-y-5 order-1 md:order-2">
                            {/* Ambulance Service */}
                            <div className="bg-white rounded-xl p-6 border-l-4 border-red-500 shadow-md hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Ambulance className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-foreground text-xl mb-2">Ambulance Service</h3>
                                        <p className="text-sm text-primary font-semibold mb-3">
                                            Fully Equipped A/C Ventilator Ambulance
                                        </p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                                <span>Advanced life-support with ventilator & oxygen</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                                <span>Cardiac monitor & defibrillator onboard</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                                <span>Trained paramedics & medical staff</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                                <span>Fully air-conditioned for patient comfort</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Body Freezer Service */}
                            <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-md hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Snowflake className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-foreground text-xl mb-2">Body Freezer</h3>
                                        <p className="text-sm text-primary font-semibold mb-3">
                                            Respectful Preservation Services
                                        </p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                                <span>Temperature-controlled preservation facility</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                                <span>Clean, hygienic & secure storage</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                                <span>Available 24/7 for immediate assistance</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                                <span>Supports medico-legal requirements</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-2">
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto gap-2 shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => window.open('tel:+911234567890')}
                                >
                                    <Phone className="h-5 w-5" />
                                    Call for Emergency Services
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmergencyAmbulance;
