import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 md:pt-40 pb-20">
                <div className="container mx-auto px-4 max-w-4xl leading-relaxed">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground tracking-tight">
                            Privacy Policy
                        </h1>
                        <div className="flex flex-col gap-1 text-sm md:text-base border-l-4 border-primary pl-4 py-1">
                            <p className="text-muted-foreground italic font-medium">Website: <a href="https://arogyahospitals.com" className="text-primary hover:underline transition-all">https://arogyahospitals.com</a></p>
                            <p className="text-muted-foreground italic font-medium">Owner: Arogya Hospital</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At Arogya Hospital, we are committed to protecting your personal information and respecting your privacy. This Privacy Policy outlines how we collect, use, store, and protect your data when you visit our website or interact with us online. By using our website, you agree to the terms described here.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">1. Information We Collect</h2>
                            <p className="text-muted-foreground mb-4">When you interact with our website, we may collect the following types of information:</p>
                            <div className="space-y-4 ml-4">
                                <div>
                                    <h3 className="font-bold text-foreground">a. Personal Information You Provide:</h3>
                                    <p className="text-muted-foreground">Name, phone number, email address, and any other information you submit through our forms (such as appointment bookings or enquiries).</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">b. Automatically Collected Information:</h3>
                                    <p className="text-muted-foreground">IP address, browser type, operating system, pages visited, time spent on the website, and data collected through cookies and analytics tools.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-4">We use the information collected to:</p>
                            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                                <li>Respond to your queries or appointment requests</li>
                                <li>Deliver relevant services and follow up on patient care</li>
                                <li>Improve the usability and content of our website</li>
                                <li>Send updates or notifications (if opted in)</li>
                                <li>Comply with healthcare and legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">3. Cookies and Tracking Technologies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website may use cookies to enhance your browsing experience. Cookies help us understand how users interact with our content. You may choose to disable cookies in your browser settings, but this may affect certain functionalities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">4. Information Sharing</h2>
                            <p className="text-muted-foreground mb-4">We do not sell your personal data. We may share information in the following cases:</p>
                            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                                <li>With our staff for scheduling, follow-up, or patient care</li>
                                <li>With technology or service providers assisting in website or communication services (under confidentiality agreements)</li>
                                <li>With legal authorities if required by law</li>
                                <li>In the event of a merger or operational change (with proper notice)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">5. Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use industry-standard technical and administrative measures to protect your personal data. While we take reasonable precautions, no online system is completely secure. Always exercise caution when sharing sensitive information online.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">6. Your Rights</h2>
                            <p className="text-muted-foreground mb-4">Depending on applicable law, you may have the right to:</p>
                            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                                <li>Access or update your personal data</li>
                                <li>Request deletion of your information</li>
                                <li>Withdraw consent to data processing</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">You can exercise these rights by contacting us at the details provided below.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">7. Third-Party Links</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website may contain links to third-party websites. These websites have their own privacy practices, and we are not responsible for their content or policies. We advise reviewing their privacy policies before sharing any personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold mb-4">8. Updates to This Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may modify this Privacy Policy from time to time. The latest version will always be available on this page, with the effective date updated. Continued use of our site after any changes indicates your acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="bg-muted p-6 md:p-10 rounded-3xl border border-border/50 shadow-sm">
                            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">9. Contact Us</h2>
                            <p className="text-muted-foreground mb-8 text-lg">If you have any questions about this Privacy Policy or how your data is handled, please reach out to us:</p>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="font-bold text-xl text-foreground">Arogya Hospital</p>
                                    <div className="flex items-start gap-3 text-muted-foreground">
                                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                                        <a href="https://www.google.com/maps/search/?api=1&query=H.No.+5-2-14,+GLR+Enclave,+Near+Clock+Tower,+Besides+Rajireddy+Sir+Hospital,+Tulasi+Nagar,+Nalgonda" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            H.No. 5-2-14, GLR Enclave, Near Clock Tower, Besides Rajireddy Sir Hospital,<br />Tulasi Nagar, Nalgonda.
                                        </a>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-1">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Phone className="h-5 w-5 text-primary shrink-0" />
                                        <span>8121214154, 9494353547</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Mail className="h-5 w-5 text-primary shrink-0" />
                                        <a href="mailto:arogyahospitals25@gmail.com" className="hover:text-primary transition-colors">arogyahospitals25@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
