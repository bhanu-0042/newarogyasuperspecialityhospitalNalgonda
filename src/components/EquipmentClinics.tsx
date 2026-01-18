const items = [
    {
        title: "Advanced CT Scan",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070",
        category: "Equipment"
    },
    {
        title: "Modular OT",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070",
        category: "Clinics"
    },
    {
        title: "Dialysis Center",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2070",
        category: "Clinics"
    },
    {
        title: "ICU Monitor",
        image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=2070",
        category: "Equipment"
    }
];

const EquipmentClinics = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Tech & Space</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
                        Equipment & <span className="text-primary">Clinics</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-3xl shadow-soft border border-border/50 bg-card aspect-[4/5]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <span className="text-primary-foreground/70 text-[10px] uppercase font-bold tracking-widest mb-1">
                                    {item.category}
                                </span>
                                <h3 className="text-white text-xl font-bold font-serif leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EquipmentClinics;
