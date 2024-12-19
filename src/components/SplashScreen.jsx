import React from "react";
import logo from "/img/logo.png"; // Adjust the path to your logo image

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <img src={logo} alt="Ceviche Bistro Logo" className="w-32 mb-4" />
        <h1 className="text-3xl font-bold text-primary">
          Welcome to Ceviche Bistro
        </h1>
        <p className="text-lg text-gray-600 mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
