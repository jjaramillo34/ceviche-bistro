import React from "react";
import PropTypes from "prop-types";

const featuredDishes = [
  {
    name: { en: "Ceviche de Pescado", es: "Ceviche de Pescado" },
    description: {
      en: "Fresh fish marinated in lime juice with onions and cilantro.",
      es: "Pescado fresco marinado en jugo de lima con cebollas y cilantro.",
    },
    image: "/img/ceviche.jpg",
  },
  {
    name: { en: "Arroz con Mariscos", es: "Arroz con Mariscos" },
    description: {
      en: "Delicious seafood rice with a mix of fresh seafood.",
      es: "Delicioso arroz con mariscos y una mezcla de mariscos frescos.",
    },
    image: "/img/arroz-con-mariscos.jpg",
  },
  {
    name: { en: "Lomo Saltado", es: "Lomo Saltado" },
    description: {
      en: "Stir-fried beef with onions, tomatoes, and fries.",
      es: "Carne de res salteada con cebollas, tomates y papas fritas.",
    },
    image: "/img/lomo-saltado.jpg",
  },
];

const FeaturedDishes = ({ language }) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          {language === "en" ? "Featured Dishes" : "Platos Destacados"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={dish.image}
                alt={dish.name[language]}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold text-primary mt-4">
                {dish.name[language]}
              </h3>
              <p className="text-gray-600">{dish.description[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturedDishes.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default FeaturedDishes;
