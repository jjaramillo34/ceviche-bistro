import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Assuming you have these images in your project
const images = [
  { src: "/path/to/image1.jpg", alt: "Friends enjoying ceviche" },
  { src: "/path/to/image2.jpg", alt: "Family gathering" },
  { src: "/path/to/image3.jpg", alt: "Catering event" },
  { src: "/path/to/image4.jpg", alt: "Food preparation" },
  { src: "/path/to/image5.jpg", alt: "Restaurant ambiance" },
  // Add more images as needed
];

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronLeft size={24} className="text-[#004AAE]" />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ChevronRight size={24} className="text-[#004AAE]" />
    </div>
  );
};

const Gallery = ({ language }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="gallery" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#004AAE]">
          {language === "en" ? "Our Gallery" : "Nuestra Galería"}
        </h2>
        <Slider {...settings} className="gallery-slider">
          {images.map((image, index) => (
            <div key={index} className="px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-[#333333] text-center">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
