"use client"

import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  const contentMap = {
    en: {
      subtitle: "Our Story",
      title: "About PMC Barbershop",
      description: "Established in 2018, PMC Barbershop has been providing premium grooming services to the men of Denton, TX. Our mission is to deliver exceptional haircuts and grooming services in a welcoming, classic barbershop environment.",
      badge: "5+ years",
      para1: "Established in 2018, PMC Barbershop has been providing premium grooming services to the men of Denton, TX. Our mission is to deliver exceptional haircuts and grooming services in a welcoming, classic barbershop environment.",
      quote: "We take pride in our attention to detail and personalized service, ensuring each client leaves looking and feeling their best. Our skilled barbers combine traditional techniques with modern trends to create custom styles that suit each individual's personality and lifestyle."
    },
    hi: {
      subtitle: "Hamari Kahani",
      title: "PMC Barbershop Ke Bare Mein",
      description: "2018 mein established, PMC Barbershop Denton, TX ke logon ko premium grooming services provide kar raha hai. Hamara mission exceptional haircuts aur grooming services ek welcoming, classic barbershop environment mein deliver karna hai.",
      badge: "5+ saal",
      para1: "2018 mein established, PMC Barbershop Denton, TX ke logon ko premium grooming services provide kar raha hai. Hamara mission exceptional haircuts aur grooming services ek welcoming, classic barbershop environment mein deliver karna hai.",
      quote: "Hum apni attention to detail aur personalized service par pride lete hain, ensuring har client best looking aur feeling ke saath leave kare. Hamare skilled barbers traditional techniques ko modern trends ke saath combine karte hain custom styles create karne ke liye jo har individual ki personality aur lifestyle ke according ho."
    }
  } as const;
  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  return (
    <div className="relative w-full min-h-screen overflow-hidden" id="about">
      {/* Decorative circle top right */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gray-200 dark:bg-white/10 -translate-y-1/4 translate-x-1/4" />

      {/* Decorative circle bottom left */}
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-gray-200 dark:bg-white/10 translate-y-1/4 -translate-x-1/4" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <p className="text-blue-800 dark:text-yellow-400 font-medium mb-2">{content.subtitle}</p>
          <div className="relative inline-block group">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white cursor-pointer">
              {content.title}
            </h1>
            <span
              className="block h-1 w-12 mt-2 mx-auto rounded transition-all duration-500 ease-in-out group-hover:w-full
                bg-gradient-to-r from-blue-500 to-green-400 dark:from-yellow-400 dark:to-yellow-400"
            />
          </div>

          <p className="max-w-4xl mx-auto mt-8 text-muted-foreground leading-relaxed text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-lg group">
            <Image
              src="/about.webp"
              alt="PMC Barbershop storefront"
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute bottom-4 right-4 bg-blue-800 dark:bg-yellow-400/90 text-white px-4 py-3 rounded-md font-bold
              transform rotate-[10deg] group-hover:rotate-0 transition-transform duration-500 ease-in-out">
              {content.badge}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="border-l-4 border-blue-800 dark:border-yellow-400/70 pl-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.para1}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-white/10 p-6 rounded-lg relative">
              <div className="text-3xl text-gray-400 dark:text-yellow-400/70 font-serif absolute top-0">"</div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.quote}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
