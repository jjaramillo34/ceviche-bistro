import React from "react";
import logo from "/img/logo.png"; // Adjust the path to your logo image

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center">
        <img
          src={logo}
          alt="Ceviche Bistro Logo"
          className="w-48 mb-4 animate-bounce"
        />
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome to Ceviche Bistro
        </h1>
        <p className="text-lg text-text">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
