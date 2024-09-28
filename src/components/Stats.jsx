import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Calendar, Star, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105"
    >
      <Icon size={40} className="text-[#DDC36B] mb-4" aria-hidden="true" />
      <p className="text-4xl font-bold text-[#004AAE] mb-2">
        <span ref={numberRef} aria-live="polite">
          {value}
        </span>
        {Number.isInteger(value) ? "+" : ""}
      </p>
      <p className="text-lg text-gray-600 text-center">{label[language]}</p>
    </div>
  );
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
      className="py-20 bg-gradient-to-r from-[#004AAE] to-[#001F4D]"
    >
      <div className="container mx-auto px-4">
        <div className="bg-[#F5F5F5] py-16 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
            {language === "en"
              ? "Our Success in Numbers"
              : "Nuestro Éxito en Números"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} language={language} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
