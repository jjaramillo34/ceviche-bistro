import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { X } from "lucide-react";

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFMenuViewer = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-accent text-text px-6 py-2 rounded-full hover:bg-primary transition duration-300"
      >
        {language === "en" ? "See Full Menu" : "Ver Menú Completo"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">
                {language === "en" ? "Full Menu" : "Menú Completo"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-accent"
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
                <div className="text-primary">
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
      )}
    </>
  );
};

export default PDFMenuViewer;
