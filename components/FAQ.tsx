"use client"

import { useState } from "react";
import CustomTitle from "./CustomTitle";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const contentMap = {
  en: {
    slug: "Common Questions",
    title: "Frequently Asked Questions",
    description: "Answers to common questions about our barbershop services.",
    searchPlaceholder: "Search for questions...",
    tags: ["All Questions", "General", "Services", "Pricing", "Support"],
    faqs: [
      {
        question: "Do I need an appointment or can I walk in?",
        answer:
          "We welcome both appointments and walk-ins. However, we recommend booking in advance to ensure your preferred time slot, especially on weekends. You can book through our website, by phone, or via WhatsApp.",
        tag: "General",
      },
      {
        question: "How long does a typical haircut take?",
        answer:
          "A standard men's haircut takes approximately 30-45 minutes. Services like beard trims add 15-20 minutes, while premium services like hot towel shaves may take up to an hour. We take our time to ensure quality results.",
        tag: "Services",
      },
      {
        question: "What form of payment do you accept?",
        answer:
          "We accept cash, all major credit/debit cards, Apple Pay, Google Pay, and Venmo for your convenience.",
        tag: "Pricing",
      },
      {
        question: "Do you offer any loyalty programs or discounts?",
        answer:
          "Yes, we offer a loyalty program where your 10th haircut is free. We also offer discounts for military personnel, first responders, seniors, and students with valid ID.",
        tag: "Support",
      },
      {
        question: "What hair products do you use and sell?",
        answer:
          "We use and sell premium men's grooming products from brands like Uppercut Deluxe, Layrite, and American Crew. Our barbers can recommend the best products for your hair type and style.",
        tag: "Services",
      },
    ],
  },
  hi: {
    slug: "Common Questions",
    title: "Aksar Pooche Jane Wale Sawal",
    description: "Hamare barbershop services ke baare mein aam sawalo ke jawab.",
    searchPlaceholder: "Questions search karein...",
    tags: ["All Questions", "General", "Services", "Pricing", "Support"],
    faqs: [
      {
        question: "Kya mujhe appointment ki zarurat hai ya main walk in kar sakta hoon?",
        answer:
          "Hum appointments aur walk-ins dono ka swagat karte hain. Halaanki, hum aapke preferred time slot ko ensure karne ke liye advance mein booking karne ki salah dete hain, khaaskar weekends par. Aap hamari website, phone, ya WhatsApp ke through book kar sakte hain.",
        tag: "General",
      },
      {
        question: "Ek typical haircut mein kitna time lagta hai?",
        answer:
          "Ek standard men's haircut mein approximately 30-45 minutes lagte hain. Beard trims jaise services 15-20 minutes add karte hain, jabki hot towel shaves jaise premium services mein ek ghante tak lag sakte hain. Hum quality results ensure karne ke liye apna time lete hain.",
        tag: "Services",
      },
      {
        question: "Aap kaun se payment forms accept karte hain?",
        answer:
          "Hum aapki suvidha ke liye cash, sabhi major credit/debit cards, Apple Pay, Google Pay, aur Venmo accept karte hain.",
        tag: "Pricing",
      },
      {
        question: "Kya aap koi loyalty program ya discounts offer karte hain?",
        answer:
          "Haan, humara loyalty program hai jisme aapka 10th haircut free hota hai. Hum military personnel, first responders, seniors, aur students (valid ID ke saath) ke liye discounts bhi dete hain.",
        tag: "Support",
      },
      {
        question: "Aap kaun se hair products use aur sell karte hain?",
        answer:
          "Hum Uppercut Deluxe, Layrite, aur American Crew jaise brands se premium men's grooming products use aur sell karte hain. Hamare barbers aapke hair type aur style ke liye best products recommend kar sakte hain..",
        tag: "Services",
      },
    ],
  },
} as const;

export default function FAQ() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Questions");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filteredFaqs = content.faqs.filter((faq) => {
    const matchesTag = selectedTag === "All Questions" || faq.tag === selectedTag;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="relative min-h-screen overflow-hidden py-28 w-full">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="w-full relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />
        {/* Search Bar */}
        <div className="flex justify-center mb-6 px-4 sm:px-0">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="w-full rounded-full border border-gray-300 dark:border-zinc-700 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-sm text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
            </span>
          </div>
        </div>
        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-4 sm:px-0">
          {content.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all duration-200
                ${selectedTag === tag
                  ? "bg-blue-700 dark:bg-yellow-400 text-white dark:text-black border-blue-700 dark:border-yellow-400"
                  : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-zinc-700 hover:bg-blue-300/70 dark:hover:bg-yellow-400/50"}
              `}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* FAQ List */}
        <div className="flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3 mx-auto px-4 sm:px-6 md:px-8">
          {filteredFaqs.length === 0 && (
            <div className="text-center text-gray-400 dark:text-gray-500">No questions found.</div>
          )}
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 transition-all duration-300 overflow-hidden"
            >
              <button
                className={`w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-base transition-colors duration-200
                  hover:text-blue-700 dark:hover:text-yellow-400
                  ${openIdx === idx ? "text-blue-700 dark:text-yellow-400" : "text-gray-900 dark:text-white"}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 ml-2 transition-transform duration-300 ${openIdx === idx ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-4 pt-1 text-gray-600 dark:text-gray-300 text-sm border-t border-gray-100 dark:border-zinc-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 