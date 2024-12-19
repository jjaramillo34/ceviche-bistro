import React from "react";

const chefsSpecial = {
  name: "Causa Rellena",
  description:
    "A delicious Peruvian dish made with yellow potatoes and filled with chicken salad.",
  image: "/img/causa.jpg",
};

const ChefsSpecial = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">Chef's Special</h2>
        <img
          src={chefsSpecial.image}
          alt={chefsSpecial.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-semibold text-primary">
          {chefsSpecial.name}
        </h3>
        <p className="text-gray-600">{chefsSpecial.description}</p>
      </div>
    </section>
  );
};

export default ChefsSpecial;
