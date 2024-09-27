import React, { useState, useEffect } from "react";
import Slider from "react-slick";
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

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 rounded-r-full focus:outline-none"
      onClick={onClick}
    >
      <ChevronLeft size={40} className="text-[#DDC36B]" />
    </button>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 rounded-l-full focus:outline-none"
      onClick={onClick}
    >
      <ChevronRight size={40} className="text-[#DDC36B]" />
    </button>
  );
};

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
  const [imageOrientations, setImageOrientations] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const orientations = await Promise.all(
        images.map(
          (image) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                resolve(img.width > img.height ? "landscape" : "portrait");
              };
              img.src = image.src;
            })
        )
      );
      setImageOrientations(orientations);
    };

    loadImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
    <section
      id="gallery"
      className="py-20 bg-gradient-to-r from-[#F5F5F5] to-[#E0E0E0]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-6 text-[#004AAE]">
          {language === "en" ? "Event Highlights" : "Momentos Destacados"}
        </h2>
        <p className="text-xl text-center mb-12 text-[#333333]">
          {language === "en"
            ? "Explore the vibrant moments from our culinary events and social gatherings"
            : "Explora los momentos vibrantes de nuestros eventos culinarios y reuniones sociales"}
        </p>
        <div className="gallery-slider">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => setModalImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${
                      imageOrientations[index] === "landscape"
                        ? "h-64 object-cover"
                        : "h-96 object-cover"
                    }`}
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
          </Slider>
        </div>
      </div>
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </section>
  );
};

export default Gallery;
