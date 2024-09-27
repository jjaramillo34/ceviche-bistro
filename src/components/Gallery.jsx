import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const foodThemes = [
  "Ceviche Fiesta",
  "Seafood Symphony",
  "Zesty Lime Delight",
  "Ocean's Bounty",
  "Peruvian Palette",
  "Cilantro Dreams",
  "Mango Tango Ceviche",
  "Spicy Shrimp Sensation",
  "Tropical Fish Medley",
  "Avocado Abundance",
  "Crunchy Corn Companion",
  "Citrus Splash",
  "Red Onion Rhapsody",
  "Tuna Tartare Temptation",
  "Octopus Odyssey",
  "Tiradito Triumph",
  "Leche de Tigre Elixir",
  "Ceviche Mixto Madness",
  "Aji Amarillo Adventure",
  "Rocoto Pepper Punch",
  "Choclo Charm",
  "Cancha Crunch",
  "Yuca Yumminess",
  "Plantain Paradise",
  "Pisco Sour Pairing",
  "Chicha Morada Magic",
  "Inca Kola Inspiration",
  "Ceviche by the Sea",
  "Lima Nights",
];

const images = Array.from({ length: 29 }, (_, i) => ({
  src: `/img/image${i + 1}.jpeg`,
  alt: foodThemes[i] || `Ceviche Bistro Experience ${i + 1}`,
}));

const PrevArrow = ({ className, onClick }) => {
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 before:content-none`}
      onClick={onClick}
    >
      <ChevronLeft size={24} className="text-[#004AAE]" />
    </div>
  );
};

const NextArrow = ({ className, onClick }) => {
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 before:content-none`}
      onClick={onClick}
    >
      <ChevronRight size={24} className="text-[#004AAE]" />
    </div>
  );
};

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
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
    <section id="gallery" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
          {language === "en"
            ? "Our Culinary Journey"
            : "Nuestro Viaje Culinario"}
        </h2>
        <div className="gallery-slider">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setModalImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full ${
                      imageOrientations[index] === "landscape"
                        ? "h-64 object-cover"
                        : "h-96 object-contain"
                    }`}
                  />
                  <div className="p-4">
                    <p className="text-[#333333] text-center font-semibold">
                      {image.alt}
                    </p>
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
