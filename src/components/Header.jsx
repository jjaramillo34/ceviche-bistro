import React, { useState } from "react";
import {
  Menu,
  X,
  Globe,
  Home,
  UtensilsCrossed,
  Cake,
  Image,
  Phone,
} from "lucide-react";

const Header = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "#about", enText: "About", esText: "Sobre Nosotros", icon: Home },
    { href: "#menu", enText: "Menu", esText: "Menú", icon: UtensilsCrossed },
    { href: "#catering", enText: "Catering", esText: "Catering", icon: Cake },
    { href: "#gallery", enText: "Gallery", esText: "Galería", icon: Image },
    { href: "#contact", enText: "Contact", esText: "Contacto", icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo z-20">
          <a href="#" className="text-2xl font-bold text-[#004AAE]">
            CevicheBistro
          </a>
        </div>
        <div className="lg:hidden z-20">
          <button onClick={toggleMenu} className="text-[#004AAE] p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav
          className={`
          ${isMenuOpen ? "fixed inset-0 bg-white bg-opacity-95" : "hidden"}
          lg:static lg:block lg:bg-transparent
        `}
        >
          <ul
            className={`
            flex flex-col lg:flex-row items-center justify-center
            h-full lg:h-auto space-y-6 lg:space-y-0 lg:space-x-6
            ${isMenuOpen ? "pt-20" : ""}
          `}
          >
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center text-[#333333] hover:text-[#0066CC] transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} className="mr-2" />
                  <span>{language === "en" ? item.enText : item.esText}</span>
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 bg-[#FFD700] text-white px-3 py-2 rounded-full hover:bg-[#0066CC] transition duration-300"
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
