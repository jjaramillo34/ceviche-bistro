import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { X, Heart, MessageCircle, Hash } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const eventHashtags = [
  "CevicheFiesta",
  "PeruvianNights",
  "SeafoodSoiree",
  "LimaFlavors",
  "OceanToTable",
  "CulinaryJourney",
  "TasteOfPeru",
  "FoodTruckFun",
  "FreshCatch",
  "CevicheLove",
  "StreetFoodDelights",
  "FusionFeast",
  "CoastalCuisine",
  "AndesinNYC",
  "LatinoFlavors",
];

const images = Array.from({ length: 54 }, (_, i) => ({
  src: `/img/image${i + 1}.jpeg`,
  alt: eventHashtags[i % eventHashtags.length],
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
}));

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

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-lg font-semibold">#{image.alt}</p>
          <div className="flex items-center mt-2">
            <Heart size={20} className="mr-1" /> {image.likes}
            <MessageCircle size={20} className="ml-4 mr-1" /> {image.comments}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 p-2 rounded-full"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    animation
      .from(textRef.current, { opacity: 0, y: 20, duration: 0.5 })
      .to(textRef.current, {
        duration: 1.5,
        text: {
          value: text,
          delimiter: "",
        },
        ease: "none",
      });

    return () => {
      animation.kill();
    };
  }, [text]);

  return <span ref={textRef}></span>;
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
};

const Gallery = ({ language }) => {
  const [modalImage, setModalImage] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sliderRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 bg-gradient-to-b from-[#E6F7FF] to-[#F5F5F5]"
    >
      <div className="container mx-auto px-4">
        <AnimatedTitle className="mb-8 text-[#004AAE]">
          {language === "en" ? "Event Highlights" : "Momentos Destacados"}
        </AnimatedTitle>
        <p className="text-xl text-center mb-16 text-[#333333]">
          {language === "en"
            ? "Explore the vibrant moments from our culinary events and social gatherings"
            : "Explora los momentos vibrantes de nuestros eventos culinarios y reuniones sociales"}
        </p>

        <div
          ref={sliderRef}
          className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-full cursor-pointer"
                  onClick={() => setModalImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                    <p className="text-center font-semibold text-lg mb-2">
                      #{image.alt}
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                      <span className="flex items-center text-red-500">
                        <Heart size={16} className="mr-1" /> {image.likes}
                      </span>
                      <span className="flex items-center text-blue-600">
                        <MessageCircle size={16} className="mr-1" />{" "}
                        {image.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev !text-[#FFD700] !bg-white !w-12 !h-12 !rounded-full !shadow-md"></div>
          <div className="swiper-button-next !text-[#FFD700] !bg-white !w-12 !h-12 !rounded-full !shadow-md"></div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-[#004AAE]">
            {language === "en" ? "Popular Hashtags" : "Hashtags Populares"}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {eventHashtags.map((hashtag, index) => (
              <div
                key={index}
                className="bg-white rounded-full px-4 py-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <span className="text-[#004AAE] font-semibold group-hover:text-[#FFD700]">
                  <Hash size={16} className="inline-block mr-1" />
                  <AnimatedText text={hashtag} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </section>
  );
};

Gallery.propTypes = {
  language: PropTypes.oneOf(["en", "es"]).isRequired,
};

export default Gallery;
