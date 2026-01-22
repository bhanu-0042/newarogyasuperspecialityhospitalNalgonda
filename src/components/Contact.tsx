import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get in Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contact <span className="text-primary">Us</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Have questions or need assistance? Our team is here to help you
                24/7 with any inquiries you may have.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Phone, title: "Emergency", content: "8121214154, 9494353547", subContent: "24/7 Available" },
                { icon: Mail, title: "Email Us", content: "arogyahospitals25@gmail.com", subContent: "We reply within 24hrs" },
                { icon: MapPin, title: "Location", content: "H.No. 5-2-14, GLR Enclave, Near Clock Tower, Besides Rajireddy Sir Hospital, Tulasi Nagar, Nalgonda.", subContent: "" },
                { icon: Clock, title: "Working Hours", content: "Mon - Sat: 8AM - 8PM", subContent: "Emergency: 24/7" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  {item.title === "Location" ? (
                    <a href="https://www.google.com/maps/search/?api=1&query=H.No.+5-2-14,+GLR+Enclave,+Near+Clock+Tower,+Besides+Rajireddy+Sir+Hospital,+Tulasi+Nagar,+Nalgonda" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors block">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-foreground/80">{item.content}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{item.subContent}</p>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="font-medium text-foreground mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/share/18DM1DUDuA/" },
                  { icon: Instagram, href: "https://www.instagram.com/arogyahospitalsnalgonda?igsh=MXV3MzAzendqN3hhcg==" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Get in Touch Form */}
          <div className="space-y-8">
            {/* Get in Touch Form */}
            <div className="bg-card rounded-3xl p-8 shadow-elevated border border-border">
              <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Full Name</label>
                    <Input placeholder="John Doe" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Phone Number</label>
                    <Input placeholder="+91 98765 43210" className="bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <Input placeholder="john@example.com" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] bg-background resize-none" />
                </div>
                <Button className="w-full font-bold" size="lg">Send Message</Button>
              </form>
            </div>

            {/* Small Map */}
            <div className="rounded-3xl overflow-hidden shadow-elevated h-[250px] border border-border">
              <iframe
                src="https://maps.google.com/maps?q=H.No.+5-2-14,+GLR+Enclave,+Near+Clock+Tower,+Besides+Rajireddy+Sir+Hospital,+Tulasi+Nagar,+Nalgonda&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Hospital Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
