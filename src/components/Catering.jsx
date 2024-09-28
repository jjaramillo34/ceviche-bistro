import React, { useEffect, useRef, useState } from "react";
import { Utensils, Users, Truck, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const CateringFeature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <Icon size={48} className="text-[#004AAE] mb-6" aria-hidden="true" />
    <h3 className="text-2xl font-semibold mb-4 text-[#004AAE]">{title}</h3>
    <p className="text-[#333333] text-lg">{description}</p>
  </div>
);

const Catering = ({ language }) => {
  const titleRef = useRef(null);
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
      gsap.to(titleRef.current, {
        duration: 2,
        text: language === "en" ? "Catering Services" : "Servicios de Catering",
        ease: "power1.inOut",
      });

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
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-center mb-8 text-[#004AAE] animate-fadeIn"
          aria-live="polite"
        ></h2>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-[#004AAE]"></span>
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
            className="bg-[#DDC36B] text-[#333333] px-10 py-5 rounded-full text-2xl font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#004AAE] focus:ring-opacity-50"
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

export default Catering;
