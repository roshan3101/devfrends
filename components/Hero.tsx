"use client"

import { MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();

  const contentMap = {
    en: {
      subtitle: "Premium Barber Services in Denton",
      title: "Classic Cuts, Modern Style",
      highlight: "Premium Barber Shop",
      description:
        "At PMC Barbershop, we combine traditional barbering techniques with modern styling to give you the perfect look. Our experienced barbers deliver precision cuts, beard grooming, and relaxing hot towel shaves in a classic barbershop atmosphere.",
      location: "Denton, TX",
      services: "Our Services",
      book: "Book Now"
    },
    hi: {
      subtitle: "Denton Mein Premium Barber Services",
      title: "Classic Cuts, Modern Style",
      highlight: "Premium Barber Shop",
      description:
        "PMC Barbershop mein, hum traditional barbering techniques ko modern styling ke saath combine karte hain aapko perfect look dene ke liye. Hamare experienced barbers precision cuts, beard grooming, aur relaxing hot towel shaves classic barbershop atmosphere mein provide karte hain.",
      location: "Denton, TX",
      services: "Hamari Services",
      book: "Abhi Book Karein"
    }
  } as const;
  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  return (
    <section className="w-full py-12 md:py-24 px-6" id="home">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 order-1 md:order-none">
          <div className="text-blue-800 dark:text-yellow-400 font-semibold mb-2">
            {content.subtitle}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white leading-tight mb-2">
            {content.title}
          </h1>
          <div className="relative w-fit mb-4">
            <span className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-yellow-400/80">
              {content.highlight}
            </span>
            <span className="absolute left-0 right-0 -bottom-1 h-2 bg-green-300/60 dark:bg-yellow-500/40 rounded" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6 max-w-xl pt-4">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border text-muted-foreground border-white dark:border-white/20 shadow-sm hover:shadow-lg hover:border-gray-400 dark:hover:border-yellow-400">
              <MapPin className="h-5 w-5 text-blue-800 dark:text-yellow-400" />
              {content.location}
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xl">
            <button className="hover:-translate-y-2 hover:scale-105 flex-1 flex items-center justify-center gap-3 px-4 py-1 rounded-lg border border-gray-300 dark:border-gray-300 dark:text-white hover:bg-green-500/60 dark:hover:bg-yellow-400/90 transition text-sm font-semibold">
              <Phone className="h-4 w-4 dark:text-white" />
              {content.services}
            </button>
            <button className="hover:-translate-y-2 hover:scale-105 flex-1 flex px-4 py-1 rounded-lg items-center justify-center gap-3 bg-blue-800 dark:bg-yellow-400 text-white hover:bg-blue-700/80 dark:hover:bg-yellow-500 transition text-sm font-semibold">
              <Phone className="h-4 w-4 text-white" />
              {content.book}
            </button>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 order-2 md:order-none flex justify-center items-center h-full">
          <div className="w-full h-72 md:h-[420px] rounded-lg shadow-lg">
            <img
              src="/hero.webp"
              alt="Barbershop Team"
              className="rounded-lg shadow-lg w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
