import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const sections = [
  "hero",
  "about",
  "catering",
  "menu",
  "stats",
  "contact",
  "gallery",
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (
          section &&
          section.offsetTop - windowHeight / 2 < currentScrollPos
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <div key={section} className="relative">
            <div
              className={`w-3 h-3 rounded-full cursor-pointer ${
                activeSection === section ? "bg-[#DDC36B]" : "bg-gray-300"
              }`}
              onClick={() => scrollToSection(section)}
            />
            {activeSection === section && (
              <ChevronRight
                size={24}
                className="text-[#DDC36B] absolute -right-6 top-1/2 transform -translate-y-1/2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollNavigation;
