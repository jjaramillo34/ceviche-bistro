import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    name: { en: "Classic Ceviche", es: "Ceviche Clásico" },
    description: {
      en: "Fresh white fish marinated in lime juice, mixed with red onions, cilantro, and a touch of chili.",
      es: "Pescado blanco fresco marinado en jugo de limón, mezclado con cebollas rojas, cilantro y un toque de chile.",
    },
    price: 12.99,
    image: "/path/to/classic-ceviche.jpg", // Add actual image paths
  },
  {
    name: { en: "Shrimp Aguachile", es: "Aguachile de Camarón" },
    description: {
      en: "Tender shrimp in a spicy lime and cucumber sauce, topped with red onions and avocado.",
      es: "Camarones tiernos en una salsa picante de limón y pepino, cubiertos con cebollas rojas y aguacate.",
    },
    price: 14.99,
    image: "/path/to/shrimp-aguachile.jpg",
  },
  {
    name: { en: "Octopus Ceviche", es: "Ceviche de Pulpo" },
    description: {
      en: "Tender octopus chunks marinated in a zesty citrus blend, mixed with bell peppers and olives.",
      es: "Trozos de pulpo tierno marinados en una mezcla cítrica, mezclados con pimientos y aceitunas.",
    },
    price: 16.99,
    image: "/path/to/octopus-ceviche.jpg",
  },
  // Add more menu items as needed
];

const MenuItem = ({ item, language }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={cardRef} className="px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <img
          src={item.image}
          alt={item.name[language]}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-[#004AAE]">
            {item.name[language]}
          </h3>
          <p className="text-[#333333] mb-4 h-24 overflow-y-auto">
            {item.description[language]}
          </p>
          <span className="text-[#DDC36B] font-bold text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
    aria-label="Next"
  >
    <ChevronRight size={40} className="text-[#DDC36B]" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
    aria-label="Previous"
  >
    <ChevronLeft size={40} className="text-[#DDC36B]" />
  </button>
);

const Menu = ({ language }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      id="menu"
      className="py-24 bg-gradient-to-r from-[#E6F7FF] via-[#F0F8FF] to-[#E6F7FF]"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-center mb-16 text-[#004AAE] relative"
        >
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#DDC36B]"></span>
        </h2>
        <div className="relative px-12">
          <Slider {...settings} className="menu-slider">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} language={language} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Menu;
