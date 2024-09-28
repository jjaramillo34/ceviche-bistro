import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Calendar, Star, Trophy } from "lucide-react";

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

const StatCard = ({ icon: Icon, value, label, language }) => {
  const cardRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(numberRef.current, {
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: {
          each: 0.1,
          onUpdate: function () {
            this.targets()[0].innerHTML = Number.isInteger(value)
              ? Math.ceil(this.targets()[0].textContent)
              : parseFloat(this.targets()[0].textContent).toFixed(1);
          },
        },
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert(); // cleanup
  }, [value]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="w-20 h-20 rounded-full bg-[#004AAE] bg-opacity-10 flex items-center justify-center mb-6">
        <Icon size={40} className="text-[#FFD700]" aria-hidden="true" />
      </div>
      <p className="text-5xl font-bold text-[#004AAE] mb-4">
        <span ref={numberRef} aria-live="polite">
          {value}
        </span>
        {Number.isInteger(value) ? "+" : ""}
      </p>
      <p className="text-xl text-gray-600 text-center font-semibold">
        {label[language]}
      </p>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.shape({
    en: PropTypes.string.isRequired,
    es: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

const Stats = ({ language }) => {
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Users,
      value: 5000,
      label: { en: "Happy Clients", es: "Clientes Satisfechos" },
    },
    {
      icon: Calendar,
      value: 200,
      label: { en: "Events Catered", es: "Eventos Atendidos" },
    },
    {
      icon: Star,
      value: 4.9,
      label: { en: "Average Rating", es: "Calificación Promedio" },
    },
    {
      icon: Trophy,
      value: 15,
      label: { en: "Awards Won", es: "Premios Ganados" },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-r from-[#E6F7FF] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-16 text-[#004AAE]">
          {language === "en"
            ? "Our Success in Numbers"
            : "Nuestro Éxito en Números"}
        </AnimatedTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

Stats.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Stats;
