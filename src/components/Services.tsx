import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

interface ServicesProps {
  limit?: number;
}

const Services = ({ limit }: ServicesProps) => {
  const navigate = useNavigate();
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Care Highlights
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive <span className="text-primary">Medical Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Providing a wide range of medical care and support services to ensure your well-being around the clock.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-border"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <service.icon className="h-7 w-7 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Action */}
              <button
                onClick={() => navigate("/services")}
                className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {limit && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/services")}
              className="px-8 gap-2"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
