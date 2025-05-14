"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { language } = useLanguage();

  const contentMap = {
    en: {
      title: "Ready for a Fresh Cut?",
      description: "Visit PMC Barbershop for premium men's grooming services. Our expert barbers are ready to give you a clean, precise cut and a relaxing barbershop experience.",
      button1: "Book an Appointment",
      button2: "View Our Services",
    },
    hi: {
      title: "Fresh Cut Ke Liye Ready Hain?",
      description: "Premium men's grooming services ke liye PMC Barbershop visit karein. Hamare expert barbers aapko clean, precise cut aur relaxing barbershop experience dene ke liye ready hain.",
      button1: "Appointment Book Karein",
      button2: "Hamari Services Dekhein"
    }
  } as const;

  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  return (
    <section
      className="w-full py-28 px-4 relative overflow-hidden bg-blue-900 dark:bg-amber-400"
    >
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-20 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 bg-white"></div>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-4xl font-bold mb-4 text-white">{content.title}</h1>
        <p className="text-white mb-8 max-w-2xl mx-auto">{content.description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            className={`font-medium transition-colors bg-white text-blue-900 hover:bg-blue-100 dark:bg-white dark:text-amber-500 dark:hover:bg-amber-100
            }`}
          >
            {content.button1}
          </Button>

          <Button
            size="lg"
            className={`font-medium transition-colors bg-white text-blue-900 hover:text-white hover:bg-blue-600 dark:text-amber-500 dark:bg-black dark:hover:bg-transparent dark:hover:text-black dark:hover:border-2 dark:hover:border-white
            }`}
          >
            {content.button2}
          </Button>
        </div>
      </div>
    </section>
  )
}
