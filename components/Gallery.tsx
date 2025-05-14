"use client"

import { useRef, useState } from "react"
import CustomTitle from "./CustomTitle"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

const galleryImages = [
  { src: "/first.jpeg", alt: "Haircut closeup" },
  { src: "/about.webp", alt: "Barbershop exterior" },
  { src: "/third.webp", alt: "Trophy and awards" },
]

export default function Gallery() {

  const { language } = useLanguage();

  const contentMap = {
    en: {
      title: "Our Barbershop Gallery",
      slug: "Our Work & Shop",
      description: "Take a look at our shop atmosphere and the quality cuts we deliver."
    },
    hi: {
      title: "Hamari Barbershop Gallery",
      slug: "Hamari Kaam Aur Shop",
      description: "Hamare shop ke atmosphere aur quality cuts jo hum clients ko provide karte hain, ki jhalak dekhein."
    }
  } as const;
  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalImg, setModalImg] = useState<null | { src: string; alt: string }>(null)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const width = container.clientWidth
      container.scrollTo({ left: index * width, behavior: "smooth" })
      setActiveIndex(index)
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth
      const scrollLeft = scrollRef.current.scrollLeft
      setActiveIndex(Math.round(scrollLeft / width))
    }
  }

  return (
    <div className="relative py-16 w-full min-h-screen" id="gallery">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />

        {/* Desktop View */}
        <div className="hidden md:flex justify-center gap-6 lg:gap-8 mt-12 flex-wrap max-w-5xl mx-auto">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx} 
              className="w-[280px] lg:w-[320px] h-[200px] lg:h-[220px] mb-6 overflow-hidden rounded-xl shadow cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setModalImg(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile Scroll View */}
        <div className="md:hidden mt-10 relative max-w-sm mx-auto">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide w-full"
            style={{ scrollbarWidth: "none" }}
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full px-2 snap-center"
                onClick={() => setModalImg(img)}
              >
                <div className="rounded-xl shadow overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-[220px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {galleryImages.map((_, idx) => (
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

          {/* Scroll Buttons */}
          <div className="flex justify-center mt-4 gap-6">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
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
              onClick={() =>
                scrollToIndex(Math.min(galleryImages.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === galleryImages.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === galleryImages.length - 1
                  ? "bg-blue-800/40 dark:bg-yellow-400/40 cursor-not-allowed"
                  : "bg-blue-800 dark:bg-yellow-400 hover:bg-blue-900 dark:hover:bg-yellow-500"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Image */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setModalImg(null)}
        >
          <div className="relative max-w-3xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black rounded-full px-3 py-1 z-10"
              onClick={() => setModalImg(null)}
            >
              ×
            </button>
            <img src={modalImg.src} alt={modalImg.alt} className="w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  )
}
