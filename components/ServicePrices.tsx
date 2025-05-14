"use client"

import { useRef, useState } from "react"
import CustomTitle from "./CustomTitle"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

const contentMap = {
  en: {
    slug: "Quality Barbering at Fair Prices",
    title: "Our Service Prices",
    description: "Choose from our range of professional barbering services.",
    plans: [
      {
        title: "Classic Services",
        price: 25,
        period: "/mo",
        features: [
          "Men's Haircut",
          "Kids Haircut (12 & under)",
          "Senior Haircut (65+)",
          "Military/First Responder Cut",
          "Basic Beard Trim",
          "Neck & Line Cleanup (between cuts)",
        ],
        popular: true,
        button: "Book Now",
      },
      {
        title: "Premium Services",
        price: 35,
        period: "/mo",
        features: [
          "Haircut & Beard Combo",
          "Hot Towel Shave",
          "Full Beard Shaping & Design",
          "Color Camo (Gray Blending)",
          "Hair & Scalp Treatment",
          "Head Shave with Hot Towel",
        ],
        popular: false,
        button: "Book Now",
      },
      {
        title: "Packages",
        price: 50,
        period: "/mo",
        features: [
          "The Works (Cut, Shave, Treatment)",
          "Father & Son Combo",
          "Groom's Package",
          "Monthly Membership (2 cuts/mo)",
          "First-Time Client Special",
          "Loyalty Program",
        ],
        popular: false,
        button: "Inquire",
      },
    ],
  },
  hi: {
    slug: "Fair Prices Par Quality Barbering",
    title: "Hamari Service Prices",
    description: "Hamari professional barbering services ki range mein se choose karein.",
    plans: [
      {
        title: "Classic Services",
        price: 25,
        period: "/mo",
        features: [
          "Men's Haircut",
          "Kids Haircut (12 & under)",
          "Senior Haircut (65+)",
          "Military/First Responder Cut",
          "Basic Beard Trim",
          "Neck & Line Cleanup (between cuts)",
        ],
        popular: true,
        button: "Abhi Book Karein",
      },
      {
        title: "Premium Services",
        price: 35,
        period: "/mo",
        features: [
          "Haircut & Beard Combo",
          "Hot Towel Shave",
          "Full Beard Shaping & Design",
          "Color Camo (Gray Blending)",
          "Hair & Scalp Treatment",
          "Head Shave with Hot Towel",
        ],
        popular: false,
        button: "Abhi Book Karein",
      },
      {
        title: "Packages",
        price: 50,
        period: "/mo",
        features: [
          "The Works (Cut, Shave, Treatment)",
          "Father & Son Combo",
          "Groom's Package",
          "Monthly Membership (2 cuts/mo)",
          "First-Time Client Special",
          "Loyalty Program",
        ],
        popular: false,
        button: "Poochiye",
      },
    ],
  },
} as const;

export default function ServicePrices() {
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
    scrollTo(Math.min(content.plans.length - 1, activeIndex + 1))

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
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {content.plans.map((p, idx) => (
            <PriceCard key={idx} plan={p} />
          ))}
        </div>

        {/* Mobile scrollable layout */}
        <div className="md:hidden mt-12 relative w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={handleScroll}
          >
            {content.plans.map((p, idx) => (
              <div key={idx} className="snap-center flex-shrink-0 w-full px-2">
                <PriceCard plan={p} isMobile />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {content.plans.map((_, idx) => (
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

          {/* Navigation buttons */}
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
              disabled={activeIndex === content.plans.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === content.plans.length - 1
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

function PriceCard({
  plan,
  isMobile = false,
}: {
  plan: {
    title: string
    price: number
    period: string
    features: readonly string[]
    popular: boolean
    button: string
  }
  isMobile?: boolean
}) {
  return (
    <div
      className={`bg-white/80 dark:bg-zinc-900/80 border rounded-2xl shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
        plan.popular
          ? "border-2 border-blue-700 dark:border-yellow-400/80 shadow-lg"
          : "border border-gray-300 dark:border-zinc-800 hover:border-blue-700 dark:hover:border-yellow-400"
      } hover:-translate-y-2 ${
        isMobile ? "w-[90vw] mx-auto" : ""
      }`}
    >
      {/* Most Popular Badge */}
      {plan.popular && (
        <>
          <div className="h-[4px] w-full absolute top-0 -translate-x-0 bg-gradient-to-r from-blue-700 to-green-400 dark:from-yellow-400 dark:to-yellow-300 text-white rounded-b-lg shadow font-semibold text-xs z-0" />
          <span className="absolute -top-1 right-1/11 -translate-x-0 bg-gradient-to-r from-blue-700 to-green-400 dark:from-yellow-400 dark:to-yellow-300 text-white px-4 py-1 rounded-b-lg shadow font-semibold text-xs z-10">
            Most Popular
          </span>
        </>
      )}
      <div className="p-8 pt-12 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          {plan.title}
        </h3>
        <hr className="w-12 border-t-2 border-blue-700 dark:border-yellow-400 mb-6" />
        <div className="flex items-end mb-8 hover:scale-110 transition-all">
          <span className="text-2xl text-gray-700 dark:text-gray-200 font-bold mr-1">
            $
          </span>
          <span className="text-4xl font-extrabold text-teal-600 dark:text-yellow-400">
            {plan.price}
          </span>
          <span className="text-gray-400 dark:text-gray-300 ml-1">
            {plan.period}
          </span>
        </div>
        <ul className="space-y-4 mb-8">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-center text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-300 cursor-pointer hover:translate-x-2 hover:bg-gray-100 dark:hover:bg-yellow-100/10 text-sm py-1"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 dark:bg-yellow-400 text-white dark:text-black mr-3">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M4 8l3 3 5-5"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
        <button
          className={`mt-auto w-full py-3 rounded-lg font-bold transition-all duration-300 ${
            plan.popular
              ? "bg-blue-700 dark:bg-yellow-400 text-white dark:text-black hover:bg-blue-800 dark:hover:bg-yellow-500"
              : "bg-white dark:bg-zinc-900 border border-blue-700 dark:border-yellow-400 text-blue-700 dark:text-yellow-400 hover:bg-blue-700 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black"
          }`}
        >
          {plan.button}
        </button>
      </div>
    </div>
  )
}
