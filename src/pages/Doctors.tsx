import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Doctors from "@/components/Doctors";

const DoctorsPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32">


                {/* Use the Doctors component without limit to show all doctors */}
                <Doctors className="!pt-4 pb-20" />
            </main>
            <Footer />
        </div>
    );
};

export default DoctorsPage;
