import React from "react";

const menuItems = [
  {
    name: { en: "Classic Ceviche", es: "Ceviche Clásico" },
    description: {
      en: "Fresh white fish marinated in lime juice, mixed with red onions, cilantro, and a touch of chili.",
      es: "Pescado blanco fresco marinado en jugo de limón, mezclado con cebollas rojas, cilantro y un toque de chile.",
    },
    price: 12.99,
  },
  {
    name: { en: "Shrimp Aguachile", es: "Aguachile de Camarón" },
    description: {
      en: "Tender shrimp in a spicy lime and cucumber sauce, topped with red onions and avocado.",
      es: "Camarones tiernos en una salsa picante de limón y pepino, cubiertos con cebollas rojas y aguacate.",
    },
    price: 14.99,
  },
  {
    name: { en: "Octopus Ceviche", es: "Ceviche de Pulpo" },
    description: {
      en: "Tender octopus chunks marinated in a zesty citrus blend, mixed with bell peppers and olives.",
      es: "Trozos de pulpo tierno marinados en una mezcla cítrica, mezclados con pimientos y aceitunas.",
    },
    price: 16.99,
  },
];

const Menu = ({ language }) => {
  return (
    <section id="menu" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">
                {item.name[language]}
              </h3>
              <p className="text-gray-600 mb-4">{item.description[language]}</p>
              <span className="text-ceviche-blue font-bold">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
