import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Doctors from "@/components/Doctors";
import Footer from "@/components/Footer";
import HomeServices from "@/components/HomeServices";
import SpecialServices from "@/components/SpecialServices";
import EquipmentClinics from "@/components/EquipmentClinics";
import Blogs from "@/components/Blogs";
import Testimonials from "@/components/Testimonials";
import EmergencyAmbulance from "@/components/EmergencyAmbulance";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <HomeServices />
        <Doctors variant="scroll" showViewAll={false} />
        <SpecialServices />
        <EquipmentClinics />
        <Testimonials />
        <Blogs />
        <EmergencyAmbulance />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
