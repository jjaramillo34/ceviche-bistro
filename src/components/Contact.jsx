import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
  ExternalLink,
} from "lucide-react";
import instagramQR from "/img/instagram-qr.png";
import facebookQR from "/img/facebook-qr.png";

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

const SocialQRCode = ({ platform, icon: Icon, qrCode }) => {
  const [activeQR, setActiveQR] = useState(null);

  return (
    <div
      className="flex items-center space-x-4 cursor-pointer"
      onClick={() => setActiveQR(activeQR === platform ? null : platform)}
    >
      <Icon size={24} className="text-[#FFD700]" />
      <span className="text-[#FFD700]">{platform}</span>
      <QrCode size={24} className="text-[#FFD700]" />
      {activeQR === platform && (
        <img
          src={qrCode}
          alt={`${platform} QR Code`}
          className="w-48 h-48 absolute right-10 top-20 mt-2 mr-2"
        />
      )}
    </div>
  );
};

SocialQRCode.propTypes = {
  platform: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  qrCode: PropTypes.string.isRequired,
};

const Contact = ({ language }) => {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
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

      gsap.from(mapRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: mapRef.current,
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-gradient-to-br from-[#004AAE] to-[#001F4D]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-12 text-white">
          {language === "en" ? "Get in Touch" : "Contáctanos"}
        </AnimatedTitle>
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-2xl overflow-hidden">
          <div ref={formRef} className="lg:w-1/2 p-8">
            <AnimatedTitle className="mb-6 text-[#004AAE]">
              {language === "en" ? "Send Us a Message" : "Envíanos un Mensaje"}
            </AnimatedTitle>
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
                className="bg-[#FFD700] text-[#333333] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#004AAE] hover:text-white transition duration-300 flex items-center justify-center w-full"
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
            <AnimatedTitle className="mb-8 text-[#FFD700]">
              {language === "en"
                ? "Contact Information"
                : "Información de Contacto"}
            </AnimatedTitle>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail size={24} className="text-[#FFD700] mr-4" />
                <a
                  href="mailto:cevichebistronyc@gmail.com"
                  className="hover:underline"
                >
                  <p>cevichebistronyc@gmail.com</p>
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={24} className="text-[#FFD700] mr-4" />
                <p>347-881-5133</p>
              </div>
              <div className="flex items-center">
                <MapPin size={24} className="text-[#FFD700] mr-4" />
                <p>Flushing Park, 111 Street, 56th Avenue</p>
              </div>
            </div>
            <div className="mt-12">
              <h4 className="text-2xl font-semibold mb-6 text-[#FFD700]">
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
        <div
          ref={mapRef}
          className="mt-12 bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="p-4 bg-[#004AAE] text-white flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {language === "en" ? "Find Us Here" : "Encuéntranos Aquí"}
            </h3>
            <a
              href="https://www.google.com/maps/place/40%C2%B044'30.3%22N+73%C2%B051'00.5%22W/@40.7417543,-73.8501362,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.741754!4d-73.8501362?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFD700] hover:underline"
            >
              <span className="mr-2">
                {language === "en"
                  ? "View on Google Maps"
                  : "Ver en Google Maps"}
              </span>
              <ExternalLink size={16} />
            </a>
          </div>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3022.9214324316645!2d-73.8501362!3d40.741754300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQ0JzMwLjMiTiA3M8KwNTEnMDAuNSJX!5e0!3m2!1sen!2sus!4v1727794182041!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Contact;
