import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ownerImage from "/img/john.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = ({ language }) => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const missionRef = useRef(null);
  const featuresRef = useRef(null);

  const descriptions = [
    {
      en: "CevicheBistro is more than just a catering service; it's a culinary journey through the vibrant flavors of Peru. Founded by Chef John Lopez, our company brings authentic Peruvian cuisine to your events, combining traditional recipes with innovative techniques. From intimate gatherings to large-scale corporate events, we offer a range of services tailored to make your experience unforgettable.",
      es: "CevicheBistro es más que un simple servicio de catering; es un viaje culinario a través de los vibrantes sabores del Perú. Fundada por el Chef John Lopez, nuestra empresa lleva auténtica cocina peruana a tus eventos, combinando recetas tradicionales con técnicas innovadoras. Desde reuniones íntimas hasta eventos corporativos a gran escala, ofrecemos una gama de servicios adaptados para hacer tu experiencia inolvidable.",
    },
    {
      en: "At CevicheBistro, we offer a comprehensive range of catering services designed to meet all your culinary needs. Our offerings include elegant buffets featuring a variety of Peruvian dishes, convenient takeout options for smaller gatherings, and expertly crafted tasting menus that take your guests on a gastronomic tour of Peru. We also provide personalized menu planning, on-site chefs for live cooking demonstrations, and full-service event planning to ensure every detail of your event is perfect.",
      es: "En CevicheBistro, ofrecemos una gama completa de servicios de catering diseñados para satisfacer todas tus necesidades culinarias. Nuestras ofertas incluyen elegantes buffets con una variedad de platos peruanos, opciones convenientes para llevar para reuniones más pequeñas, y menús de degustación expertamente elaborados que llevan a tus invitados en un tour gastronómico por el Perú. También ofrecemos planificación de menús personalizados, chefs en el lugar para demostraciones de cocina en vivo, y planificación completa de eventos para asegurar que cada detalle de tu evento sea perfecto.",
    },
  ];

  const ownerBio = {
    en: "Chef John Lopez, the heart and soul of CevicheBistro, brings over 20 years of culinary expertise to every dish. Born in Lima, Peru, John's passion for cooking was ignited in his grandmother's kitchen. After honing his skills in renowned restaurants across South America and Europe, John settled in New York, where he dreamed of sharing the authentic flavors of his homeland. With CevicheBistro, he combines his classical training with his deep-rooted love for Peruvian cuisine, creating unforgettable dining experiences for all our clients.",
    es: "El Chef John Lopez, el corazón y alma de CevicheBistro, aporta más de 20 años de experiencia culinaria a cada plato. Nacido en Lima, Perú, la pasión de John por la cocina se encendió en la cocina de su abuela. Después de perfeccionar sus habilidades en reconocidos restaurantes de Sudamérica y Europa, John se estableció en Nueva York, donde soñaba con compartir los auténticos sabores de su tierra natal. Con CevicheBistro, combina su formación clásica con su profundo amor por la cocina peruana, creando experiencias gastronómicas inolvidables para todos nuestros clientes.",
  };

  const mission = {
    en: "Our mission at CevicheBistro is to transport you to the heart of Peru through our food. We are committed to using the freshest, highest-quality ingredients, supporting local suppliers whenever possible, and maintaining the authenticity of our dishes while innovating to meet modern tastes. We aim to not just feed our clients, but to provide them with a cultural experience that celebrates the rich culinary heritage of Peru.",
    es: "Nuestra misión en CevicheBistro es transportarte al corazón del Perú a través de nuestra comida. Estamos comprometidos a utilizar los ingredientes más frescos y de la más alta calidad, apoyando a proveedores locales siempre que sea posible, y manteniendo la autenticidad de nuestros platos mientras innovamos para satisfacer los gustos modernos. Nuestro objetivo no es solo alimentar a nuestros clientes, sino proporcionarles una experiencia cultural que celebre la rica herencia culinaria del Perú.",
  };

  const features = [
    {
      en: "Authentic Peruvian Flavors",
      es: "Auténticos Sabores Peruanos",
    },
    {
      en: "Customizable Menus",
      es: "Menús Personalizables",
    },
    {
      en: "Professional Service",
      es: "Servicio Profesional",
    },
    {
      en: "Sustainable Practices",
      es: "Prácticas Sostenibles",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const missionElement = missionRef.current;
    const featuresElement = featuresRef.current;

    gsap.fromTo(
      image,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      missionElement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: missionElement,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      featuresElement.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresElement,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gradient-to-b from-[#DDC36B] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">
          {language === "en"
            ? "Discover Our Story"
            : "Descubre Nuestra Historia"}
        </h2>
        <p className="text-xl text-center mb-12 text-white">
          {language === "en"
            ? "Experience the passion behind CevicheBistro"
            : "Experimenta la pasión detrás de CevicheBistro"}
        </p>
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-2xl p-8 mb-16">
          <div ref={imageRef} className="lg:w-1/3 mb-8 lg:mb-0">
            <img
              src={ownerImage}
              alt="Chef John Lopez - Owner of CevicheBistro"
              className="rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
            />
          </div>
          <div ref={contentRef} className="lg:w-2/3 lg:pl-12">
            <h3 className="text-3xl font-semibold mb-6 text-[#004AAE]">
              {language === "en"
                ? "Meet Chef John Lopez"
                : "Conoce al Chef John Lopez"}
            </h3>
            <p className="text-lg mb-6 text-[#333333] leading-relaxed">
              {ownerBio[language]}
            </p>
            <div className="mb-6">
              <div className="flex mb-4">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`px-6 py-3 mr-2 rounded-t-lg font-semibold transition duration-300 ${
                    activeTab === 0
                      ? "bg-[#004AAE] text-white"
                      : "bg-gray-200 text-[#333333] hover:bg-[#DDC36B] hover:text-white"
                  }`}
                >
                  {language === "en" ? "Who We Are" : "Quiénes Somos"}
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`px-6 py-3 rounded-t-lg font-semibold transition duration-300 ${
                    activeTab === 1
                      ? "bg-[#004AAE] text-white"
                      : "bg-gray-200 text-[#333333] hover:bg-[#DDC36B] hover:text-white"
                  }`}
                >
                  {language === "en" ? "What We Offer" : "Qué Ofrecemos"}
                </button>
              </div>
              <div className="bg-[#F5F5F5] p-6 rounded-b-lg rounded-tr-lg shadow-md">
                <p className="text-lg mb-4 text-[#333333] leading-relaxed">
                  {descriptions[activeTab][language]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={missionRef}
          className="bg-white rounded-lg shadow-2xl p-8 mb-16"
        >
          <h3 className="text-3xl font-semibold mb-6 text-[#004AAE] text-center">
            {language === "en" ? "Our Mission" : "Nuestra Misión"}
          </h3>
          <p className="text-lg mb-4 text-[#333333] leading-relaxed">
            {mission[language]}
          </p>
        </div>

        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <h4 className="text-xl font-semibold mb-4 text-[#004AAE]">
                {feature[language]}
              </h4>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#menu"
            className="bg-[#DDC36B] text-[#333333] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block"
          >
            {language === "en" ? "Explore Our Menu" : "Explora Nuestro Menú"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
