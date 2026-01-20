import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";
import { useState, useEffect } from "react";
import { EnquiryDialog } from "./EnquiryDialog";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroDepartments = departments.filter(
    (dept) => !["gynaecology", "plastic-surgery"].includes(dept.id)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroDepartments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-40 md:pt-48 overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {heroDepartments.map((dept, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={dept.image}
              alt={dept.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">Trusted Healthcare</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight">
            Your Health,
            <br />
            <span className="text-accent">Our Priority</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            Experience world-class healthcare with our team of expert specialists.
            We combine cutting-edge technology with compassionate care to ensure
            the best outcomes for our patients.
          </p>

          {/* CTA Buttons */}


        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
