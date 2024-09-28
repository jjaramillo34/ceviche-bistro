import React, { useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  FileText,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

gsap.registerPlugin(ScrollTrigger);

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

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

const PDFMenuViewer = ({ language, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#004AAE]">
            {language === "en" ? "Full Menu" : "Menú Completo"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#004AAE] hover:text-[#DDC36B]"
          >
            <X size={24} />
          </button>
        </div>
        <Document
          file="/img/menu.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          error={
            <div className="text-red-500">
              {language === "en"
                ? "Failed to load PDF. Please try again later."
                : "No se pudo cargar el PDF. Por favor, inténtelo de nuevo más tarde."}
            </div>
          }
          loading={
            <div className="text-[#004AAE]">
              {language === "en" ? "Loading PDF..." : "Cargando PDF..."}
            </div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-4"
            />
          ))}
        </Document>
        <p className="text-center mt-4">
          {language === "en"
            ? `Page ${pageNumber} of ${numPages}`
            : `Página ${pageNumber} de ${numPages}`}
        </p>
      </div>
    </div>
  );
};

const Gallery = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(images.slice(0, 9));
  const [filter, setFilter] = useState("all");
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  const loadMore = () => {
    setVisibleImages(images.slice(0, visibleImages.length + 9));
  };

  const filterImages = (category) => {
    setFilter(category);
    if (category === "all") {
      setVisibleImages(images.slice(0, 9));
    } else {
      setVisibleImages(
        images.filter((img) => img.category === category).slice(0, 9)
      );
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === visibleImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [visibleImages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? visibleImages.length - 1 : prevIndex - 1
    );
  }, [visibleImages]);

  useEffect(() => {
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
  }, [visibleImages]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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

        <div className="flex justify-center mb-8">
          <button
            onClick={() => filterImages("all")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "all"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE]"
            }`}
          >
            {language === "en" ? "All" : "Todos"}
          </button>
          <button
            onClick={() => filterImages("food")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "food"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE]"
            }`}
          >
            {language === "en" ? "Food" : "Comida"}
          </button>
          <button
            onClick={() => filterImages("event")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "event"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE]"
            }`}
          >
            {language === "en" ? "Events" : "Eventos"}
          </button>
          <button
            onClick={() => filterImages("people")}
            className={`mx-2 px-4 py-2 rounded ${
              filter === "people"
                ? "bg-[#004AAE] text-white"
                : "bg-white text-[#004AAE]"
            }`}
          >
            {language === "en" ? "People" : "Personas"}
          </button>
        </div>

        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {visibleImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
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
                    <MessageCircle size={16} className="mr-1 text-blue-500" />{" "}
                    {image.comments}
                  </span>
                  <span className="flex items-center">
                    <Share2 size={16} className="mr-1 text-green-500" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          {visibleImages.length < images.length && (
            <button
              onClick={loadMore}
              className="bg-[#004AAE] text-white px-6 py-2 rounded-full hover:bg-[#003388] transition-colors duration-300"
            >
              {language === "en" ? "Load More" : "Cargar Más"}
            </button>
          )}
          <button
            onClick={() => setIsPDFOpen(true)}
            className="bg-[#DDC36B] text-[#333333] px-6 py-2 rounded-full hover:bg-[#C4A95D] transition-colors duration-300 flex items-center"
          >
            <FileText size={20} className="mr-2" />
            {language === "en" ? "View Menu PDF" : "Ver Menú PDF"}
          </button>
        </div>
      </div>
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
      {isPDFOpen && (
        <PDFMenuViewer
          language={language}
          onClose={() => setIsPDFOpen(false)}
        />
      )}
    </section>
  );
};

export default Gallery;
