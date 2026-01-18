import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Users, MapPin, ExternalLink, ArrowRight, Heart } from "lucide-react";
import cardiacImg from "../assets/cardiac.jpeg";

const events = [
    {
        title: "Free Cardiac Health Checkup Camp",
        date: "Jan 25, 2026",
        time: "9:00 AM - 4:00 PM",
        location: "Arogya Hospital Premises",
        desc: "A full day camp dedicated to heart health including ECG, BP check, and expert consultation for seniors.",
        category: "Health Camp",
        image: cardiacImg
    },
    {
        title: "Blood Donation Drive",
        date: "Jan 30, 2026",
        time: "10:00 AM - 5:00 PM",
        location: "Community Center, Nalgonda",
        desc: "Join us in our mission to save lives. Every donor receives a free health screening certificate.",
        category: "Campaign",
        image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "Maternal Health Seminar",
        date: "Feb 05, 2026",
        time: "11:00 AM - 1:00 PM",
        location: "Arogya Auditorium",
        desc: "An educational session for expectant mothers focusing on nutrition, exercise, and mental well-being.",
        category: "Education",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2070"
    }
];

const pastCampaigns = [
    {
        title: "Clean City Initiative",
        impact: "500+ Participants",
        description: "Our community outreach program to promote environmental hygiene.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2013"
    },
    {
        title: "Rural Vaccination Outreach",
        impact: "1000+ Doses Administered",
        description: "Bringing essential healthcare services to remote villages.",
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=2070"
    }
];

const Events = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 gradient-hero text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-4 uppercase tracking-widest">
                            Community & Engagement
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6">Events & Campaigns</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto font-light">
                            Join us in our mission to create a healthier community through awareness, camps, and outreach programs.
                        </p>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-12 border-l-4 border-primary pl-4">
                            <Calendar className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-serif font-bold">Upcoming Events</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, i) => (
                                <div key={i} className="group bg-card rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 flex flex-col shadow-soft">
                                    <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                                {event.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                            {event.title}
                                        </h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span>{event.date} • {event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                                            {event.desc}
                                        </p>
                                        <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase text-[10px] tracking-widest mt-auto">
                                            Register Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Campaigns */}
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-12 border-l-4 border-primary pl-4">
                            <Heart className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-serif font-bold">Impactful Campaigns</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {pastCampaigns.map((camp, i) => (
                                <div key={i} className="group relative min-h-[350px] rounded-[3rem] overflow-hidden flex flex-col justify-center p-12 shadow-elevated border border-border">
                                    <div className="absolute inset-0">
                                        <img src={camp.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-all" />
                                    </div>
                                    <div className="relative z-10">
                                        <span className="text-primary font-bold text-xs uppercase mb-3 block tracking-wider">{camp.impact}</span>
                                        <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">{camp.title}</h3>
                                        <p className="text-white/80 text-base leading-relaxed mb-8 max-w-md">{camp.description}</p>
                                        <button className="w-fit flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                                            View Coverage <ExternalLink className="w-3 h-3" />
                                        </button>
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

export default Events;
