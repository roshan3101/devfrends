"use client"

import { useState } from "react";
import CustomTitle from "./CustomTitle";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const contentMap = {
  en: {
    slug: "Book Your Appointment",
    title: "Contact Us",
    description: "Ready for a fresh look? Book your appointment today or contact us for any questions.",
    left: {
      address: "Address",
      phone: "Phone",
      hours: "Business Hours",
    },
    form: {
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      phone: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      service: "Service Interested In",
      servicePlaceholder: "Select an option",
      serviceOptions: [
        { value: "", label: "Select an option" },
        { value: "haircut", label: "Haircut" },
        { value: "beard", label: "Beard Trim" },
        { value: "shave", label: "Shave" },
        { value: "other", label: "Other" },
      ],
      date: "Preferred Date",
      datePlaceholder: "dd-mm-yyyy",
      message: "Message",
      messagePlaceholder: "Tell us about your style preferences or any questions you have",
      submit: "Submit",
    },
  },
  hi: {
    slug: "Apna Appointment Book Karein",
    title: "Contact Karein",
    description: "Fresh look ke liye ready hain? Aaj hi appointment book karein ya kisi bhi sawal ke liye humse contact karein.",
    left: {
      address: "Address",
      phone: "Phone",
      hours: "Business Hours",
    },
    form: {
      name: "Aapka Naam",
      namePlaceholder: "Apna pura naam darj karein",
      phone: "Phone Number",
      phonePlaceholder: "Apna phone number darj karein",
      service: "Kis Service Mein Interest Hai",
      servicePlaceholder: "Select an option",
      serviceOptions: [
        { value: "", label: "Select an option" },
        { value: "haircut", label: "Haircut" },
        { value: "beard", label: "Beard Trim" },
        { value: "shave", label: "Shave" },
        { value: "other", label: "Other" },
      ],
      date: "Pasand Ki Date",
      datePlaceholder: "dd-mm-yyyy",
      message: "Message",
      messagePlaceholder: "Apni style preferences ya koi bhi sawal ke bare mein batayein",
      submit: "Submit",
    },
  },
} as const;

export default function ContactUs() {
  const { language } = useLanguage();
  const content = contentMap[language as keyof typeof contentMap] || contentMap.en;
  const [activeField, setActiveField] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);

  return (
    <div className="relative w-full min-h-screen overflow-hidden py-16" id="contact">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-300 opacity-10 z-0" />
      <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-blue-400 dark:bg-yellow-200 opacity-10 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <CustomTitle
          slug={content.slug}
          title={content.title}
          description={content.description}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
          {/* Left Card - 1/3 width */}
          <div
            className={`bg-white/90 dark:bg-zinc-900/80 rounded-2xl shadow-md border transition-all duration-300 p-8 flex flex-col gap-8 h-full
              ${hoveredCard === "left" ? "border-blue-700 dark:border-yellow-400 -translate-y-2" : "border-gray-200 dark:border-zinc-800"}`}
            onMouseEnter={() => setHoveredCard("left")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <ContactItem
              icon={<FaMapMarkerAlt className="text-lg" />}
              label={content.left.address}
              value="518 Acme St unit 101, Denton, TX 76205, United States"
              isLeftCard={true}
            />
            <ContactItem
              icon={<FaPhoneAlt className="text-lg" />}
              label={content.left.phone}
              value="+19408081569"
              isLeftCard={true}
            />
            <ContactItem
              icon={<FaClock className="text-lg" />}
              label={content.left.hours}
              value={"Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 5:00 PM, Sun: Closed"}
              isLeftCard={true}
            />
          </div>

          {/* Right Card (Form) - 2/3 width */}
          <form
            className={`text-sm bg-white/90 dark:bg-zinc-900/80 rounded-2xl shadow-md border transition-all duration-300 p-8 flex flex-col gap-6 h-full col-span-2
              ${hoveredCard === "right" ? "border-blue-700 dark:border-yellow-400 -translate-y-2" : "border-gray-200 dark:border-zinc-800"}`}
            onMouseEnter={() => setHoveredCard("right")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FormField
              label={content.form.name}
              name="name"
              type="text"
              placeholder={content.form.namePlaceholder}
              activeField={activeField}
              setActiveField={setActiveField}
            />
            <FormField
              label={content.form.phone}
              name="phone"
              type="text"
              placeholder={content.form.phonePlaceholder}
              activeField={activeField}
              setActiveField={setActiveField}
            />
            <div className="transition-all duration-300 hover:-translate-y-1 group">
              <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400">{content.form.service}</label>
              <select
                className={`w-full rounded-md border border-gray-300 dark:border-zinc-700 py-2 px-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-yellow-400 transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400 group-hover:border-blue-700 dark:group-hover:border-yellow-400
                  ${activeField === "service" ? "text-blue-700 dark:text-yellow-400" : ""}`}
                name="service"
                onFocus={() => setActiveField("service")}
                onBlur={() => setActiveField(null)}
              >
                {content.form.serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <FormField
              label={content.form.date}
              name="date"
              type="text"
              placeholder={content.form.datePlaceholder}
              activeField={activeField}
              setActiveField={setActiveField}
            />
            <div className="transition-all duration-300 hover:-translate-y-1 group">
              <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400">{content.form.message}</label>
              <textarea
                className={`w-full rounded-md border border-gray-300 dark:border-zinc-700 py-2 px-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-yellow-400 transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400 group-hover:border-blue-700 dark:group-hover:border-yellow-400
                  ${activeField === "message" ? "text-blue-700 dark:text-yellow-400" : ""}`}
                name="message"
                rows={4}
                placeholder={content.form.messagePlaceholder}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-6 py-2 rounded-lg font-bold bg-blue-700 dark:bg-yellow-400 text-white dark:text-black hover:bg-blue-800 dark:hover:bg-yellow-500 transition-all duration-300 md:w-32 hover:-translate-y-1"
            >
              {content.form.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, isLeftCard }: { icon: React.ReactNode; label: string; value: string; isLeftCard?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer
        hover:bg-gray-200 dark:hover:bg-yellow-100/10
        ${isLeftCard ? "hover:-translate-x-1" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 dark:bg-yellow-400 text-white dark:text-black transition-transform duration-300 ${hovered ? "scale-110" : ""}`}>
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold text-gray-900 dark:text-white">{label}</div>
        <div className="text-muted-foreground text-xs">{value}</div>
      </div>
    </div>
  );
}

function FormField({ label, name, type, placeholder, activeField, setActiveField }: any) {
  return (
    <div className="transition-all duration-300 hover:-translate-y-1 group">
      <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400">{label}</label>
      <input
        className={`w-full rounded-md border border-gray-300 dark:border-zinc-700 py-2 px-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-yellow-400 transition-colors duration-200 group-hover:text-blue-700 dark:group-hover:text-yellow-400 group-hover:border-blue-700 dark:group-hover:border-yellow-400
          ${activeField === name ? "text-blue-700 dark:text-yellow-400" : ""}`}
        name={name}
        type={type}
        placeholder={placeholder}
        onFocus={() => setActiveField(name)}
        onBlur={() => setActiveField(null)}
      />
    </div>
  );
} 