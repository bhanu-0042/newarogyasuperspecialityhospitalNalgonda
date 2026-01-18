import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-44">
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default ContactUs;
