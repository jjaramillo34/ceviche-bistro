import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  ChevronDown,
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
];

const images = Array.from({ length: 54 }, (_, i) => ({
  src: `/img/image${i + 1}.jpeg`,
  alt: eventHashtags[i % eventHashtags.length],
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
  category: ["food", "event", "people"][Math.floor(Math.random() * 3)],
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
  const [modalImage, setModalImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 12));
  const [filter, setFilter] = useState("all");
  const galleryRef = useRef(null);

  const loadMore = () => {
    setVisibleImages((prevImages) => {
      const nextImages = images.slice(
        prevImages.length,
        prevImages.length + 12
      );
      return [...prevImages, ...nextImages];
    });
  };

  const filterImages = (category) => {
    setFilter(category);
    if (category === "all") {
      setVisibleImages(images.slice(0, 12));
    } else {
      setVisibleImages(
        images.filter((img) => img.category === category).slice(0, 12)
      );
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [visibleImages]);

  return (
    <section
      id="gallery"
      ref={galleryRef}
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

        <div className="flex justify-center mb-8 flex-wrap">
          <button
            onClick={() => filterImages("all")}
            className={`m-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              filter === "all"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE] hover:bg-[#004AAE] hover:text-white"
            }`}
          >
            {language === "en" ? "All" : "Todos"}
          </button>
          <button
            onClick={() => filterImages("food")}
            className={`m-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              filter === "food"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE] hover:bg-[#004AAE] hover:text-white"
            }`}
          >
            {language === "en" ? "Food" : "Comida"}
          </button>
          <button
            onClick={() => filterImages("event")}
            className={`m-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              filter === "event"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE] hover:bg-[#004AAE] hover:text-white"
            }`}
          >
            {language === "en" ? "Events" : "Eventos"}
          </button>
          <button
            onClick={() => filterImages("people")}
            className={`m-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              filter === "people"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE] hover:bg-[#004AAE] hover:text-white"
            }`}
          >
            {language === "en" ? "People" : "Personas"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => setModalImage(image)}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-center font-semibold text-lg">
                    {image.alt}
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="flex items-center text-red-500">
                  <Heart size={16} className="mr-1" /> {image.likes}
                </span>
                <span className="flex items-center text-blue-500">
                  <MessageCircle size={16} className="mr-1" /> {image.comments}
                </span>
                <span className="flex items-center text-green-500">
                  <Share2 size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {visibleImages.length < images.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-[#004AAE] text-white px-6 py-3 rounded-full hover:bg-[#003388] transition-colors duration-300 flex items-center mx-auto"
            >
              {language === "en" ? "Load More" : "Cargar Más"}
              <ChevronDown size={20} className="ml-2" />
            </button>
          </div>
        )}
      </div>
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </section>
  );
};

export default Gallery;
