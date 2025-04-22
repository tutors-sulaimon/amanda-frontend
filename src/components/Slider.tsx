import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import slideImg1 from "../assets/8-2.png";
import slideImg2 from "../assets/8-1.png";
import slideImg3 from "../assets/5-2.png";
import { MoveLeft, MoveRight } from "lucide-react";
interface Slide {
  name: string;
  age: string;
  text: string;
  image: string;
}


const Slider: React.FC = () => {
  const {t}=useTranslation();

  const slides: Slide[] = [
    {
      name: "Lucas",
      age: t("lucas10"),
      text: t("lucasExperience"),
      image: slideImg1, // Replace with real image URLs
    },
    {
      name: "Sophia",
      age: t("sophia8"),
      text: t("sophiaExperience"),
      image: slideImg2,
    },
    {
      name: "Emma",
      age: t("emma12"),
      text: t("emmaExperience"),
      image: slideImg3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
      {slides.map((slide, index) =>
        <div
          key={index}
          className={`transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0 hidden"
          } relative w-full h-96 flex items-center`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          {/* Text Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-11/12 max-w-md p-10 text-black bg-white shadow-lg rounded-lg
                          text-center md:text-left antialiased">
            <h3 className="text-2xl font-bold mb-2">
              {slide.name}, {slide.age}
            </h3>
            <p className="md:text-lg text-base">{slide.text}</p>
          </div>
        </div>
      )}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 md:w-20 md:h-20 w-15 h-15 bg-gray-800 text-white opacity-50 flex items-center justify-center p-2 md:p-3 rounded-full z-10"
        onClick={handlePrev}
      >
        <MoveLeft />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 md:w-20 md:h-20 w-15 h-15 bg-gray-800 text-white opacity-50 flex items-center justify-center p-2 md:p-3 rounded-full z-10"
        onClick={handleNext}
      >
        <MoveRight />
      </button>
    </div>
  );
};

export default Slider;
