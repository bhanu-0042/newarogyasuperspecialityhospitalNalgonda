import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { departments } from "@/data/departments";

const DepartmentsList = () => {
    const navigate = useNavigate();

    return (
        <section id="departments-list" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Our Expertise
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Medical <span className="text-primary">Departments</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We offer specialized care across a wide range of medical fields, ensuring comprehensive treatment for every patient.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {departments.slice(0, 3).map((dept, index) => (
                        <button
                            key={dept.id}
                            onClick={() => navigate(`/department/${dept.id}`)}
                            className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-soft transition-all duration-300 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                    {dept.title}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate("/departments")}
                        className="gap-2 px-8"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        View More
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default DepartmentsList;
