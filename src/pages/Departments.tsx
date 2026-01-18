import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { departments } from "@/data/departments";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Departments = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                {/* Hero section */}
                <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"> Our Medical Departments</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">Providing specialized care across various medical fields with state-of-the-art facilities and expert doctors.</p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departments.map((dept) => (
                                <div
                                    key={dept.id}
                                    className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 border border-border"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={dept.image}
                                            alt={dept.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    <div className="p-8">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                            <dept.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{dept.title}</h3>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">{dept.description}</p>
                                        <Button
                                            variant="ghost"
                                            className="p-0 text-primary hover:text-primary/80 group/btn"
                                            onClick={() => navigate(`/department/${dept.id}`)}
                                        >
                                            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Departments;
