"use client"

import { useState } from "react"
import { Instagram, Facebook, MapPin, Phone, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const contentMap = {
  en: {
    slogan: "Classic cuts with modern style",
    quickLinks: "Quick Links",
    contact: "Contact Us",
    newsletter: "Newsletter",
    newsletterDesc: "Subscribe to our newsletter to receive updates and news.",
    subscribe: "Subscribe",
    placeholder: "Your email",
    address: "518 Acme St unit 101, Denton, TX 76205, United States",
    phone: "+19408081569",
    copyright: "© 2023 PMC Barbershop. All rights reserved.",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact", href: "#contact" },
    ],
    bottomLinks: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
    ],
  },
  hi: {
    slogan: "Classic cuts, modern style ke saath",
    quickLinks: "Quick Links",
    contact: "Contact Karein",
    newsletter: "Newsletter",
    newsletterDesc: "Updates aur news paane ke liye hamare newsletter ko subscribe karein.",
    subscribe: "Subscribe Karein",
    placeholder: "Aapka email",
    address: "518 Acme St unit 101, Denton, TX 76205, United States",
    phone: "+19408081569",
    copyright: "© 2023 PMC Barbershop. Sabhi adhikar surakshit.",
    links: [
      { label: "Home", href: "#home" },
      { label: "Hamare Bare Mein", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact Karein", href: "#contact" },
    ],
    bottomLinks: [
      { label: "Home", href: "#home" },
      { label: "Hamare Bare Mein", href: "#about" },
      { label: "Services", href: "#services" },
    ],
  },
} as const;

export default function Footer() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const [email, setEmail] = useState("")

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="w-full bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 md:px-8 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and social */}
          <div className="flex flex-col">
            <div className="mb-4">
              <img src="/logo.webp" alt="Company Logo" className="h-10" />
              <p className="mt-2 text-sm text-gray-400">{content.slogan}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 bg-blue-200 dark:bg-yellow-100 hover:bg-blue-600 dark:hover:bg-yellow-500"
                aria-label="Instagram"
              >
                <Instagram
                  className="h-5 w-5 transition-colors text-black dark:hover:text-amber-300 hover:text-blue-300"
                />
              </button>

              <button
                className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 bg-blue-200 dark:bg-yellow-100 hover:bg-blue-600 dark:hover:bg-yellow-500"
                aria-label="Facebook"
              >
                <Facebook
                  className="h-5 w-5 transition-colors text-black dark:hover:text-amber-300 hover:text-blue-300"
                />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{content.quickLinks}</h3>
            <ul className="space-y-2">
              {content.links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:underline cursor-pointer transition-colors dark:hover:text-amber-300 hover:text-blue-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{content.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{content.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{content.phone}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">{content.newsletter}</h3>
            <p className="text-gray-400 mb-4">{content.newsletterDesc}</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={content.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
              <Button
                className="w-full transition-colors dark:bg-amber-500 dark:hover:bg-amber-400 bg-blue-700 hover:bg-blue-600"
              >
                {content.subscribe}
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">{content.copyright}</p>

          <div className="flex gap-6">
            {content.bottomLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-500 text-sm hover:underline cursor-pointer transition-colors hover:text-amber-300 dark:hover:text-blue-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
