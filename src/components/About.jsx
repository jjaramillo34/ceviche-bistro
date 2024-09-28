import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

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

const About = ({ language }) => {
  const [activeTab, setActiveTab] = useState("who-we-are");
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const missionRef = useRef(null);
  const featuresRef = useRef(null);

  const descriptions = {
    "who-we-are": {
      en: "Ceviche Bistro is more than just a catering service; it's a culinary journey through the vibrant flavors of Peru. Founded by Chef John Lopez, our company brings authentic Peruvian cuisine to your events, combining traditional recipes with innovative techniques. From intimate gatherings to large-scale corporate events, we offer a range of services tailored to make your experience unforgettable.",
      es: "Ceviche Bistro es más que un simple servicio de catering; es un viaje culinario a través de los vibrantes sabores del Perú. Fundada por el Chef John Lopez, nuestra empresa lleva auténtica cocina peruana a tus eventos, combinando recetas tradicionales con técnicas innovadoras. Desde reuniones íntimas hasta eventos corporativos a gran escala, ofrecemos una gama de servicios adaptados para hacer tu experiencia inolvidable.",
    },
    "what-we-offer": {
      en: "At Ceviche Bistro, we offer a comprehensive range of catering services designed to meet all your culinary needs. Our offerings include elegant buffets featuring a variety of Peruvian dishes, convenient takeout options for smaller gatherings, and expertly crafted tasting menus that take your guests on a gastronomic tour of Peru. We also provide personalized menu planning, on-site chefs for live cooking demonstrations, and full-service event planning to ensure every detail of your event is perfect.",
      es: "En Ceviche Bistro, ofrecemos una gama completa de servicios de catering diseñados para satisfacer todas tus necesidades culinarias. Nuestras ofertas incluyen elegantes buffets con una variedad de platos peruanos, opciones convenientes para llevar para reuniones más pequeñas, y menús de degustación expertamente elaborados que llevan a tus invitados en un tour gastronómico por el Perú. También ofrecemos planificación de menús personalizados, chefs en el lugar para demostraciones de cocina en vivo, y planificación completa de eventos para asegurar que cada detalle de tu evento sea perfecto.",
    },
  };

  const ownerBio = {
    en: "Chef John Lopez, the heart and soul of Ceviche Bistro, brings over 20 years of culinary expertise to every dish. Born in Arequipa, Peru, John's passion for cooking was ignited in his grandmother's kitchen, where he first learned the secrets of traditional Peruvian cuisine. His journey from the volcanic landscapes of Arequipa to the bustling streets of New York is a testament to his dedication to the culinary arts. After honing his skills in renowned restaurants across Peru, John took a leap of faith and moved to New York, where he further refined his techniques in some of the city's most prestigious kitchens. Today, with Ceviche Bistro, he fulfills his dream of sharing the authentic flavors of his homeland with a modern twist. John's cuisine is a vibrant fusion of his classical training, his Arequipeñan roots, and his love for New York's diverse food scene. Each dish tells a story of tradition, innovation, and passion, creating unforgettable dining experiences that transport our clients straight to the heart of Peru.",
    es: "El Chef John Lopez, el corazón y alma de Ceviche Bistro, aporta más de 20 años de experiencia culinaria a cada plato. Nacido en Arequipa, Perú, la pasión de John por la cocina se encendió en la cocina de su abuela, donde aprendió por primera vez los secretos de la cocina tradicional peruana. Su viaje desde los paisajes volcánicos de Arequipa hasta las bulliciosas calles de Nueva York es un testimonio de su dedicación a las artes culinarias. Después de perfeccionar sus habilidades en reconocidos restaurantes de Perú, John dio un salto de fe y se mudó a Nueva York, donde refinó aún más sus técnicas en algunas de las cocinas más prestigiosas de la ciudad. Hoy, con Ceviche Bistro, cumple su sueño de compartir los auténticos sabores de su tierra natal con un toque moderno. La cocina de John es una vibrante fusión de su formación clásica, sus raíces arequipeñas y su amor por la diversa escena gastronómica de Nueva York. Cada plato cuenta una historia de tradición, innovación y pasión, creando experiencias gastronómicas inolvidables que transportan a nuestros clientes directamente al corazón del Perú.",
  };

  const mission = {
    en: "At Ceviche Bistro, our mission is to create a bridge between the rich culinary traditions of Peru and the diverse palates of New York City. We are committed to delivering an authentic taste of Peru while embracing innovation and sustainability. Our goal is not just to serve food, but to create memorable experiences that celebrate the vibrant culture and flavors of Peru. We source the freshest, highest-quality ingredients, prioritizing local suppliers and sustainable practices. Through our cuisine, we aim to educate and inspire, introducing our clients to the depth and diversity of Peruvian gastronomy. Every dish we serve is a testament to our dedication to culinary excellence and cultural preservation.",
    es: "En Ceviche Bistro, nuestra misión es crear un puente entre las ricas tradiciones culinarias del Perú y los diversos paladares de la ciudad de Nueva York. Estamos comprometidos a ofrecer un auténtico sabor del Perú mientras abrazamos la innovación y la sostenibilidad. Nuestro objetivo no es solo servir comida, sino crear experiencias memorables que celebren la vibrante cultura y los sabores del Perú. Obtenemos los ingredientes más frescos y de la más alta calidad, priorizando a los proveedores locales y las prácticas sostenibles. A través de nuestra cocina, aspiramos a educar e inspirar, introduciendo a nuestros clientes en la profundidad y diversidad de la gastronomía peruana. Cada plato que servimos es un testimonio de nuestra dedicación a la excelencia culinaria y la preservación cultural.",
  };

  const features = [
    {
      en: "Authentic Peruvian Flavors",
      es: "Auténticos Sabores Peruanos",
      icon: "🍽️",
    },
    {
      en: "Customizable Menus",
      es: "Menús Personalizables",
      icon: "📜",
    },
    {
      en: "Professional Service",
      es: "Servicio Profesional",
      icon: "👨‍🍳",
    },
    {
      en: "Sustainable Practices",
      es: "Prácticas Sostenibles",
      icon: "🌿",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const missionElement = missionRef.current;
    const featuresElement = featuresRef.current;

    if (section && image && content && missionElement && featuresElement) {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-gradient-to-b from-[#E6F7FF] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-8 text-[#004AAE]">
          {language === "en"
            ? "Discover Our Story"
            : "Descubre Nuestra Historia"}
        </AnimatedTitle>
        <p className="text-xl text-center mb-16 text-[#333333]">
          {language === "en"
            ? "Experience the passion behind Ceviche Bistro"
            : "Experimenta la pasión detrás de Ceviche Bistro"}
        </p>
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div ref={imageRef} className="lg:w-1/3 mb-8 lg:mb-0">
              <img
                src="/img/john.jpg"
                alt="Chef John Lopez - Owner of Ceviche Bistro"
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
                    onClick={() => setActiveTab("who-we-are")}
                    className={`px-6 py-3 mr-2 rounded-t-lg font-semibold transition duration-300 ${
                      activeTab === "who-we-are"
                        ? "bg-[#004AAE] text-white"
                        : "bg-gray-200 text-[#333333] hover:bg-[#FFD700] hover:text-white"
                    }`}
                  >
                    {language === "en" ? "Who We Are" : "Quiénes Somos"}
                  </button>
                  <button
                    onClick={() => setActiveTab("what-we-offer")}
                    className={`px-6 py-3 rounded-t-lg font-semibold transition duration-300 ${
                      activeTab === "what-we-offer"
                        ? "bg-[#004AAE] text-white"
                        : "bg-gray-200 text-[#333333] hover:bg-[#FFD700] hover:text-white"
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
        </div>

        <div
          ref={missionRef}
          className="bg-white rounded-lg shadow-2xl p-8 mb-16"
        >
          <AnimatedTitle className="mb-8 text-[#004AAE]">
            {language === "en" ? "Our Mission" : "Nuestra Misión"}
          </AnimatedTitle>
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
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-4 text-[#004AAE]">
                {feature[language]}
              </h4>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#menu"
            className="bg-[#FFD700] text-[#333333] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-flex items-center group"
          >
            {language === "en" ? "Explore Our Menu" : "Explora Nuestro Menú"}
            <ChevronDown className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default About;
