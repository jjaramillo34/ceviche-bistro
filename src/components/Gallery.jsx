import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  "#PeruvianFusion",
  "#CevicheLovers",
  "#LimaStreetFood",
  "#AndesExperience",
  "#PacificFlavors",
  "#LatinCuisine",
  "#CevicheMania",
  "#PeruvianDelights",
  "#OceanFresh",
  "#LimaNights",
  "#TasteOfTheAndes",
  "#SeafoodFiesta",
  "#CulinaryPeru",
  "#FoodieHeaven",
  "#CevicheTime",
  "#PeruvianTradition",
  "#CoastalEats",
  "#AndesCuisine",
  "#LimaEats",
  "#CevicheParty",
  "#PeruvianSpice",
  "#OceanHarvest",
];

const images = Array.from({ length: 54 }, (_, i) => ({
  src: `/img/image${i + 1}.jpeg`,
  alt: eventHashtags[i],
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
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sliderRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + images.length) % images.length;
      visibleImages.push({ ...images[index], offset: i });
    }
    return visibleImages;
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-[#DDC36B] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-6 text-white">
          {language === "en" ? "Event Highlights" : "Momentos Destacados"}
        </h2>
        <p className="text-xl text-center mb-12 text-white">
          {language === "en"
            ? "Explore the vibrant moments from our culinary events and social gatherings"
            : "Explora los momentos vibrantes de nuestros eventos culinarios y reuniones sociales"}
        </p>

        <div
          ref={sliderRef}
          className="relative w-full h-[600px] overflow-hidden rounded-lg"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-1/3 flex-shrink-0 p-2 transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? "scale-105 z-10"
                    : "scale-95 opacity-70"
                }`}
                onClick={() => setModalImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent ${
                    index === currentIndex ? "text-[#DDC36B]" : "text-white"
                  }`}
                >
                  <p className="text-center font-semibold text-lg mb-2">
                    {image.alt}
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <span className="flex items-center text-red-500">
                      <Heart size={16} className="mr-1" /> {image.likes}
                    </span>
                    <span className="flex items-center text-blue-600">
                      <MessageCircle size={16} className="mr-1" />{" "}
                      {image.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
          >
            <ChevronLeft size={24} className="text-[#004AAE]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
          >
            <ChevronRight size={24} className="text-[#004AAE]" />
          </button>
        </div>

        <div className="flex justify-center mt-4 overflow-x-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 flex-shrink-0 ${
                index === currentIndex ? "bg-[#004AAE]" : "bg-gray-300"
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
