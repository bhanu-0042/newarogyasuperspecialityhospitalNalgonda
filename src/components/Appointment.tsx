import { useState } from "react";
import { Button } from "@/components/ui/button";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section id="appointment" className="py-12 bg-wavy relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* Header - Compacted */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003366] mb-2 tracking-wide uppercase">
              QUICK APPOINTMENT
            </h2>
            <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>

          {/* Form Card - Compacted */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-border/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Contact Number</label>
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Message</label>
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1e447e] hover:bg-[#163462] text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] uppercase tracking-wider text-sm mt-4"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
