"use client"

import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import CustomTitle from "./CustomTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function Location() {

  const {language} = useLanguage();

  const contentMap = {
    en: {
      title: "Our Location",
      description: "Conveniently located in Denton, TX:",
      slug: "Visit Our Shop"
    },
    hi: {
      title: "Hamara Location",
      description: "Denton, TX mein conveniently located:",
      slug: "Hamari Shop Visit Karein"
    }
  }

  const content = contentMap[(language as keyof typeof contentMap)] || contentMap.en;

  return (
    <div className="relative min-h-screen overflow-hidden py-16 px-4 sm:px-6 md:px-12 w-full">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="w-full relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 items-center w-5/6 justify-center mx-auto">
          {/* Map Placeholder */}
          <div className="bg-gray-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center h-[280px] sm:h-[320px] shadow-md">
            <FaMapMarkerAlt className="text-gray-400 dark:text-yellow-400 text-5xl" />
          </div>

          {/* Contact Info Card */}
          <div className="bg-white/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md transition-all duration-300 p-6 sm:p-8 flex flex-col h-full relative overflow-hidden group hover:-translate-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            <hr className="w-12 border-t-2 border-blue-700 dark:border-yellow-400 mb-6" />
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-100/10">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 dark:bg-yellow-400 text-white dark:text-black transition-transform duration-300 hover:scale-110">
                  <FaMapMarkerAlt className="text-lg" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Address</div>
                  <div className="text-muted-foreground text-xs">518 Acme St unit 101, Denton, TX 76205, United States</div>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-yellow-100/10">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 dark:bg-yellow-400 text-white dark:text-black transition-transform duration-300 hover:scale-110">
                  <FaPhoneAlt className="text-lg" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Phone</div>
                  <div className="text-muted-foreground text-xs">+19408081569</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="https://maps.google.com/?q=518 Acme St unit 101, Denton, TX 76205, United States"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm gap-2 px-4 py-2 rounded-lg bg-blue-700 dark:bg-yellow-400 text-white dark:text-black font-semibold shadow hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all duration-300"
              >
                <FaMapMarkerAlt /> Get Directions
              </a>
              <a
                href="tel:+19408081569"
                className="flex items-center justify-center text-sm gap-2 px-4 py-2 rounded-lg border border-blue-700 dark:border-yellow-400 text-blue-700 dark:text-yellow-400 font-semibold hover:bg-green-700/90 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
              >
                <FaPhoneAlt /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
