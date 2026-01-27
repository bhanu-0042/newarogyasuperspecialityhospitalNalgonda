import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doctors } from "@/data/doctors";
import { User, Search, GraduationCap, Clock, Award } from "lucide-react";
import { AppointmentDialog } from "./AppointmentDialog";


interface DoctorsProps {
  limit?: number;
  showViewAll?: boolean;
  className?: string;
  variant?: "grid" | "scroll";
}

const Doctors = ({ limit, showViewAll = false, className, variant = "grid" }: DoctorsProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedDoctors = limit ? filteredDoctors.slice(0, limit) : filteredDoctors;

  // For scrolling, we might want to duplicate the list to ensure smooth infinite scroll if there are few items
  const scrollingDoctors = [...doctors, ...doctors];

  if (variant === "scroll") {
    return (
      <section id="doctors" className={`py-20 bg-background overflow-hidden ${className || ""}`}>
        <div className="container mx-auto px-4 mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Specialists
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-primary">Medical Experts</span>
          </h2>
        </div>

        <div className="relative group">
          <div className="flex overflow-x-hidden p-4">
            <div className="flex gap-8 animate-marquee-slow group-hover:[animation-play-state:paused] whitespace-nowrap">
              {scrollingDoctors.map((doctor, index) => (
                <div
                  key={index}
                  className="inline-flex flex-col items-center justify-center p-6 bg-card rounded-[2rem] border border-border shadow-soft w-64 shrink-0 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center mb-4 border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-primary/30" />
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-lg font-bold text-foreground leading-tight mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-primary font-medium mb-2">{doctor.specialty}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className={`py-20 md:py-28 bg-background ${className || ""}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Find a Doctor
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Specialist</span> Doctors
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Our team of experienced doctors is dedicated to providing you with
            the highest quality of healthcare services.
          </p>

          {/* Search Bar */}
          {!limit && (
            <div className="relative max-w-md mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by department or name..."
                className="pl-10 py-6 rounded-2xl border-primary/20 focus:border-primary transition-all shadow-soft"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDoctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-card rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 border border-border hover:border-primary/20"
            >
              {/* Image & Header */}
              <div className="p-8 pb-0 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center mb-6 border-4 border-primary/5 group-hover:border-primary/20 transition-all duration-500 shadow-inner">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <User className="w-16 h-16 text-primary/20" />
                  )}
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {doctor.specialty}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground leading-tight">
                    {doctor.name}
                  </h3>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="px-8 pb-8 pt-2 space-y-4">
                <div className="grid gap-3 p-4 rounded-2xl bg-muted/30">
                  <div className="flex items-start gap-3 text-sm">
                    <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-tighter">Qualification</p>
                      <p className="text-foreground font-medium">{doctor.qualification}</p>
                    </div>
                  </div>
                </div>

                <AppointmentDialog trigger={
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 shadow-soft">
                    Book Appointment
                  </Button>
                } />
              </div>
            </div>
          ))}
        </div>

        {/* Doctors Grid Empty State */}
        {displayedDoctors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No doctors found</h3>
            <p className="text-muted-foreground">Try searching for a different department or name.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
