import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

const eventHashtags = [
  "#CevicheFiesta",
  "#PeruvianNights",
  "#SeafoodSoiree",
  "#LimaFlavors",
  "#OceanToTable",
  "#CulinaryJourney",
  "#TasteOfPeru",
  "#FoodTruckFun",
  "#FreshCatch",
  "#CevicheLove",
  "#StreetFoodDelights",
  "#FusionFeast",
  "#CoastalCuisine",
  "#AndesinNYC",
  "#LatinoFlavors",
  "#FoodieMeetup",
  "#TropicalTastes",
  "#SouthAmericanSpice",
  "#CevicheMasters",
  "#SeafoodCelebration",
  "#PeruvianPop",
  "#FlavorsOfLima",
  "#OceanicDelights",
  "#LatinoStreetFood",
  "#CulinaryAdventure",
  "#FoodieParadise",
  "#TasteTheOcean",
  "#PeruvianPride",
  "#FreshAndZesty",
  "#CevicheCraft",
];

const images = Array.from({ length: 54 }, (_, i) => ({
  src: `/img/image${i + 1}.jpeg`,
  alt: eventHashtags[i % eventHashtags.length],
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
}));

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-lg font-semibold">{image.alt}</p>
          <div className="flex items-center mt-2">
            <Heart size={20} className="mr-1" /> {image.likes}
            <MessageCircle size={20} className="ml-4 mr-1" /> {image.comments}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

const Gallery = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const visibleImages = [
    images[(currentIndex - 1 + images.length) % images.length],
    images[currentIndex],
    images[(currentIndex + 1) % images.length],
  ];

  return (
    <section id="gallery" className="py-20 bg-[#DDC36B] opacity-80">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-6 text-white">
          {language === "en" ? "Event Highlights" : "Momentos Destacados"}
        </h2>
        <p className="text-xl text-center mb-12 text-white">
          {language === "en"
            ? "Explore the vibrant moments from our culinary events and social gatherings"
            : "Explora los momentos vibrantes de nuestros eventos culinarios y reuniones sociales"}
        </p>
        <div className="relative">
          <div className="flex justify-center items-center">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`w-1/3 px-2 transition-all duration-300 ${
                  index === 1 ? "scale-110 z-10" : "scale-90 opacity-60"
                }`}
              >
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setModalImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-[#004AAE] text-center font-semibold text-lg mb-2">
                      {image.alt}
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                      <span className="flex items-center">
                        <Heart size={16} className="mr-1 text-red-500" />{" "}
                        {image.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle
                          size={16}
                          className="mr-1 text-blue-500"
                        />{" "}
                        {image.comments}
                      </span>
                      <span className="flex items-center">
                        <Share2 size={16} className="mr-1 text-green-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-r-full focus:outline-none hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronLeft size={40} className="text-[#DDC36B]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-l-full focus:outline-none hover:bg-opacity-75 transition-all duration-300"
          >
            <ChevronRight size={40} className="text-[#DDC36B]" />
          </button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() =>
                setCurrentIndex(
                  (currentIndex + dot - 1 + images.length) % images.length
                )
              }
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-[#DDC36B]" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </section>
  );
};

export default Gallery;
