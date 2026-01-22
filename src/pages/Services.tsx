import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/EnquiryDialog";

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-44">
                <div className="gradient-hero py-16 md:py-24 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Our Healthcare <span className="text-accent">Services</span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Comprehensive medical care delivered with expertise and compassion.
                            We are committed to providing the highest quality healthcare through our diverse range of services.
                        </p>
                    </div>
                </div>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="bg-card rounded-3xl p-8 shadow-card border border-border hover:border-primary/20 hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <service.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                                        {service.fullDescription}
                                    </p>
                                    <div className="mt-auto">
                                        <EnquiryDialog trigger={
                                            <Button variant="outline" className="w-full gap-2 group">
                                                Inquire about this Service
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        } />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="bg-card rounded-[3rem] p-8 md:p-16 border border-border shadow-elevated flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex-1 relative z-10 text-center md:text-left">
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                                    Need Immediate Medical Attention?
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                                    Our emergency and ambulance services are available 24 hours a day, 7 days a week. We are always here when you need us most.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <Button size="xl" className="bg-primary hover:bg-primary/90 text-white" onClick={() => window.open('tel:+918121214154')}>
                                        Call Now: 8121214154, 9494353547
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;
