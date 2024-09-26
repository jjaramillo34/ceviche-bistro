import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Menu = ({ language }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <section id="menu" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
        </h2>
        <Slider {...settings} className="menu-slider">
          {menuItems.map((item, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Menu;
