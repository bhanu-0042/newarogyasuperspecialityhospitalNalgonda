import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import equip1 from "@/assets/equip1.jpg";
import equip2 from "@/assets/equip2.jpg";
import equip3 from "@/assets/equip3.jpg";
import equip5 from "@/assets/equip5.jpg";
import equip6 from "@/assets/equip6.jpg";
import equip7 from "@/assets/equip7.jpg";
import equip9 from "@/assets/equip9.jpg";
import equip10 from "@/assets/equip10.jpg";
import equip11 from "@/assets/equip11.jpg";
import equip12 from "@/assets/equip12.jpg";
import equip13 from "@/assets/equip13.jpg";
import equip14 from "@/assets/equip14.jpg";
import equip15 from "@/assets/equip15.jpg";
import equip16 from "@/assets/equip16.jpg";

interface Item {
    title: string;
    image: string;
    category: string;
}

const items: Item[] = [
    { title: "Shortwave (SWD) Machine", image: equip1, category: "Equipment" },
    { title: "Infant Radiant Warmer", image: equip2, category: "Equipment" },
    { title: "Private Hospital Room/Suite", image: equip3, category: "Infrastructure" },
    { title: "ECG (Electrocardiogram)", image: equip5, category: "Equipment" },
    { title: "Operation Theatre", image: equip6, category: "Infrastructure" },
    { title: "Patient Monitoring System", image: equip7, category: "Equipment" },
    { title: "General Ward", image: equip9, category: "Infrastructure" },
    { title: "OutPatient Department", image: equip10, category: "Clinics" },
    { title: "X-Ray Room", image: equip11, category: "Infrastructure" },
    { title: "Recovery Room", image: equip12, category: "Infrastructure" },
    { title: "Pharmacy", image: equip13, category: "Infrastructure" },
    { title: "Tests", image: equip14, category: "Equipment" },
    { title: "Pathology Laboratory", image: equip15, category: "Clinics" },
    { title: "Waiting Hall/Lobby", image: equip16, category: "Infrastructure" }
];

interface CategorySectionProps {
    title: string;
    items: Item[];
}

const CategorySection = ({ title, items }: CategorySectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-14 last:mb-0">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8 pl-2 border-l-4 border-primary/40">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full border border-border bg-background hover:bg-primary hover:text-white transition-all shadow-sm"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full border border-border bg-background hover:bg-primary hover:text-white transition-all shadow-sm"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-8 snap-x snap-mandatory hide-scrollbar"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2))',
                    paddingRight: 'max(1rem, calc((100vw - 1280px) / 2))'
                }}
            >
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex-none w-[280px] md:w-[320px] snap-center group relative overflow-hidden rounded-3xl shadow-soft border border-border/50 bg-card aspect-[4/5] hover:shadow-elevated transition-all"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                            <div className="h-1 w-12 bg-primary rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-white text-xl font-bold font-serif leading-tight">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EquipmentClinics = () => {
    const equipment = items.filter(i => i.category === "Equipment");
    const clinics = items.filter(i => i.category === "Clinics");
    const infrastructure = items.filter(i => i.category === "Infrastructure");

    return (
        <section className="py-20 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Tech & Space</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-3">
                    Our <span className="text-primary">Facilities</span>
                </h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    Discover our world-class medical infrastructure designed for your comfort and recovery.
                </p>
            </div>

            <CategorySection title="Advanced Equipment" items={equipment} />
            <CategorySection title="Specialized Clinics" items={clinics} />
            <CategorySection title="Infrastructure" items={infrastructure} />
        </section>
    );
};

export default EquipmentClinics;
