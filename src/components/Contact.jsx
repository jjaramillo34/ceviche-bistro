import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Send,
  QrCode,
} from "lucide-react";
import instagramQR from "/img/instagram-qr.png";
import facebookQR from "/img/facebook-qr.png";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ language }) => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeQR, setActiveQR] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(infoRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // Animate form inputs on focus
      const inputs = formRef.current.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, { scale: 1.05, duration: 0.3 });
        });
        input.addEventListener("blur", () => {
          gsap.to(input, { scale: 1, duration: 0.3 });
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    // You can add a success message or redirect here
  };

  const SocialQRCode = ({ platform, icon: Icon, qrCode }) => (
    <div
      className="flex items-center space-x-4 cursor-pointer"
      onClick={() => setActiveQR(activeQR === platform ? null : platform)}
    >
      <Icon size={24} className="text-[#DDC36B]" />
      <span className="text-[#DDC36B]">{platform}</span>
      <QrCode size={24} className="text-[#DDC36B]" />
      {activeQR === platform && (
        <img
          src={qrCode}
          alt={`${platform} QR Code`}
          className="w-24 h-24 absolute right-0 top-0 mt-2 mr-2"
        />
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-gradient-to-br from-[#004AAE] to-[#001F4D]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-white">
          {language === "en" ? "Get in Touch" : "Contáctanos"}
        </h2>
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-2xl overflow-hidden">
          <div ref={formRef} className="lg:w-1/2 p-8">
            <h3 className="text-3xl font-semibold mb-6 text-[#004AAE]">
              {language === "en" ? "Send Us a Message" : "Envíanos un Mensaje"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-[#333333] font-semibold"
                >
                  {language === "en" ? "Name" : "Nombre"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE] transition duration-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-[#333333] font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE] transition duration-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-[#333333] font-semibold"
                >
                  {language === "en" ? "Message" : "Mensaje"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE] transition duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#DDC36B] text-[#333333] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 flex items-center justify-center w-full"
              >
                <Send size={20} className="mr-2" />
                {language === "en" ? "Send Message" : "Enviar Mensaje"}
              </button>
            </form>
          </div>
          <div
            ref={infoRef}
            className="lg:w-1/2 bg-[#004AAE] text-white p-8 relative overflow-hidden"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DDC36B' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            <h3 className="text-3xl font-semibold mb-8 text-[#DDC36B]">
              {language === "en"
                ? "Contact Information"
                : "Información de Contacto"}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail size={24} className="text-[#DDC36B] mr-4" />
                <a
                  href="mailto:cevichebistronyc@gmail.com"
                  className="hover:underline"
                >
                  <p>
                    {language === "en"
                      ? "cevichebistronyc@gmail.com"
                      : "cevichebistronyc@gmail.com"}
                  </p>
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={24} className="text-[#DDC36B] mr-4" />
                <p>347-881-5133</p>
              </div>
              <div className="flex items-center">
                <MapPin size={24} className="text-[#DDC36B] mr-4" />
                <p>Flushing Park, 111 Street, 56th Avenue</p>
              </div>
            </div>
            <div className="mt-12">
              <h4 className="text-2xl font-semibold mb-6 text-[#DDC36B]">
                {language === "en" ? "Follow Us" : "Síguenos"}
              </h4>
              <div className="space-y-4">
                <SocialQRCode
                  platform="Instagram"
                  icon={Instagram}
                  qrCode={instagramQR}
                />
                <SocialQRCode
                  platform="Facebook"
                  icon={Facebook}
                  qrCode={facebookQR}
                />
              </div>
            </div>
            <p className="text-sm mt-8">
              {language === "en"
                ? "Click on the social media icons to reveal QR codes!"
                : "¡Haz clic en los iconos de redes sociales para revelar los códigos QR!"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
