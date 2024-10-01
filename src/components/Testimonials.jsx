import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ name, role, content, rating }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
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
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-[#FFD700]" : "text-gray-300"}
            fill={i < rating ? "#FFD700" : "none"}
          />
        ))}
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

  const testimonials = [
    {
      name: "Javier Jaramillo",
      role: language === "en" ? "Food Critic" : "Crítico Gastronómico",
      content:
        language === "en"
          ? "The ceviche at this bistro is a revelation! It's a perfect balance of flavors that transports you straight to the coast of Peru."
          : "¡El ceviche de este bistró es una revelación! Es un equilibrio perfecto de sabores que te transporta directamente a la costa de Perú.",
      rating: 5,
    },
    {
      name: "Michael Manzano",
      role: language === "en" ? "Regular Customer" : "Cliente Habitual",
      content:
        language === "en"
          ? "I've been coming here for months, and the quality and taste never disappoint. The staff is always friendly and attentive."
          : "He estado viniendo aquí durante meses, y la calidad y el sabor nunca decepcionan. El personal siempre es amable y atento.",
      rating: 5,
    },
    {
      name: "Luis Jaramillo",
      role:
        language === "en"
          ? "Local Food Blogger"
          : "Bloguero Gastronómico Local",
      content:
        language === "en"
          ? "This place is a hidden gem! Their seafood is always fresh, and the presentation is Instagram-worthy. A must-visit for any food enthusiast."
          : "¡Este lugar es una joya escondida! Sus mariscos siempre están frescos y la presentación es digna de Instagram. Una visita obligada para cualquier entusiasta de la comida.",
      rating: 5,
    },
    {
      name: "Sofia Rodriguez",
      role:
        language === "en" ? "First-time Visitor" : "Visitante por Primera Vez",
      content:
        language === "en"
          ? "I was blown away by the flavors in their dishes. The atmosphere is cozy, and the staff made great recommendations. I'll definitely be back!"
          : "Me quedé impresionada por los sabores de sus platos. El ambiente es acogedor y el personal hizo excelentes recomendaciones. ¡Definitivamente volveré!",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      role: language === "en" ? "Peruvian Expat" : "Expatriado Peruano",
      content:
        language === "en"
          ? "As someone who grew up in Peru, I can confidently say that the flavors here are authentic. It's like a taste of home in the heart of New York."
          : "Como alguien que creció en Perú, puedo decir con confianza que los sabores aquí son auténticos. Es como un sabor de casa en el corazón de Nueva York.",
      rating: 5,
    },
    {
      name: "Emily Chang",
      role: language === "en" ? "Food Photographer" : "Fotógrafa Gastronómica",
      content:
        language === "en"
          ? "Not only does the food taste amazing, but it's also beautifully presented. Every dish is a work of art that's almost too pretty to eat... almost!"
          : "La comida no solo sabe increíble, sino que también está bellamente presentada. Cada plato es una obra de arte que casi es demasiado bonita para comer... ¡casi!",
      rating: 5,
    },
    {
      name: "David Thompson",
      role:
        language === "en"
          ? "Culinary Arts Student"
          : "Estudiante de Artes Culinarias",
      content:
        language === "en"
          ? "I've learned so much about Peruvian cuisine just by dining here. The fusion of flavors and techniques is inspiring. It's more than a meal; it's an education."
          : "He aprendido mucho sobre la cocina peruana simplemente cenando aquí. La fusión de sabores y técnicas es inspiradora. Es más que una comida; es una educación.",
      rating: 5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-[#004AAE] to-[#001F4D]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          {language === "en"
            ? "What Our Customers Say"
            : "Lo Que Dicen Nuestros Clientes"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Testimonials;
