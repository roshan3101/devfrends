"use client";

import { useRef, useState } from "react";
import CustomTitle from "./CustomTitle";
import { FaInstagram, FaFacebook, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const contentMap = {
  en: {
    slug: "Expert Stylists",
    title: "Meet Our Barbers",
    description: "Our team of skilled barbers is dedicated to providing you with the perfect cut and grooming experience.",
    barbers: [
      {
        name: "Jason Rodriguez",
        title: "Owner & Master Barber",
        desc:
          "With over 15 years of experience, Jason founded PMC Barbershop to bring premium men's grooming services to Denton. Specializing in classic cuts and...",
        img: "/barber1.webp",
        socials: [
          { icon: FaInstagram, url: "https://www.instagram.com/pmcbarbershop/" },
          { icon: FaFacebook, url: "#" }
        ],
      },
      {
        name: "Marcus Williams",
        title: "Senior Barber",
        desc:
          "Marcus brings 8 years of experience to PMC Barbershop. His expertise in fades, beard sculpting, and precision lineup work has earned him a loyal...",
        img: "/barber2.jpeg",
        socials: [
          { icon: FaInstagram, url: "#" },
          { icon: FaFacebook, url: "#" }
        ],
      },
      {
        name: "Terrence Jackson",
        title: "Barber & Stylist",
        desc:
          "Terrence specializes in modern men's styling, textured cuts, and hair designs. With his creative approach and technical skill, he excels at transforming your look...",
        img: "/first.jpeg",
        socials: [
          { icon: FaInstagram, url: "#" },
          { icon: FaFacebook, url: "#" }
        ],
      },
    ],
  },
  hi: {
    slug: "Expert Stylists",
    title: "Hamare Barbers Se Milein",
    description: "Hamare skilled barbers ki team aapko perfect cut aur grooming experience provide karne ke liye dedicated hai.",
    barbers: [
      {
        name: "Jason Rodriguez",
        title: "Owner & Master Barber",
        desc:
          "15 saal se zyada experience ke saath, Jason ne PMC Barbershop ki shuruaat ki taaki Denton mein premium men's grooming services laa sakein. Classic cuts mein expert...",
        img: "/barber1.webp",
        socials: [
          { icon: FaInstagram, url: "https://www.instagram.com/pmcbarbershop/" },
          { icon: FaFacebook, url: "#" }
        ],
      },
      {
        name: "Marcus Williams",
        title: "Senior Barber",
        desc:
          "Marcus PMC Barbershop mein 8 saal ka anubhav lekar aaye hain. Fades, beard sculpting, aur precision lineup work mein expert hain, isi wajah se unka client base loyal hai...",
        img: "/barber2.jpeg",
        socials: [
          { icon: FaInstagram, url: "#" },
          { icon: FaFacebook, url: "#" }
        ],
      },
      {
        name: "Terrence Jackson",
        title: "Barber & Stylist",
        desc:
          "Terrence modern men's styling, textured cuts, aur hair designs mein specialist hain. Unka creative approach aur technical skill aapke look ko transform karne mein madad karta hai...",
        img: "/first.jpeg",
        socials: [
          { icon: FaInstagram, url: "#" },
          { icon: FaFacebook, url: "#" }
        ],
      },
    ],
  },
} as const;

export default function MeetBarbers() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      setActiveIndex(Math.round(scrollLeft / width));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < content.barbers.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-16 w-full">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-5xl mx-auto">
          {content.barbers.map((b, idx) => (
            <div
              key={idx}
              className="bg-white/80 dark:bg-zinc-900/80 border border-blue-200 dark:border-yellow-400/40 rounded-2xl shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden group hover:-translate-y-2 hover:border-blue-400 dark:hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-t-2xl py-6">
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="block h-1 w-16 mx-auto mt-2 mb-4 rounded transition-all duration-500 ease-in-out group-hover:w-32 bg-gradient-to-r from-blue-700 to-green-400 dark:from-yellow-400 dark:to-yellow-400" />
              <div className="flex-1 flex flex-col items-center px-6 pb-8">
                <h3 className="text-base font-bold mb-1 mt-2 text-center">{b.name}</h3>
                <div className="text-xs font-semibold text-green-800/80 dark:text-yellow-300 mb-2 text-center">{b.title}</div>
                <p className="text-muted-foreground text-sm text-center mb-4">{b.desc}</p>
                <div className="flex gap-3 mt-auto">
                  {b.socials.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-yellow-100 text-blue-700 dark:text-yellow-500 transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-white"
                      >
                        <Icon size={12} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll View */}
        <div className="md:hidden mt-12 max-w-sm mx-auto">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide w-full"
            style={{ scrollbarWidth: "none" }}
          >
            {content.barbers.map((b, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 snap-center w-full px-2"
              >
                <div className="bg-white/80 dark:bg-zinc-900/80 border border-blue-200 dark:border-yellow-400/40 rounded-2xl shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group py-6">
                  <div className="px-4 mb-2">
                    <img
                      src={b.img}
                      alt={b.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  <span className="block h-1 w-16 mx-auto mt-4 mb-4 rounded bg-gradient-to-r from-blue-700 to-green-400 dark:from-yellow-400 dark:to-yellow-400" />
                  <div className="flex-1 flex flex-col items-center px-4">
                    <h3 className="text-base font-bold mb-1 text-center">{b.name}</h3>
                    <div className="text-xs font-semibold text-green-800/80 dark:text-yellow-300 mb-2 text-center">{b.title}</div>
                    <p className="text-sm text-center mb-4">{b.desc}</p>
                    <div className="flex gap-3 mt-auto">
                      {b.socials.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-yellow-100 text-blue-700 dark:text-yellow-500 transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-white"
                          >
                            <Icon size={12} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons at Bottom Center */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === 0
                  ? "bg-blue-800/40 dark:bg-yellow-400/40 cursor-not-allowed"
                  : "bg-blue-800 dark:bg-yellow-400 hover:bg-blue-900 dark:hover:bg-yellow-500"
              }`}
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={goToNext}
              disabled={activeIndex === content.barbers.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-black transition ${
                activeIndex === content.barbers.length - 1
                  ? "bg-blue-800/40 dark:bg-yellow-400/40 cursor-not-allowed"
                  : "bg-blue-800 dark:bg-yellow-400 hover:bg-blue-900 dark:hover:bg-yellow-500"
              }`}
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {content.barbers.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex 
                    ? "w-8 bg-blue-800 dark:bg-yellow-400" 
                    : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
