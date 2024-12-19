import React from "react";
import logoFooter from "/img/logo.png";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import instagramQR from "/img/instagram-qr.png";
import facebookQR from "/img/facebook-qr.png";

const SocialQRCode = ({ platform, icon: Icon, qrCode }) => (
  <div className="flex items-center space-x-2">
    <Icon size={20} className="text-accent" />
    <span className="text-accent">{platform}</span>
    <img src={qrCode} alt={`${platform} QR Code`} className="w-12 h-12" />
  </div>
);

const Footer = ({ language }) => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <img
              src={logoFooter}
              alt="CevicheBistro Logo"
              className="w-32 mb-4"
            />
            <p className="text-sm text-[#F5F5F5]">
              {language === "en"
                ? "Fresh seafood on wheels, bringing the taste of the ocean to your neighborhood."
                : "Mariscos frescos sobre ruedas, llevando el sabor del océano a tu vecindario."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">
              {language === "en" ? "Quick Links" : "Enlaces Rápidos"}
            </h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Our Menu",
                "Catering",
                "Gallery",
                "Contact Us",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:text-accent transition duration-300"
                  >
                    {language === "en"
                      ? item
                      : {
                          "About Us": "Sobre Nosotros",
                          "Our Menu": "Nuestro Menú",
                          Catering: "Catering",
                          Gallery: "Galería",
                          "Contact Us": "Contáctanos",
                        }[item]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">
              {language === "en" ? "Contact Us" : "Contáctanos"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>cevichebistronyc@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>347-881-5133</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>Flushing Park, 111 Street, 56th Avenue</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-accent">
              {language === "en" ? "Follow Us" : "Síguenos"}
            </h3>
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
            <p className="text-sm mt-4">
              {language === "en"
                ? "Scan the QR codes to follow us on social media!"
                : "¡Escanea los códigos QR para seguirnos en redes sociales!"}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-accent text-center">
          <p className="text-[#F5F5F5]">
            &copy; {new Date().getFullYear()} CevicheBistro.{" "}
            {language === "en"
              ? "All rights reserved."
              : "Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
