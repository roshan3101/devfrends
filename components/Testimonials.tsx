"use client"

import { useRef, useState } from "react"
import CustomTitle from "./CustomTitle"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

const contentMap = {
  en: {
    slug: "Testimonials",
    title: "What Our Clients Say",
    testimonials: [
      {
        quote:
          "I've been getting my hair cut at PMC Barbershop for over 2 years now. The attention to detail is unmatched, and the atmosphere is always welcoming. My barber remembers exactly how I like my fade every time!",
        name: "Mike Johnson",
        stars: 5,
      },
      {
        quote:
          "As someone who's particular about their haircut, I was nervous trying a new place. The team at PMC took their time to understand what I wanted and delivered exactly that. Will definitely be coming back!",
        name: "David Martinez",
        stars: 5,
      },
      {
        quote:
          "The hot towel shave experience at PMC Barbershop is phenomenal! It's the perfect blend of old-school barbering with modern techniques. My beard has never looked better.",
        name: "Chris Taylor",
        stars: 5,
      },
    ],
  },
  hi: {
    slug: "Testimonials",
    title: "Hamare Clients Kya Kehte Hain",
    testimonials: [
      {
        quote:
          "Main 2 saal se PMC Barbershop se apne baal katva raha hoon. Detail par dhyan dena unmatched hai, aur atmosphere hamesha welcoming hota hai. Mera barber har baar yaad rakhta hai ki mujhe apna fade kaise pasand hai!",
        name: "Mike Johnson",
        stars: 5,
      },
      {
        quote:
          "Ek aise insaan ke roop mein jo apne haircut ke baare mein particular hai, main ek nayi jagah try karne ke baare mein nervous tha. PMC ki team ne samay liya samajhne ke liye ki main kya chahta hoon aur exactly vohi deliver kiya. Definitely vapas aaunga!",
        name: "David Martinez",
        stars: 5,
      },
      {
        quote:
          "PMC Barbershop par hot towel shave experience phenomenal hai! Yeh old-school barbering ka modern techniques ke saath perfect blend hai. Meri beard kabhi bhi behtar nahi dikhi.",
        name: "Chris Taylor",
        stars: 5,
      },
    ],
  },
} as const;

export default function Testimonials() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(0, activeIndex - 1)
      setActiveIndex(newIndex)
      scrollRef.current.scrollTo({
        left: newIndex * scrollRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(content.testimonials.length - 1, activeIndex + 1)
      setActiveIndex(newIndex)
      scrollRef.current.scrollTo({
        left: newIndex * scrollRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const width = scrollRef.current.offsetWidth
      const newIndex = Math.round(scrollLeft / width)
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-16">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description=""
        />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-5xl mx-auto">
          {content.testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>

        {/* Mobile scrollable */}
        <div className="md:hidden mt-12 relative max-w-sm mx-auto">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full"
            style={{ scrollbarWidth: "none" }}
            onScroll={handleScroll}
          >
            {content.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="snap-center flex-shrink-0 w-full px-2"
              >
                <TestimonialCard {...t} isMobile />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {content.testimonials.map((_, idx) => (
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
              disabled={activeIndex === content.testimonials.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === content.testimonials.length - 1
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

function TestimonialCard({
  quote,
  name,
  stars,
  isMobile = false,
}: {
  quote: string
  name: string
  stars: number
  isMobile?: boolean
}) {
  return (
    <div className={`bg-white/80 dark:bg-zinc-900/80 border border-gray-300 dark:border-zinc-800 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden`}>
      <div className="px-6 py-10 pb-4 flex-1 flex flex-col justify-between relative text-sm sm:text-base">
        <div className="text-3xl text-gray-400 dark:text-yellow-400/70 font-serif mb-2 absolute top-8">"</div>
        <p className="italic text-gray-700 dark:text-gray-200 text-base leading-relaxed">{quote}</p>
        <div className="text-3xl text-gray-400 dark:text-yellow-400/70 font-serif text-right absolute bottom-0 right-4">"</div>
      </div>
      <div className="border-t border-gray-200 dark:border-zinc-700 px-6 py-4 flex items-center relative bg-white/60 dark:bg-zinc-900/60">
        <span className="text-yellow-400 mr-2 text-sm">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </span>
        <span className="h-5 w-1 bg-blue-700 dark:bg-yellow-400 rounded mx-2 inline-block" />
        <span className="font-bold text-blue-800 dark:text-yellow-400 text-sm">{name}</span>
        <span className="absolute -bottom-16 -right-12 w-36 h-36 rounded-full bg-violet-300 dark:bg-yellow-200 opacity-30 z-0" />
      </div>
    </div>
  )
}
