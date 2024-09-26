import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import heroVideo from "../assets/img/video.mp4";

const Hero = ({ language }) => {
  const heroRef = useRef();
  const videoRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(heroRef.current.querySelector(".hero-content"), {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(
          heroRef.current.querySelector("h1"),
          { opacity: 0, y: 30, duration: 0.8 },
          "-=0.5"
        )
        .from(
          heroRef.current.querySelector("p"),
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.6"
        )
        .from(
          heroRef.current.querySelector("a"),
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.6"
        )
        .from(
          heroRef.current.querySelector(".scroll-indicator"),
          { opacity: 0, y: -20, duration: 0.8 },
          "-=0.4"
        );
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
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white hero-content">
        <h1 className="text-6xl font-bold mb-6 text-ceviche-green">
          {language === "en"
            ? "Welcome to CevicheBistro"
            : "Bienvenidos a CevicheBistro"}
        </h1>
        <p className="text-2xl mb-10 max-w-2xl mx-auto">
          {language === "en"
            ? "Experience the vibrant flavors of the sea, freshly prepared and served with passion."
            : "Experimenta los vibrantes sabores del mar, preparados frescos y servidos con pasión."}
        </p>
        <a
          href="#menu"
          className="bg-ceviche-green text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition duration-300 inline-block"
        >
          {language === "en" ? "Explore Our Menu" : "Explora Nuestro Menú"}
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
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
    </section>
  );
};

export default Hero;
