import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ children, className }) => {
  const titleRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from([lineLeftRef.current, lineRightRef.current], {
      width: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className={`relative text-center ${className}`}>
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block px-4 relative"
      >
        {children}
        <span
          ref={lineLeftRef}
          className="absolute left-0 bottom-0 h-1 bg-[#FFD700] rounded-full transform -translate-x-full"
          style={{ width: "50px" }}
        ></span>
        <span
          ref={lineRightRef}
          className="absolute right-0 bottom-0 h-1 bg-[#FFD700] rounded-full transform translate-x-full"
          style={{ width: "50px" }}
        ></span>
      </h2>
    </div>
  );
};

AnimatedTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const TestimonialCard = ({ name, role, content, rating }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <Quote size={24} className="text-[#FFD700] mr-2" />
        <div className="flex-grow" />
        <div className="flex items-center">
          <span className="text-[#FFD700] font-bold mr-1">
            {rating.toFixed(1)}
          </span>
          <Star size={16} className="text-[#FFD700]" fill="#FFD700" />
        </div>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{content}</p>
      <div className="mt-auto">
        <h4 className="font-bold text-[#004AAE]">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

const Testimonials = ({ language }) => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Macarena Lopez",
      role: language === "en" ? "Food Enthusiast" : "Entusiasta de la Comida",
      content:
        language === "en"
          ? "The flavors at CevicheBistro are simply extraordinary. Each bite is a journey through Peruvian cuisine."
          : "Los sabores en CevicheBistro son simplemente extraordinarios. Cada bocado es un viaje a través de la cocina peruana.",
      rating: 5,
    },
    {
      name: "Edgar Lopez",
      role: language === "en" ? "Regular Customer" : "Cliente Habitual",
      content:
        language === "en"
          ? "I've been coming here for months, and the quality and taste never disappoint. The staff is always friendly and attentive."
          : "He estado viniendo aquí durante meses, y la calidad y el sabor nunca decepcionan. El personal siempre es amable y atento.",
      rating: 4.8,
    },
    {
      name: "Luis Jaramillo",
      role: language === "en" ? "Chef" : "Chef",
      content:
        language === "en"
          ? "As a chef, I'm impressed by the authenticity and creativity in their dishes. CevicheBistro is setting a new standard for Peruvian cuisine in New York."
          : "Como chef, estoy impresionado por la autenticidad y creatividad en sus platos. CevicheBistro está estableciendo un nuevo estándar para la cocina peruana en Nueva York.",
      rating: 5,
    },
    {
      name: "Javier",
      role: language === "en" ? "Loyal Customer" : "Cliente Leal",
      content:
        language === "en"
          ? "I've been a regular at CevicheBistro for years. The consistency in quality and service is remarkable. It's my go-to place for Peruvian food."
          : "He sido cliente habitual de CevicheBistro durante años. La consistencia en calidad y servicio es notable. Es mi lugar preferido para comida peruana.",
      rating: 4.9,
    },
    {
      name: "Sofia Rodriguez",
      role: language === "en" ? "Food Critic" : "Crítica Gastronómica",
      content:
        language === "en"
          ? "CevicheBistro offers a perfect blend of traditional and modern Peruvian cuisine. Their ceviche is unparalleled in freshness and flavor."
          : "CevicheBistro ofrece una mezcla perfecta de cocina peruana tradicional y moderna. Su ceviche no tiene igual en frescura y sabor.",
      rating: 4.7,
    },
  ];

  const averageRating =
    testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
    testimonials.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#004AAE] to-[#001F4D]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-6 text-white">
          {language === "en"
            ? "What Our Customers Say"
            : "Lo Que Dicen Nuestros Clientes"}
        </AnimatedTitle>
        <div className="flex items-center justify-center mb-12">
          <Star size={24} className="text-[#FFD700] mr-2" fill="#FFD700" />
          <span className="text-white text-2xl font-bold">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-white ml-2">
            {language === "en" ? "Average Rating" : "Calificación Promedio"}
          </span>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <TestimonialCard {...testimonials[currentIndex]} />
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronLeft size={24} className="text-[#004AAE]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg"
          >
            <ChevronRight size={24} className="text-[#004AAE]" />
          </button>
        </div>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Testimonials;
