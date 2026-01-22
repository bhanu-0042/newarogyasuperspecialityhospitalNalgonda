import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, CheckCircle2 } from "lucide-react";
import logo from "../assets/Atitle.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import adposter from "../assets/adposter.png";
import { AppointmentDialog } from "./AppointmentDialog";

import { departments } from "@/data/departments";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpecialitiesOpen, setIsSpecialitiesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSpecialitiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Specialities", href: "#", isDropdown: true },
    { name: "Find a Doctor", href: "/doctors" },
    { name: "Events & Campaigns", href: "/events" },
    { name: "News & Media", href: "/news-media" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      {/* Top bar removed */}

      {/* Main navigation */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 relative z-50 transition-all duration-300">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo - Left */}
            <a href="/" className="flex items-center h-[52px] shrink-0 hover:opacity-90 transition-opacity">
              <img src={logo} alt="Healing Haven Logo" className="h-full w-auto object-contain drop-shadow-sm" />
            </a>

            {/* Navigation - Center */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsSpecialitiesOpen(!isSpecialitiesOpen)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isSpecialitiesOpen ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                        }`}
                    >
                      {link.name} <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSpecialitiesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isSpecialitiesOpen && (
                      <div className="absolute top-full left-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 grid grid-cols-1 gap-1 animate-slide-up z-[60] overflow-hidden">
                        <div className="max-h-[60vh] overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-200">
                          {departments.map((dept) => (
                            <button
                              key={dept.id}
                              onClick={() => {
                                navigate(`/department/${dept.id}`);
                                setIsSpecialitiesOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-3 group"
                            >
                              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                                <dept.icon className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
                              </div>
                              <span className="font-medium text-sm text-gray-700 group-hover:text-primary">{dept.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>

            {/* CTA Button - Right */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <AppointmentDialog trigger={
                <Button variant="accent" size="lg" className="rounded-full font-bold px-8 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:-translate-y-0.5">
                  Book Appointment
                </Button>
              } />
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-up overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <div key={link.name} className="space-y-2">
                    <button
                      className="flex items-center justify-between w-full text-foreground/80 font-medium py-2"
                      onClick={() => setIsSpecialitiesOpen(!isSpecialitiesOpen)}
                    >
                      {link.name} <ChevronDown className={`h-4 w-4 transition-transform ${isSpecialitiesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isSpecialitiesOpen && (
                      <div className="pl-4 grid gap-2 border-l-2 border-primary/20 ml-2">
                        {departments.map((dept) => (
                          <button
                            key={dept.id}
                            onClick={() => {
                              navigate(`/department/${dept.id}`);
                              setIsMenuOpen(false);
                              setIsSpecialitiesOpen(false);
                            }}
                            className="block text-sm text-muted-foreground hover:text-primary py-2 text-left"
                          >
                            {dept.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <AppointmentDialog trigger={
                <Button variant="accent" className="w-full" size="lg">
                  Book Appointment
                </Button>
              } />
            </div>
          </div>
        )}
      </nav>

      {/* Advertisement Ticker */}
      {/* Advertisement Ticker */}
      <div className="bg-[#DC143C] text-white py-2 overflow-hidden relative z-40">
        <div className="whitespace-nowrap animate-scroll-text font-medium text-sm md:text-base flex items-center">
          <Dialog>
            <DialogTrigger asChild>
              <span className="mr-32 flex items-center gap-2 cursor-pointer hover:text-white/90 transition-opacity">
                <CheckCircle2 className="h-4 w-4 fill-white text-[#DC143C]" />
                Master Health CheckUp Just 3000/- Only (31-01-2026)
              </span>
            </DialogTrigger>
            <DialogContent className="max-w-sm p-0 overflow-hidden bg-transparent border-none shadow-none">
              <div className="relative">
                <img
                  src={adposter}
                  alt="Master Health Checkup Offer"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <button
                  onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }))}
                  className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 fill-white text-[#DC143C]" />
            Expert Doctor Consultation at Just ₹200
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

