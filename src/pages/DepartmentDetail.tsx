import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Appointment from "@/components/Appointment";
import { departments } from "@/data/departments";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const DepartmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const department = departments.find((d) => d.id === id);

    if (!department) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Department Not Found</h1>
                    <Button onClick={() => navigate("/departments")}>Back to Departments</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                    <img
                        src={department.image}
                        alt={department.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <Button
                            variant="ghost"
                            className="absolute top-0 left-4 text-white hover:text-white/80 hover:bg-white/10"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            {department.title}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            {department.description}
                        </p>
                    </div>
                </section>

                {/* About Department */}
                <section className="py-20 bg-card">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    About Department
                                </span>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                                    Excellence in <span className="text-primary">{department.title}</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    {department.details}
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "24/7 Specialized Care",
                                        "Expert Medical Team",
                                        "Modern Diagnostic Tools",
                                        "Patient-Centered Approach"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-video rounded-3xl overflow-hidden shadow-elevated border-8 border-background">
                                    <img
                                        src={department.image}
                                        alt={department.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-3xl flex items-center justify-center text-white shadow-soft">
                                    <department.icon className="w-16 h-16" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Appointment Form */}
                <Appointment />
            </main>
            <Footer />
        </div>
    );
};

export default DepartmentDetail;
