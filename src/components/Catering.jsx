import React from "react";
import { Utensils, Users, Truck, Calendar } from "lucide-react";

const CateringFeature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
    <Icon size={48} className="text-[#004AAE] mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-[#004AAE]">{title}</h3>
    <p className="text-[#333333]">{description}</p>
  </div>
);

const Catering = ({ language }) => {
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

  return (
    <section id="catering" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
          {language === "en" ? "Catering Services" : "Servicios de Catering"}
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-[#333333]">
            {language === "en"
              ? "Bring the flavors of CevicheBistro to your next event. We offer full-service catering for any occasion, big or small."
              : "Lleve los sabores de CevicheBistro a su próximo evento. Ofrecemos servicio completo de catering para cualquier ocasión, grande o pequeña."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <CateringFeature key={index} {...feature} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="bg-[#DDC36B] text-[#333333] px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 inline-block"
          >
            {language === "en" ? "Request Catering" : "Solicitar Catering"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catering;
