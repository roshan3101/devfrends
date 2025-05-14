import AboutPage from "@/components/About";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MeetBarbers from "@/components/MeetBarbers";
import ServicePrices from "@/components/ServicePrices"; 
import BarberServices from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import NewClient from "@/components/NewClient";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-0 m-0">
      <Hero />
      <AboutPage />
      <BarberServices />
      <WhyChoose />
      <Testimonials />
      <ServicePrices />
      <Gallery />
      <MeetBarbers />
      <Location />
      <FAQ />
      <ContactUs />
      <NewClient />
      <Footer />
    </div>
  );
}
