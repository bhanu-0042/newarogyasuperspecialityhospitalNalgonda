import { Ambulance, Snowflake, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                                <div className="relative w-full h-[400px] flex items-center justify-center">
                                    <style>{`
                                        @keyframes float {
                                            0%, 100% { transform: translateY(0px); }
                                            50% { transform: translateY(-10px); }
                                        }
                                        @keyframes wheel-spin {
                                            from { transform: rotate(0deg); }
                                            to { transform: rotate(360deg); }
                                        }
                                        @keyframes flash-red {
                                            0%, 100% { opacity: 1; }
                                            50% { opacity: 0.3; }
                                        }
                                        @keyframes flash-blue {
                                            0%, 100% { opacity: 0.3; }
                                            50% { opacity: 1; }
                                        }
                                        .ambulance-float {
                                            animation: float 3s ease-in-out infinite;
                                        }
                                        .wheel-spin {
                                            animation: wheel-spin 1s linear infinite;
                                            transform-origin: center;
                                        }
                                        .light-red {
                                            animation: flash-red 1s ease-in-out infinite;
                                        }
                                        .light-blue {
                                            animation: flash-blue 1s ease-in-out infinite;
                                        }
                                    `}</style>

                                    <svg className="ambulance-float w-full max-w-md" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Road */}
                                        <rect x="0" y="200" width="400" height="50" fill="#6B7280" opacity="0.2" />
                                        <line x1="0" y1="225" x2="400" y2="225" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="20 10" />

                                        {/* Ambulance Body */}
                                        <g transform="translate(50, 80)">
                                            {/* Main body */}
                                            <rect x="20" y="40" width="180" height="80" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="3" />

                                            {/* Cabin */}
                                            <path d="M 200 60 L 240 60 L 260 100 L 200 100 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="3" />

                                            {/* Windows */}
                                            <rect x="30" y="50" width="40" height="30" rx="4" fill="#93C5FD" opacity="0.6" />
                                            <rect x="80" y="50" width="50" height="30" rx="4" fill="#93C5FD" opacity="0.6" />
                                            <path d="M 205 70 L 235 70 L 250 95 L 205 95 Z" fill="#93C5FD" opacity="0.6" />

                                            {/* Red Cross */}
                                            <rect x="140" y="60" width="8" height="24" rx="2" fill="#EF4444" />
                                            <rect x="132" y="68" width="24" height="8" rx="2" fill="#EF4444" />

                                            {/* Emergency Lights */}
                                            <circle className="light-red" cx="60" cy="35" r="8" fill="#EF4444" />
                                            <circle className="light-blue" cx="160" cy="35" r="8" fill="#3B82F6" />

                                            {/* Light beams */}
                                            <path className="light-red" d="M 60 27 L 50 10 L 70 10 Z" fill="#EF4444" opacity="0.3" />
                                            <path className="light-blue" d="M 160 27 L 150 10 L 170 10 Z" fill="#3B82F6" opacity="0.3" />

                                            {/* Door lines */}
                                            <line x1="140" y1="50" x2="140" y2="120" stroke="#D1D5DB" strokeWidth="2" />

                                            {/* Headlights */}
                                            <circle cx="255" cy="90" r="6" fill="#FCD34D" />
                                            <circle cx="255" cy="105" r="6" fill="#FCA5A5" />

                                            {/* Wheels */}
                                            <g className="wheel-spin">
                                                <circle cx="60" cy="125" r="18" fill="#1F2937" stroke="#374151" strokeWidth="3" />
                                                <circle cx="60" cy="125" r="10" fill="#6B7280" />
                                                <line x1="60" y1="115" x2="60" y2="135" stroke="#9CA3AF" strokeWidth="2" />
                                                <line x1="50" y1="125" x2="70" y2="125" stroke="#9CA3AF" strokeWidth="2" />
                                            </g>

                                            <g className="wheel-spin">
                                                <circle cx="220" cy="125" r="18" fill="#1F2937" stroke="#374151" strokeWidth="3" />
                                                <circle cx="220" cy="125" r="10" fill="#6B7280" />
                                                <line x1="220" y1="115" x2="220" y2="135" stroke="#9CA3AF" strokeWidth="2" />
                                                <line x1="210" y1="125" x2="230" y2="125" stroke="#9CA3AF" strokeWidth="2" />
                                            </g>

                                            {/* AMBULANCE Text */}
                                            <text x="110" y="110" fontSize="14" fontWeight="bold" fill="#EF4444" textAnchor="middle">AMBULANCE</text>
                                        </g>
                                    </svg>
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
