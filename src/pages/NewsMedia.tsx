import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Newspaper, Tv, Mic2, ExternalLink, PlayCircle } from "lucide-react";
import videoProject from "@/assets/VideoProject.mp4";

const newspaperArticles = [
    {
        title: "Arogya Hospital Pioneers Advanced Cardiac Surgery",
        source: "Health Times",
        date: "Dec 12, 2025",
        desc: "A milestone in rural healthcare as specialized cardiac procedures become accessible.",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "Revolutionizing Emergency Response in the Region",
        source: "Daily Herald",
        date: "Nov 28, 2025",
        desc: "How Arogya's 24/7 casualty care is saving more lives during the golden hour.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "New Wing for Pediatric Care Inaugurated",
        source: "Citizens Voice",
        date: "Oct 15, 2025",
        desc: "Expanding our commitment to child health with state-of-the-art neonatal units.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2070"
    }
];

const tvMentions = [
    {
        title: "Special Report: Modernizing Healthcare",
        source: "News 24",
        duration: "4:15",
        thumb: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "Interview with Leading Neurologists",
        source: "Health Focus TV",
        duration: "6:30",
        thumb: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "Arogya's Response to Seasonal Flu",
        source: "Metro News",
        duration: "3:45",
        thumb: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=2070"
    },
    {
        title: "Hospital Tour & Facilities",
        source: "Official Video",
        duration: "1:20",
        thumb: "",
        videoSrc: videoProject
    }
];


const NewsMedia = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-16 gradient-hero text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-xs font-medium mb-4 uppercase tracking-widest">
                            Arogya in Focus
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">News & Media</h1>
                        <p className="text-lg opacity-90 max-w-2xl mx-auto font-light">
                            Documenting our journey of healing and innovation through media.
                        </p>
                    </div>
                </section>

                {/* Newspaper Articles */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-10 border-l-4 border-primary pl-4">
                            <Newspaper className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-serif font-bold">Newspaper Articles</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newspaperArticles.map((article, i) => (
                                <div key={i} className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500">
                                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-primary font-bold text-[10px] uppercase tracking-tighter">{article.source}</span>
                                            <span className="text-muted-foreground text-[10px]">{article.date}</span>
                                        </div>
                                        <h3 className="text-lg font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.desc}</p>
                                        <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all uppercase text-[10px] tracking-widest">
                                            View Clipping <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TV Mentions & Interviews */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-10 border-l-4 border-primary pl-4">
                            <Tv className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-serif font-bold">TV Mentions & Interviews</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tvMentions.map((video, i) => (
                                <div key={i} className="group relative rounded-3xl overflow-hidden aspect-video shadow-lg cursor-pointer bg-muted">
                                    {video.videoSrc ? (
                                        <video
                                            src={video.videoSrc}
                                            className="w-full h-full object-cover"
                                            controls
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src={video.thumb}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                                                    <PlayCircle className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                                                <span className="text-primary-foreground/70 text-[10px] font-bold block mb-1">{video.source} • {video.duration}</span>
                                                <h3 className="text-white text-base font-serif font-bold leading-tight">{video.title}</h3>
                                            </div>
                                        </>
                                    )}
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

export default NewsMedia;
