import React from "react";

const reviews = [
  {
    name: { en: "John Doe", es: "Juan Pérez" },
    comment: {
      en: "The ceviche was the best I've ever had! Highly recommend.",
      es: "¡El ceviche fue el mejor que he probado! Lo recomiendo mucho.",
    },
    rating: 5,
  },
  {
    name: { en: "Jane Smith", es: "Juana Martínez" },
    comment: {
      en: "Amazing atmosphere and delicious food. Will be back!",
      es: "¡Increíble ambiente y comida deliciosa. Volveré!",
    },
    rating: 4,
  },
  {
    name: { en: "Carlos Ruiz", es: "Carlos Ruiz" },
    comment: {
      en: "A true taste of Peru! Loved every dish.",
      es: "¡Un verdadero sabor de Perú! Me encantó cada plato.",
    },
    rating: 5,
  },
];

const CustomerReviews = ({ language }) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          {language === "en" ? "Customer Reviews" : "Opiniones de Clientes"}
        </h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-primary">
                {review.name[language]}
              </h3>
              <p className="text-gray-600">{review.comment[language]}</p>
              <p className="text-yellow-500">Rating: {review.rating} ★</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
