import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carousel from "../components/LandingPage/Product";
import AboutUsLanding from "../components/LandingPage/AboutUs-Landing";
import ChallangeLanding from "../components/LandingPage/Challange";
import Faq from "../components/LandingPage/Faq";
import Testimoni from "../components/LandingPage/Testimoni";
import ContactUs from "../components/LandingPage/ContactUs";
import Footer from "../components/Footer";
import StickyCtaButton from "../components/StickyCtaButton";
import BgHero from "../assets/webp/bg-hero.webp";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-secondary">
            <Navbar active="home" />
            <Hero text="Jadilah Bagian dari Perubahan, Mulai Gaya Hidup Ramah Lingkungan Bersama Ecomate!" button="Yuk Bantu Selamatkan Bumi !" image={BgHero} link="/tantangan" />
            <Carousel />
            <AboutUsLanding />
            <ChallangeLanding />
            <Faq />
            <Testimoni />
            <ContactUs />
            <Footer />
            <StickyCtaButton />
        </div>
    );
};

export default LandingPage;
