import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Menu,
  X,
  Globe,
  Home,
  UtensilsCrossed,
  Cake,
  Image,
  Phone,
  BarChart,
  MessageCircleHeartIcon,
} from "lucide-react";

const Header = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", enText: "About", esText: "Acerca", icon: Home },
    { href: "#catering", enText: "Catering", esText: "Catering", icon: Cake },
    { href: "#menu", enText: "Menu", esText: "Menú", icon: UtensilsCrossed },
    {
      href: "#testimonials",
      enText: "Testimonials",
      esText: "Testimonios",
      icon: MessageCircleHeartIcon,
    },
    { href: "#contact", enText: "Contact", esText: "Contacto", icon: Phone },
    { href: "#stats", enText: "Stats", esText: "Stats", icon: BarChart },
    { href: "#gallery", enText: "Gallery", esText: "Galería", icon: Image },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="logo z-20">
            <a
              href="#"
              className={`text-2xl font-bold ${
                isScrolled ? "text-primary" : "text-white"
              } transition-colors duration-300`}
            >
              CevicheBistro
            </a>
          </div>
          <div className="lg:hidden z-20">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? "text-primary hover:bg-accent"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav
            className={`
            ${isMenuOpen ? "fixed inset-0 bg-white bg-opacity-95" : "hidden"}
            lg:static lg:flex lg:bg-transparent
          `}
          >
            <ul
              className={`
              flex flex-col lg:flex-row items-center justify-center
              h-full lg:h-auto space-y-4 lg:space-y-0 lg:space-x-6
              ${isMenuOpen ? "pt-20" : ""}
            `}
            >
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-full transition duration-300 ${
                      isScrolled
                        ? "text-text hover:text-primary hover:bg-accent"
                        : "text-white hover:bg-white/20"
                    }`}
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition duration-300 ${
                    isScrolled
                      ? "bg-accent text-primary hover:bg-primary hover:text-white"
                      : "bg-white/20 text-white hover:bg-white hover:text-primary"
                  }`}
                >
                  <Globe size={18} />
                  <span>{language === "en" ? "ES" : "EN"}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </header>
  );
};

Header.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};

export default Header;
