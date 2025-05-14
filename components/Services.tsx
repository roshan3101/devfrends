"use client"

import Image from "next/image"
import { ArrowUp } from "lucide-react"
import SectionTitle from "./CustomTitle"
import { serviceItems } from "@/lib/ServiceItems"
import { useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

export default function BarberServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  const contentMap = {
    en: {
      slug: "Premium Grooming",
      title: "Our Barber Services",
      description: "Professional barbering services to keep you looking sharp for everyday confidence or special occasions.",
      services: [
        {
          title: "Haircuts",
          desc: "Our skilled barbers deliver precision haircuts tailored to your style and face shape. From classic cuts to modern fades, we ensure you leave looking sharp and confident.",
          items: ["Classic Cuts", "Modern Styles"]
        },
        {
          title: "Beard Services",
          desc: "Maintain your facial hair with our premium beard services. Our barbers specialize in perfect beard shaping, precise trims, and luxurious hot towel shaves for the ultimate grooming experience.",
          items: ["Beard Trims", "Beard Shaping"]
        },
        {
          title: "Premium Services",
          desc: "Enhance your look with our premium barbering services including expert hair coloring, revitalizing scalp treatments, and styling for special occasions when you need to look your absolute best.",
          items: ["Hair Coloring", "Scalp Treatments"]
        }
      ]
    },
    hi: {
      slug: "Premium Grooming",
      title: "Hamari Barber Services",
      description: "Professional barbering services jo everyday confidence ya special occasions ke liye aapko sharp dikhne mein help karein.",
      services: [
        {
          title: "Haircuts",
          desc: "Hamare skilled barbers aapke style aur face shape ke hisaab se precision haircuts dete hain. Classic cuts se leke modern fades tak, hum ensure karte hain ki aap hamesha sharp aur confident dikhein.",
          items: ["Classic Cuts", "Modern Styles"]
        },
        {
          title: "Beard Services",
          desc: "Aapke facial hair ko perfect shape dene ke liye premium beard services. Hamare barbers beard shaping, precise trims, aur luxurious hot towel shaves mein expert hain, taaki aapko mile ultimate grooming experience.",
          items: ["Beard Trims", "Beard Shaping"]
        },
        {
          title: "Premium Services",
          desc: "Aapke look ko enhance karein hamare premium barbering services ke saath, jaise expert hair coloring, scalp treatments, aur special occasions ke liye styling, jab aapko best dikhna ho.",
          items: ["Hair Coloring", "Scalp Treatments"]
        }
      ]
    }
  } as const;
  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newIndex = Math.max(0, activeIndex - 1);
      setActiveIndex(newIndex);
      scrollContainerRef.current.scrollTo({ 
        left: newIndex * scrollContainerRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newIndex = Math.min(content.services.length - 1, activeIndex + 1);
      setActiveIndex(newIndex);
      scrollContainerRef.current.scrollTo({ 
        left: newIndex * scrollContainerRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="min-h-screen" id="services">
      <main className="w-full px-4 py-12 md:py-16 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12 group">
          <SectionTitle 
            slug={content.slug}
            title={content.title}
            description={content.description}
          />
        </div>

        {/* Desktop view - Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-8 md:mt-12">
          {content.services.map((item, index) => (
            <ServiceCard
              key={index}
              title={item.title}
              description={item.desc}
              items={item.items}
              icon={serviceItems[index]?.img || "/placeholder.svg"}
            />
          ))}
        </div>

        {/* Mobile view - Horizontal scroll */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
            onScroll={handleScroll}
          >
            {content.services.map((item, index) => (
              <div key={index} className="snap-center flex-shrink-0 w-full px-1">
                <ServiceCard
                  title={item.title}
                  description={item.desc}
                  items={item.items}
                  icon={serviceItems[index]?.img || "/placeholder.svg"}
                />
              </div>
            ))}
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-6 gap-2 mb-4">
            {content.services.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "w-8 bg-blue-800 dark:bg-yellow-400" 
                    : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Bottom-centered navigation buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <button 
              onClick={scrollLeft}
              className={`w-10 h-10 rounded-full bg-blue-800/80 dark:bg-yellow-400/80 flex items-center justify-center text-white dark:text-black hover:bg-blue-900 dark:hover:bg-yellow-500 transition-all duration-300 ${
                activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Previous service"
              disabled={activeIndex === 0}
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={scrollRight}
              className={`w-10 h-10 rounded-full bg-blue-800/80 dark:bg-yellow-400/80 flex items-center justify-center text-white dark:text-black hover:bg-blue-900 dark:hover:bg-yellow-500 transition-all duration-300 ${
                activeIndex === content.services.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              aria-label="Next service"
              disabled={activeIndex === content.services.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      <button
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 bg-blue-800 hover:bg-blue-900 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="text-white dark:text-black" />
      </button>
    </div>
  );
}

interface ServiceCardProps {
  title: string
  icon: string
  description: string
  items: readonly string[]
}

function ServiceCard({ title, icon, description, items }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 py-8 md:py-16 px-6 md:px-8 flex flex-col h-full group hover:-translate-y-2 relative overflow-hidden">
      <span className="absolute left-0 top-0 w-0 group-hover:w-full h-1 transition-all duration-300 rounded-t-xl
        bg-gradient-to-r from-blue-700 via-purple-500 to-amber-500 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-200"></span>
      <div className="flex flex-col items-start">
        <div className="bg-blue-100 dark:bg-zinc-800 w-16 md:w-20 h-16 md:h-20 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 ease-in-out group-hover:bg-blue-100 dark:group-hover:bg-yellow-400/20">
          <Image src={icon || "/placeholder.svg"} alt={title} width={36} height={36} className="transition-all duration-300 ease-in-out group-hover:scale-110 w-7 md:w-9" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-blue-800 dark:text-white mb-3 md:mb-4 transition-all duration-300 dark:group-hover:text-yellow-400">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-1 md:space-y-2 w-full">
          {items.map((item, index) => (
            <li key={index} className="flex items-center text-gray-700 dark:text-gray-200 text-xs md:text-sm">
              <span className="mr-2 text-gray-400 dark:text-yellow-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
