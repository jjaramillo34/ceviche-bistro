import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

gsap.registerPlugin(ScrollTrigger);

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const menuItems = [
  {
    name: { en: "Ceviche", es: "Ceviche" },
    description: {
      en: "Fresh fish marinated in tiger's milk, with onions, cilantro, seafood, and chili.",
      es: "Pescado fresco marinado en leche de tigre, con cebollas, cilantro, mariscos y ají.",
    },
    options: [
      { en: "Fish Ceviche", es: "Ceviche de Pescado" },
      { en: "Mixed Ceviche", es: "Ceviche Mixto" },
      { en: "Shrimp Ceviche", es: "Ceviche de Camarones" },
    ],
    image: "/path/to/ceviche.jpg",
  },
  {
    name: { en: "Goat Stew with Beans", es: "Seco de Cabrito con Frejoles" },
    description: {
      en: "White rice, goat stew, canary beans, Creole salsa.",
      es: "Arroz blanco, seco de cabrito, frejoles canarios, sarza criolla.",
    },
    image: "/path/to/seco-cabrito.jpg",
  },
  {
    name: { en: "Duck with Rice", es: "Arroz con Pato" },
    description: {
      en: "Northern style duck with rice, huancaina potatoes, Creole salsa.",
      es: "Arroz con pato estilo norteño, papa a la huancaína, sarza criolla.",
    },
    image: "/path/to/arroz-pato.jpg",
  },
  {
    name: { en: "Seafood Rice", es: "Arroz con Mariscos" },
    description: {
      en: "Rice with seafood sauce.",
      es: "Arroz con salsa de mariscos.",
    },
    image: "/img/menu1.png",
  },
  {
    name: { en: "Chaufa Rice", es: "Arroz Chaufa" },
    description: {
      en: "Peruvian-style fried rice.",
      es: "Arroz frito estilo peruano.",
    },
    options: [
      { en: "Chicken Chaufa", es: "Chaufa de Pollo" },
      { en: "Beef Chaufa", es: "Chaufa de Carne" },
      { en: "Shrimp Chaufa", es: "Chaufa de Camarón" },
      { en: "Mixed Chaufa", es: "Chaufa Mixto" },
    ],
    image: "/img/menu2.png",
  },
  {
    name: { en: "Lomo Saltado", es: "Lomo Saltado" },
    description: {
      en: "Beef stir-fry with onions, tomatoes, cilantro, soy sauce, and french fries.",
      es: "Carne de res salteada con cebolla, tomate, cilantro, salsa de soya y papas fritas.",
    },
    image: "/img/menu4.png",
  },
  {
    name: { en: "Cylinder-Roasted Pork", es: "Chancho al Cilindro" },
    description: {
      en: "Marinated pork belly cooked over charcoal.",
      es: "Panceta de cerdo marinada y cocinada al carbón.",
    },
    image: "/path/to/chancho-cilindro.jpg",
  },
  {
    name: { en: "Quinoa Chaufa", es: "Arroz Chaufa de Quinoa" },
    description: {
      en: "Mixed vegetables, white and red quinoa in marinated chaufa style.",
      es: "Mix de vegetales, mix de quinoa blanca y roja en chaufa marinada.",
    },
    image: "/path/to/chaufa-quinoa.jpg",
  },
  {
    name: { en: "Aji de Gallina", es: "Ají de Gallina" },
    description: {
      en: "Chicken breast, yellow chili, white rice, boiled potatoes, egg.",
      es: "Pecho de pollo, ají amarillo, arroz blanco, papas sancochadas, huevo.",
    },
    image: "/path/to/aji-gallina.jpg",
  },
];

const MenuItem = ({ item, language }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={cardRef} className="px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 h-full flex flex-col">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name[language]}
            className="w-full h-48 object-cover"
          />
          {item.options && (
            <div className="absolute top-0 right-0 bg-black bg-opacity-70 p-2 rounded-bl-lg">
              <h4 className="font-semibold text-[#DDC36B] mb-1 text-sm">
                {language === "en" ? "Options:" : "Opciones:"}
              </h4>
              <ul className="text-[#DDC36B] text-xs">
                {item.options.map((option, index) => (
                  <li key={index}>{option[language]}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#004AAE]">
              {item.name[language]}
            </h3>
            <p className="text-[#333333]">{item.description[language]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
    aria-label="Next"
  >
    <ChevronRight size={40} className="text-[#DDC36B]" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
    aria-label="Previous"
  >
    <ChevronLeft size={40} className="text-[#DDC36B]" />
  </button>
);

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

const Menu = ({ language }) => {
  const titleRef = useRef(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      id="menu"
      className="py-24 bg-gradient-to-r from-[#E6F7FF] via-[#F0F8FF] to-[#E6F7FF]"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-center mb-16 text-[#004AAE] relative"
        >
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#DDC36B]"></span>
        </h2>
        <div className="relative px-12">
          <Slider {...settings} className="menu-slider">
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} language={language} />
            ))}
          </Slider>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setIsPDFOpen(true)}
            className="bg-[#DDC36B] text-[#333333] px-6 py-3 rounded-full text-xl font-semibold hover:bg-[#C4A95D] transition-colors duration-300 flex items-center mx-auto"
          >
            <FileText size={24} className="mr-2" />
            {language === "en" ? "View Full Menu PDF" : "Ver Menú Completo PDF"}
          </button>
        </div>
      </div>
      {isPDFOpen && (
        <PDFMenuViewer
          language={language}
          onClose={() => setIsPDFOpen(false)}
        />
      )}
    </section>
  );
};

export default Menu;
