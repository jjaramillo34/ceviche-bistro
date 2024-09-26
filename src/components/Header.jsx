import React, { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const Header = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <a href="#" className="text-2xl font-bold text-[#004AAE]">
            CevicheBistro
          </a>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-[#004AAE]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 items-center">
            <li>
              <a
                href="#about"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "About" : "Sobre Nosotros"}
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "Menu" : "Menú"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "Contact" : "Contacto"}
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 bg-[#DDC36B] text-white px-3 py-2 rounded-full hover:bg-[#0066CC] transition duration-300"
              >
                <Globe size={18} />
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
