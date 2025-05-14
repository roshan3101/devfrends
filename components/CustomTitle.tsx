import React from "react";

interface SectionTitleProps {
  slug: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  slug,
  title,
  description,
  className = "",
}) => (
  <div className={`text-center mb-12 px-4 sm:px-6 lg:px-8 group ${className}`}>
    <p className="text-blue-800 dark:text-yellow-400 font-medium mb-2 text-sm sm:text-base">
      {slug}
    </p>
    <div className="relative inline-block group">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white cursor-pointer">
        {title}
      </h1>
      <span
        className="block h-1 w-12 mt-2 mx-auto rounded transition-all duration-500 ease-in-out group-hover:w-full
        bg-gradient-to-r from-blue-500 to-green-400 dark:from-yellow-400 dark:to-yellow-400"
      />
    </div>
    {description && (
      <p className="max-w-3xl mx-auto mt-6 sm:mt-8 text-muted-foreground leading-relaxed text-base sm:text-lg">
        {description}
      </p>
    )}
  </div>
);

export default SectionTitle;
