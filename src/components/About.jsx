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

  const descriptions = [
    {
      en: "We are dedicated to bringing the vibrant flavors of Peru to your events through our catering services. Led by Chef John Lopez, our owner and executive chef with years of experience in Peruvian cuisine, we offer everything from elegant buffets to convenient takeout and tasting menus. Whether it's a wedding, anniversary, or corporate event, let us make your gathering unforgettable with our delicious dishes!",
      es: "Nos dedicamos a llevar los vibrantes sabores del Perú a tus eventos a través de nuestros servicios de catering. Liderados por el chef John Lopez, propietario y chef ejecutivo con años de experiencia en la cocina peruana, ofrecemos desde elegantes buffets hasta comida para llevar y menús de degustación. Ya sea una boda, un aniversario o un evento corporativo, ¡déjanos hacer que tu reunión sea inolvidable con nuestros deliciosos platos!",
    },
    {
      en: "At our company, we specialize in authentic Peruvian food for every occasion. With Chef John Lopez at the helm, our owner and executive chef, we ensure that every dish reflects years of expertise in Peruvian flavors. From exquisite buffets to delightful tasting experiences, we cater to all events, including parties, weddings, and anniversaries. Join us for a culinary journey that will elevate your celebration!",
      es: "En nuestra empresa, nos especializamos en ofrecer auténtica comida peruana para cada ocasión. Con el chef John Lopez al mando, nuestro propietario y chef ejecutivo, aseguramos que cada plato refleje años de experiencia en los sabores peruanos. Desde buffets exquisitos hasta experiencias de degustación, atendemos todo tipo de eventos, incluyendo fiestas, bodas y aniversarios. ¡Únete a nosotros en un viaje culinario que elevará tu celebración!",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-[##DDC36B]">
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
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-2xl p-8">
          <div ref={imageRef} className="lg:w-1/3 mb-8 lg:mb-0">
            <img
              src={ownerImage}
              alt="Chef John Lopez - Owner of CevicheBistro"
              className="rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
            />
          </div>
          <div ref={contentRef} className="lg:w-2/3 lg:pl-12">
            <h3 className="text-3xl font-semibold mb-6 text-[#004AAE]">
              {language === "en" ? "Our Journey" : "Nuestro Viaje"}
            </h3>
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
            <div className="mt-8">
              <a
                href="#menu"
                className="bg-[#DDC36B] text-[#333333] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block"
              >
                {language === "en"
                  ? "Explore Our Menu"
                  : "Explora Nuestro Menú"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
