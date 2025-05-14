"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, Globe, Sun, Moon, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "./ui/separator"
import { useLanguage } from "@/context/LanguageContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark1" | "dark2">("light");
  const { language, setLanguage } = useLanguage();

  const navLabels = {
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      gallery: "Gallery",
      contact: "Contact",
      book: "Book an Appointment"
    },
    hi: {
      home: "Home",
      about: "Hamare Bare Mein",
      services: "Services",
      gallery: "Gallery",
      contact: "Contact Karein",
      book: "Appointment Book Karein"
    }
  } as const;
  const labels = navLabels[language as keyof typeof navLabels];

  const themeContent = {
    en: {
      light: "Light Theme",
      dark1: "Dark Theme 1",
      dark2: "Dark Theme 2"
    },
    hi: {
      light: "Light Theme",
      dark1: "Dark Theme 1",
      dark2: "Dark Theme 2"
    }
  } as const;
  const themeLabels = themeContent[language as keyof typeof themeContent];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark1" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark1");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("dark2");
    } else if (storedTheme === "dark2") {
      setTheme("dark2");
      document.documentElement.classList.add("dark2");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("dark2");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark1");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("dark2");
      localStorage.setItem("theme", "dark1");
    } else if (theme === "dark1") {
      setTheme("dark2");
      document.documentElement.classList.add("dark2");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "dark2");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("dark2");
      localStorage.setItem("theme", "light");
    }
  }
  
  

  return (
    <header className="sticky top-0 z-50 w-full bg-white  dark:bg-black dark:text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <img
          src="/logo.webp"
          alt="Company Logo"
          className="h-12 w-auto"
        />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6 lg:gap-10">
          <a href="#home" className="text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-yellow-500">
            {labels.home}
          </a>
          <a href="#about" className="text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-yellow-500">
            {labels.about}
          </a>
          <a href="#services" className="text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-yellow-500">
            {labels.services}
          </a>
          <a href="#gallery" className="text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-yellow-500">
            {labels.gallery}
          </a>
          <a href="#contact" className="text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-yellow-500">
            {labels.contact}
          </a>
        </nav>

        {/* Right Side Items */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle Button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden dark:text-yellow-400 md:flex" aria-label={themeLabels[theme]}>
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark1" && <Moon className="h-5 w-5" />}
            {theme === "dark2" && <Star className="h-5 w-5" />}
            <span className="sr-only">{themeLabels[theme]}</span>
          </Button>
          {/* Globe Language Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden dark:text-white md:flex"
            aria-label="Toggle language"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Language</span>
          </Button>
          {/* Phone Number - Hidden on smaller screens */}
          <Link
            href="tel:+19408081569"
            className="hidden items-center gap-1 text-sm font-medium  dark:text-white transition-colors hover:text-blue-500 dark:hover:text-yellow-500 lg:flex"
          >
            <Phone className="h-4 w-4 text-blue-500 dark:text-yellow-500" />
            <span>+19408081569</span>
          </Link>

          {/* Book Appointment Button */}
          <Button className="hidden bg-blue-500 text-white hover:bg-blue-600 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600 sm:inline-flex">
            {labels.book}
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className=" dark:text-white md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-black dark:text-white px-6 pb-6">
              <SheetTitle>
                <span className="sr-only">Main Menu</span>
              </SheetTitle>
              {/* Logo at the top */}
              <div className="flex flex-col h-full justify-between">
                <div>
                <Link href="/" className="flex items-center">
                    <img
                    src="/logo.webp"
                    alt="Company Logo"
                    className="h-12 w-auto"
                    />
                    </Link>
                  <Separator/>
                  <div className="border-b border-white/10 mt-6">
                    <span className={`${theme == "dark1" ? "text-yellow-400" : theme == "dark2" ? "text-yellow-300" : "text-blue-500"} font-semibold text-lg`}>Menu</span>
                  </div>
                  <nav className="flex flex-col gap-6 pt-0">
                    <a
                      href="#home"
                      className="py-2 text-lg px-2 rounded hover:bg-white/10 transition-colors dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {labels.home}
                    </a>
                    <a
                      href="#about"
                      className="py-2 text-lg px-2 rounded hover:bg-white/10 transition-colors dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {labels.about}
                    </a>
                    <a
                      href="#services"
                      className="py-2 text-lg px-2 rounded hover:bg-white/10 transition-colors dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {labels.services}
                    </a>
                    <a
                      href="#gallery"
                      className="py-2 text-lg px-2 rounded hover:bg-white/10 transition-colors dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {labels.gallery}
                    </a>
                    <a
                      href="#contact"
                      className="py-2 text-lg px-2 rounded hover:bg-white/10 transition-colors dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {labels.contact}
                    </a>
                  </nav>
                </div>
                <div className="mt-8 border-t border-white/10 pt-4 flex flex-col gap-4">
                  <div className="flex items-center gap-2 bg-white/10 dark:bg-white/10 rounded px-3 py-2">
                    <Phone className={`h-5 w-5 ${theme == "dark1" ? "text-yellow-400" : theme == "dark2" ? "text-yellow-300" : "text-blue-500"}`} />
                    <span className="font-medium">+19408081569</span>
                  </div>
                  <div className="flex items-center gap-4 justify-between bg-white/10 dark:bg-white/10 rounded px-3 py-2">
                    <span className="text-sm dark:text-white/70">Preferences</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={toggleTheme} className={`${theme == "dark1" ? "text-yellow-400" : theme == "dark2" ? "text-yellow-300" : "text-blue-500"}`} aria-label={themeLabels[theme]}>
                        {theme === "light" && <Sun className="h-5 w-5" />}
                        {theme === "dark1" && <Moon className="h-5 w-5" />}
                        {theme === "dark2" && <Star className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className={`${theme == "dark1" ? "text-white" : theme == "dark2" ? "text-yellow-300" : "text-blue-500"}`}>
                        <Globe className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <Button className={`w-full ${theme == "dark1" ? "bg-yellow-400 text-black font-bold hover:bg-yellow-500" : theme == "dark2" ? "bg-yellow-300 text-black font-bold hover:bg-yellow-400" : "bg-blue-700 text-white font-bold hover:bg-blue-500"} mt-2`}>
                    {labels.book}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
