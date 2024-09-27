import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import heroVideo from "/img/video.mp4";
import heroImage from "/img/hero-image1.jpg";
import PDFMenuViewer from "./PDFMenuViewer"; // Make sure to create this component

gsap.registerPlugin(TextPlugin);

const Hero = ({ language }) => {
  const heroRef = useRef();
  const videoRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(heroRef.current.querySelector(".hero-content"), {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(
          descriptionRef.current,
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.6"
        )
        .from(
          heroRef.current.querySelectorAll(".hero-button"),
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.2 },
          "-=0.6"
        )
        .from(
          heroRef.current.querySelector(".scroll-indicator"),
          { opacity: 0, y: -20, duration: 0.8 },
          "-=0.4"
        );

      // Text animation for title
      gsap.to(titleRef.current, {
        duration: 2,
        text:
          language === "en"
            ? "Welcome to CevicheBistro"
            : "Bienvenidos a CevicheBistro",
        ease: "power1.in",
      });

      // Text animation for description
      gsap.to(descriptionRef.current, {
        duration: 3,
        text:
          language === "en"
            ? "Experience the vibrant flavors of the sea, freshly prepared and served with passion."
            : "Experimenta los vibrantes sabores del mar, preparados frescos y servidos con pasión.",
        ease: "power1.in",
        delay: 1,
      });
    },
    { scope: heroRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 500; // Adjust 500 to control fade speed
      if (videoRef.current) {
        videoRef.current.style.opacity = opacity > 0 ? opacity : 0;
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
      <img
        src={heroImage}
        alt="CevicheBistro"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[#004AAE] bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white hero-content">
        <h1
          ref={titleRef}
          className="text-6xl font-bold mb-6 text-[#DDC36B]"
        ></h1>
        <p
          ref={descriptionRef}
          className="text-2xl mb-10 max-w-2xl mx-auto text-[#F5F5F5]"
        ></p>
        <div className="flex justify-center space-x-4">
          <a
            href="#menu"
            className="hero-button bg-[#DDC36B] text-[#333333] px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block"
          >
            {language === "en" ? "Explore Our Menu" : "Explora Nuestro Menú"}
          </a>
          <button
            onClick={() => setIsPDFOpen(true)}
            className="hero-button bg-white text-[#004AAE] px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#DDC36B] hover:text-[#333333] transition duration-300 inline-block"
          >
            {language === "en" ? "View Full Menu PDF" : "Ver Menú Completo PDF"}
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-[#DDC36B]"
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
  language: PropTypes.string.isRequired,
};

export default Hero;
