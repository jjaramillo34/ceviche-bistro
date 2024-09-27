import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Facebook,
  ArrowRight,
  ArrowLeft,
  QrCode,
} from "lucide-react";
import instagramQR from "../assets/img/instagram-qr.png";
import facebookQR from "../assets/img/facebook-qr.png";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ language }) => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const sectionRef = useRef(null);

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
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  const SocialQRCode = ({ platform, icon: Icon, qrCode }) => (
    <div className="flex items-center space-x-4">
      <Icon size={24} className="text-[#DDC36B]" />
      <ArrowRight size={24} className="text-[#DDC36B]" />
      <QrCode size={24} className="text-[#DDC36B]" />
      <ArrowLeft size={24} className="text-[#DDC36B]" />
      <img src={qrCode} alt={`${platform} QR Code`} className="w-24 h-24" />
    </div>
  );

  return (
    <section ref={sectionRef} id="contact" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
          {language === "en" ? "Contact Us" : "Contáctanos"}
        </h2>
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={formRef} className="md:w-1/2 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004AAE]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#DDC36B] text-[#333333] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300"
              >
                {language === "en" ? "Send Message" : "Enviar Mensaje"}
              </button>
            </form>
          </div>
          <div
            ref={infoRef}
            className="md:w-1/2 bg-[#004AAE] text-white p-8 relative overflow-hidden"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DDC36B' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-[#DDC36B]">
              {language === "en" ? "Find Us" : "Encuéntranos"}
            </h3>
            <p className="mb-4">Email: cevichebistro@gmail.com</p>
            <p className="mb-4">
              {language === "en" ? "Phone" : "Teléfono"}: 347-881-5133
            </p>
            <p className="mb-4">
              {language === "en" ? "Address" : "Dirección"}: Flushing Park, 111
              Street, 56th Avenue
            </p>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4 text-[#DDC36B]">
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
            <p className="text-sm">
              {language === "en"
                ? "Scan the QR codes to follow us on social media!"
                : "¡Escanea los códigos QR para seguirnos en redes sociales!"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
