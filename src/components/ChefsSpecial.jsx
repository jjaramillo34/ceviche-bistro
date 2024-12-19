import React from "react";

const chefsSpecial = {
  name: { en: "Causa Rellena", es: "Causa Rellena" },
  description: {
    en: "A delicious Peruvian dish made with yellow potatoes and filled with chicken salad.",
    es: "Un delicioso plato peruano hecho con papas amarillas y relleno de ensalada de pollo.",
  },
  image: "/img/causa.jpg",
};

const ChefsSpecial = ({ language }) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">
          {language === "en" ? "Chef's Special" : "Especial del Chef"}
        </h2>
        <img
          src={chefsSpecial.image}
          alt={chefsSpecial.name[language]}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-semibold text-primary">
          {chefsSpecial.name[language]}
        </h3>
        <p className="text-gray-600">{chefsSpecial.description[language]}</p>
      </div>
    </section>
  );
};

export default ChefsSpecial;
