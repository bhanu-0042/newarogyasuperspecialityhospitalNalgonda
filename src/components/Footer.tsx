import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            {/* Logo removed */}

            <p className="text-primary-foreground/70 leading-relaxed">
              Providing world-class healthcare services with compassion and excellence
              for over two decades.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Caring for your health</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              {[
                { name: "About Us", href: "/#about" },
                { name: "Specialities", href: "/departments" },
                { name: "Find a Doctor", href: "/doctors" },
                { name: "Appointments", href: "/#appointment" },
                { name: "News & Media", href: "/news-media" },
                { name: "Contact Us", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-3">Departments</h4>
            <ul className="space-y-1">
              {["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Gynecology", "Emergency Care"].map((dept) => (
                <li key={dept}>
                  <a href="/departments" className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {dept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-3">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps/search/?api=1&query=H.No.+5-2-14,+GLR+Enclave,+Near+Clock+Tower,+Besides+Rajireddy+Sir+Hospital,+Tulasi+Nagar,+Nalgonda" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-accent transition-colors text-left">
                  H.No. 5-2-14, GLR Enclave, Near Clock Tower, Besides Rajireddy Sir Hospital,<br />Tulasi Nagar, Nalgonda.
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="tel:+918121214154" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  8121214154, 9494353547
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="mailto:arogyahospitals25@gmail.com" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  arogyahospitals25@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © 2025 Arogya Hospital. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy-policy" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer >
  );
};

export default Footer;
