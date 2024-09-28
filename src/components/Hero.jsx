import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import heroImage from "/img/hero-image1.jpg";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFMenuViewer = ({ language, onClose }) => {
  PDFMenuViewer.propTypes = {
    language: PropTypes.oneOf(["en", "es"]).isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#004AAE]">
            {language === "en" ? "Full Menu" : "Menú Completo"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#004AAE] hover:text-[#FFD700]"
          >
            ✕
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

const Hero = ({ language }) => {
  const heroRef = useRef();
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 500;
      const heroImage = heroRef.current.querySelector(".hero-image");
      if (heroImage) {
        heroImage.style.opacity = opacity > 0 ? opacity : 0;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="hero-image absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 bg-[#004AAE] bg-opacity-50"></div>
      <div className="relative z-20 text-center text-white hero-content">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#FFD700]">
          {language === "en"
            ? "Welcome to Ceviche Bistro"
            : "Bienvenidos a Ceviche Bistro"}
        </h1>
        <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto text-[#F5F5F5]">
          {language === "en"
            ? "Experience the vibrant flavors of the sea, freshly prepared and served with passion."
            : "Experimenta los vibrantes sabores del mar, preparados frescos y servidos con pasión."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#menu"
            className="hero-button bg-[#FFD700] text-[#333333] px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-opacity-50"
          >
            {language === "en" ? "Explore Our Menu" : "Explora Nuestro Menú"}
          </a>
          <button
            onClick={() => setIsPDFOpen(true)}
            className="hero-button bg-white text-[#004AAE] px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#FFD700] hover:text-[#333333] transition duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            {language === "en" ? "View Full Menu PDF" : "Ver Menú Completo PDF"}
          </button>
        </div>
      </div>
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator"
        aria-hidden="true"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-[#FFD700]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
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

Hero.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Hero;
