import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "catering", label: "Catering" },
  { id: "menu", label: "Menu" },
  { id: "stats", label: "Stats" },
  { id: "contact", label: "Contact" },
  { id: "gallery", label: "Gallery" },
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (
          section &&
          section.offsetTop - windowHeight / 2 < currentScrollPos
        ) {
          setActiveSection(sections[i].id);
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
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-start space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="group relative">
            <div
              className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-300 ease-in-out
                ${
                  activeSection === section.id
                    ? "bg-[#FFD700] scale-125"
                    : "bg-gray-300 hover:bg-[#FFD700] hover:scale-110"
                }`}
              onClick={() => scrollToSection(section.id)}
            />
            <span className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-[#FFD700] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {section.label}
            </span>
            {activeSection === section.id && (
              <ChevronRight
                size={24}
                className="text-[#FFD700] absolute -right-6 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollNavigation;
