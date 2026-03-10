import { CheckCircle2 } from "lucide-react";
import equip8Img from "@/assets/equip8.jpg";

const features = [
  "State-of-the-art diagnostic facilities",
  "Board-certified medical specialists",
  "24/7 emergency and trauma care",
  "Patient-centered approach",
  "Modern operating theaters",
  "Comprehensive health checkup packages"
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                About Arogya
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Redefining <span className="text-primary tracking-tight">Healthcare Excellence</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                For over two decades, Arogya Hospital has been at the forefront of
                healthcare excellence. Our mission is to provide compassionate,
                accessible, and high-quality medical care to every patient who
                walks through our doors.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>


          </div>

          {/* Right Content - Small Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-square">
                <img
                  src={equip8Img}
                  alt="Arogya Hospital"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
