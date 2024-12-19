import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Catering from "./components/Catering";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import ScrollNavigation from "./components/ScrollNavigation";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="font-sans">
          <Header language={language} toggleLanguage={toggleLanguage} />
          <main>
            <section id="hero">
              <Hero language={language} />
            </section>
            <section id="about">
              <About language={language} />
            </section>
            <section id="catering">
              <Catering language={language} />
            </section>
            <section id="menu">
              <Menu language={language} />
            </section>
            <section id="stats">
              <Stats language={language} />
            </section>
            <section id="testimonials">
              <Testimonials language={language} />
            </section>
            <section id="contact">
              <Contact language={language} />
            </section>
            <section id="gallery">
              <Gallery language={language} />
            </section>
          </main>
          <Footer language={language} />
          <ScrollNavigation />
          <FloatingWhatsApp
            phoneNumber="+13478815133"
            accountName="CevicheBistro"
            allowEsc
            allowClickAway
            notification
            notificationSound
            statusMessage={
              language === "en"
                ? "Typically replies within 1 hour"
                : "Normalmente responde en 1 hora"
            }
            chatMessage={
              language === "en"
                ? "Hello! 👋🏼 How can we help you?"
                : "¡Hola! 👋🏼 ¿Cómo podemos ayudarte?"
            }
            placeholder={
              language === "en" ? "Type a message..." : "Escribe un mensaje..."
            }
          />
        </div>
      )}
    </>
  );
};

export default App;
