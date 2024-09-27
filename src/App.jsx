import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Catering from "./components/Catering";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"));
  };

  return (
    <div className="font-sans">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Catering language={language} />
        <Menu language={language} />
        <Stats language={language} />
        <Contact language={language} />
        <Gallery language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
