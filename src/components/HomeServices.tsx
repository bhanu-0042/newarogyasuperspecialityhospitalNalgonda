import { departments } from "@/data/departments";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeServices = () => {
    const navigate = useNavigate();

    // Selection of 9 important departments
    const importantDepts = [
        "critical-care",
        "cardiology",
        "neurology",
        "orthopaedics",
        "paediatrics",
        "gynaecology",
        "general-medicine",
        "laparoscopic-surgery",
        "ophthalmology"
    ];

    const displayDepts = departments.filter(dept => importantDepts.includes(dept.id)).slice(0, 9);

    return (
        <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                        Centers of <span className="text-primary">Clinical Excellence</span>
                    </h2>
                    <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {displayDepts.map((dept) => (
                        <div
                            key={dept.id}
                            onClick={() => navigate(`/department/${dept.id}`)}
                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-border/50 flex flex-col items-center text-center gap-4 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                                <dept.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-serif font-bold text-base text-foreground group-hover:text-primary transition-colors">
                                {dept.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
