import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Departments from "./pages/Departments";
import AboutUs from "./pages/AboutUs";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import DepartmentDetail from "./pages/DepartmentDetail";
import NewsMedia from "./pages/NewsMedia";
import Events from "./pages/Events";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import { FloatingActions } from "./components/FloatingActions";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import AdminLogin from "./pages/AdminLogin";
import AdminBookings from "./pages/AdminBookings";
import { RequireAdminAuth } from "./components/admin/RequireAdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FloatingActions />
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/department/:id" element={<DepartmentDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/news-media" element={<NewsMedia />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/bookings"
              element={
                <RequireAdminAuth>
                  <AdminBookings />
                </RequireAdminAuth>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
