import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Utensils, Users, Truck, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

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

const CateringFeature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-[#004AAE] border-opacity-20">
    <div className="w-20 h-20 rounded-full bg-[#004AAE] bg-opacity-10 flex items-center justify-center mb-6">
      <Icon size={36} className="text-[#004AAE]" aria-hidden="true" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-[#004AAE]">{title}</h3>
    <p className="text-[#333333] text-lg">{description}</p>
  </div>
);

CateringFeature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Catering = ({ language }) => {
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Utensils,
      title: language === "en" ? "Custom Menus" : "Menús Personalizados",
      description:
        language === "en"
          ? "Tailored menus to suit your event and preferences."
          : "Menús adaptados a su evento y preferencias.",
    },
    {
      icon: Users,
      title:
        language === "en" ? "Any Event Size" : "Cualquier Tamaño de Evento",
      description:
        language === "en"
          ? "From intimate gatherings to large corporate events."
          : "Desde reuniones íntimas hasta grandes eventos corporativos.",
    },
    {
      icon: Truck,
      title: language === "en" ? "Full Service" : "Servicio Completo",
      description:
        language === "en"
          ? "Setup, service, and cleanup included."
          : "Montaje, servicio y limpieza incluidos.",
    },
    {
      icon: Calendar,
      title:
        language === "en" ? "Flexible Scheduling" : "Programación Flexible",
      description:
        language === "en"
          ? "Available for both weekday and weekend events."
          : "Disponible para eventos entre semana y fines de semana.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(descriptionRef.current, {
        duration: 3,
        text:
          language === "en"
            ? "Bring the flavors of CevicheBistro to your next event. We offer full-service catering for any occasion, big or small."
            : "Lleve los sabores de CevicheBistro a su próximo evento. Ofrecemos servicio completo de catering para cualquier ocasión, grande o pequeña.",
        ease: "power1.inOut",
        delay: 1,
      });

      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section
      id="catering"
      className="py-24 bg-gradient-to-br from-[#E6F3FF] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-8 text-[#004AAE]">
          {language === "en" ? "Catering Services" : "Servicios de Catering"}
        </AnimatedTitle>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            ref={descriptionRef}
            className="text-xl text-[#333333] leading-relaxed animate-fadeIn"
            aria-live="polite"
          ></p>
        </div>
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {features.map((feature, index) => (
            <CateringFeature key={index} {...feature} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="bg-[#FFD700] text-[#333333] px-10 py-5 rounded-full text-2xl font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#004AAE] focus:ring-opacity-50"
            aria-label={
              language === "en" ? "Request Catering" : "Solicitar Catering"
            }
          >
            {language === "en" ? "Request Catering" : "Solicitar Catering"}
          </a>
        </div>
      </div>
    </section>
  );
};

Catering.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Catering;
