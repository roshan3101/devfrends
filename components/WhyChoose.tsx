"use client"

import { useRef, useState } from "react"
import CustomTitle from "./CustomTitle"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

const contentMap = {
  en: {
    slug: "Our Commitment",
    title: "Why Choose PMC Barbershop?",
    description: "What makes us the premier barbershop in Denton, TX.",
    features: [
      {
        tag: "User",
        title: "Expert Barbers",
        description:
          "Our team consists of certified barbers with years of experience in classic and modern cutting techniques, beard grooming, and men's styling.",
      },
      {
        tag: "Scissors",
        title: "Premium Tools & Products",
        description:
          "We use only high-quality barbering tools and premium men's grooming products to ensure the best results for your hair and skin.",
      },
      {
        tag: "Home",
        title: "Classic Barbershop Experience",
        description:
          "Enjoy a comfortable, clean shop with a classic barbershop atmosphere where you can relax while getting a great cut or shave.",
      },
    ],
  },
  hi: {
    slug: "Hamari Commitment",
    title: "PMC Barbershop Ko Kyun Chunein?",
    description: "Kya hamein Denton, TX ka premier barbershop banata hai.",
    features: [
      {
        tag: "User",
        title: "Expert Barbers",
        description:
          "Hamari team certified barbers se bani hai jinhe classic aur modern cutting techniques, beard grooming, aur men's styling mein saalon ka experience hai.",
      },
      {
        tag: "Scissors",
        title: "Premium Tools & Products",
        description:
          "Hum sirf high-quality barbering tools aur premium men's grooming products use karte hain aapke hair aur skin ke liye best results ensure karne ke liye.",
      },
      {
        tag: "Home",
        title: "Classic Barbershop Experience",
        description:
          "Ek comfortable, clean shop ka anand uthayein classic barbershop atmosphere ke saath jahan aap relax kar sakte hain jabki great cut ya shave paa rahe hain.",
      },
    ],
  },
} as const;

export default function WhyChoose() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      setActiveIndex(index)
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollLeft = () => scrollTo(Math.max(0, activeIndex - 1))
  const scrollRight = () =>
    scrollTo(Math.min(content.features.length - 1, activeIndex + 1))

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const width = scrollRef.current.offsetWidth
      const index = Math.round(scrollLeft / width)
      setActiveIndex(index)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-16">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />
      <div className="absolute -bottom-25 -left-10 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {content.features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>

        {/* Mobile scrollable layout */}
        <div className="md:hidden mt-12 relative w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
            onScroll={handleScroll}
          >
            {content.features.map((feature, idx) => (
              <div
                key={idx}
                className="snap-center flex-shrink-0 w-full px-2"
              >
                <FeatureCard feature={feature} isMobile />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {content.features.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-blue-800 dark:bg-yellow-400"
                    : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === 0
                  ? "bg-blue-800/40 dark:bg-yellow-400/40 cursor-not-allowed"
                  : "bg-blue-800 dark:bg-yellow-400 hover:bg-blue-900 dark:hover:bg-yellow-500"
              }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={scrollRight}
              disabled={activeIndex === content.features.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === content.features.length - 1
                  ? "bg-blue-800/40 dark:bg-yellow-400/40 cursor-not-allowed"
                  : "bg-blue-800 dark:bg-yellow-400 hover:bg-blue-900 dark:hover:bg-yellow-500"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  feature,
  isMobile = false,
}: {
  feature: { tag: string; title: string; description: string }
  isMobile?: boolean
}) {
  return (
    <div
      className={`bg-white/70 dark:bg-zinc-900/70 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm transition-all duration-300 group relative overflow-hidden flex flex-col h-full py-10 px-6 hover:border-blue-700 dark:hover:border-yellow-400 ${
        isMobile ? "w-[90vw] mx-auto" : ""
      }`}
    >
      {/* Colored Line */}
      <span
        className="absolute left-0 top-0 h-full w-1 bg-blue-700 dark:bg-yellow-400 rounded-l-xl transition-all duration-300 group-hover:w-full group-hover:h-1 group-hover:rounded-t-xl group-hover:rounded-l-none"
      />
      {/* Tag */}
      <div className="relative z-10 mb-8">
        <span
          className="inline-block px-4 py-4 rounded-xl bg-blue-100 dark:bg-yellow-100 text-blue-800 dark:text-yellow-700 font-medium transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-white"
        >
          {feature.tag}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 z-10 relative">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 z-10 relative text-sm sm:text-base">
        {feature.description}
      </p>
    </div>
  )
}
