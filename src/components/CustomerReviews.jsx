import React from "react";

const reviews = [
  {
    name: "John Doe",
    comment: "The ceviche was the best I've ever had! Highly recommend.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    comment: "Amazing atmosphere and delicious food. Will be back!",
    rating: 4,
  },
  {
    name: "Carlos Ruiz",
    comment: "A true taste of Peru! Loved every dish.",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          Customer Reviews
        </h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-primary">{review.name}</h3>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500">Rating: {review.rating} ★</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
