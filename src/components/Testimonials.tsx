import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import videoProject from "@/assets/VideoProject.mp4";

const videos = [
  {
    title: "Arogya Hospital Project",
    time: "Featured Video",
    thumb: videoProject,
    videoUrl: videoProject,
    isVideo: true
  },
  {
    title: "Virtual Hospital Tour Highlight",
    time: "30 Sec Play",
    thumb: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=2070",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-hospital-corridor-with-glass-doors-42289-large.mp4"
  },
  {
    title: "Patient Success Story Highlight",
    time: "30 Sec Play",
    thumb: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-talking-to-a-patient-in-a-clinic-42291-large.mp4"
  },
  {
    title: "Surgical Excellence Highlight",
    time: "30 Sec Play",
    thumb: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2070",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-surgeons-performing-surgery-in-the-operating-room-42293-large.mp4"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-foreground text-sm font-medium mb-4">
            Visual Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Video <span className="text-white/70">Gallery</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Watch our world-class facilities and patient recovery journeys in action.
          </p>
        </div>

        {/* Video Slider */}
        <div className="max-w-4xl mx-auto relative group">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/20 aspect-video md:aspect-[21/9]">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((video, idx) => (
                <div key={idx} className="min-w-full relative h-full">
                  {video.thumb?.endsWith('.mp4') || (video as any).isVideo ? (
                    <video
                      src={video.thumb}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        e.currentTarget.currentTime = 1;
                      }}
                    />
                  ) : (
                    <img
                      src={video.thumb}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all cursor-pointer group/play"
                    >
                      <Play className="h-8 w-8 text-white fill-white group-hover/play:scale-90 transition-transform ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-8 md:bottom-10 md:left-12">
                    <h3 className="text-white text-xl md:text-2xl font-serif font-bold drop-shadow-lg">
                      {video.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {video.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 rounded-full h-2 ${i === currentIndex ? "bg-accent w-10" : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-3xl">
          {activeVideo && (
            <div className="relative aspect-video">
              <video
                src={activeVideo.videoUrl}
                autoPlay
                controls
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all z-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
