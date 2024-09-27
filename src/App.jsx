import React, { useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Catering from "./components/Catering";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";
import ScrollNavigation from "./components/ScrollNavigation";
import PDFMenuViewer from "./components/PDFMenuViewer";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
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
        <section id="contact">
          <Contact language={language} />
        </section>
        <section id="gallery">
          <Gallery language={language} />
        </section>
        <section id="pdf-menu">
          <PDFMenuViewer language={language} />
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
  );
}

export default App;
