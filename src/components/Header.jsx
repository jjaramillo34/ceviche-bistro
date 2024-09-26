import React from "react";
import { FaFlag } from "react-icons/fa";

const Header = ({ language, toggleLanguage }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <a href="#" className="text-2xl font-bold text-[#004AAE]">
            CevicheBistro
          </a>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <a
                href="#about"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
              >
                {language === "en" ? "About" : "Sobre Nosotros"}
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
              >
                {language === "en" ? "Menu" : "Menú"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-[#333333] hover:text-[#0066CC] transition duration-300"
              >
                {language === "en" ? "Contact" : "Contacto"}
              </a>
            </li>
            <li>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 bg-[#DDC36B] text-white px-3 py-2 rounded-full hover:bg-[#0066CC] transition duration-300"
              >
                <FaFlag className="text-white" />
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
