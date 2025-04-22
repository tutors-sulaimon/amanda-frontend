import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// Importing images
import BackgroundImage from "../assets/4-1.jpeg";
import ProfileImage1 from "../assets/testimonial1.jpg";
import ProfileImage2 from "../assets/testimonial2.jpg";
import ProfileImage3 from "../assets/testimonial3.jpg";



export const Testimonials = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  interface Testimonial {
    name: string;
    image: string;
    text: string;
  }
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "María José",
      image: ProfileImage1,
      text: t("mariaJoseTestimonial"),
    },
    {
      name: "Lucia Fernandez",
      image: ProfileImage2,
      text: t("luciaFernandezTestimonial"),
    },
    {
      name: "Sofia Garcia",
      image: ProfileImage3,
      text: t("sofiaGarciaTestimonial"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-transition every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center w-full h-[669px] sm:h-auto">
      {/* Background Image */}
      <div
        className="absolute bg-cover bg-center w-full h-full sm:w-[1120px] sm:h-[669px]"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      {/* Carousel Container */}
      <div className="relative flex flex-col items-center text-center bg-white bg-opacity-95 rounded-lg shadow-lg p-8 w-[90%] sm:w-[706px] max-w-[706px] h-auto sm:h-[523px] my-32">
        {/* Testimonial Title */}
        <h2 className="font-manrope text-[28px] sm:text-[31px] text-[#4F4F4F]">
          {t("testimonials")}
        </h2>

        {/* Left Button */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() =>
            setCurrentTestimonial((prev) =>
              prev > 0 ? prev - 1 : testimonials.length - 1
            )
          }
        >
          <ChevronLeft className="h-6 w-6 text-gray-500" />
        </button>

        {/* Testimonial Content */}
        <div className="flex flex-col items-center px-4 sm:px-8 space-y-4">
          {/* Profile Image */}
          <img
            src={testimonials[currentTestimonial].image}
            alt={testimonials[currentTestimonial].name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-300 shadow-lg mt-2"
          />
          {/* Name */}
          <h3 className="mt-2 mb-2 font-playfair text-xl sm:text-[25.41px] text-[#4F4F4F]">
            {testimonials[currentTestimonial].name}
          </h3>
          {/* Text */}
          <p className="font-quicksand text-sm sm:text-[21.39px] text-[#4F4F4F] leading-normal">
            {testimonials[currentTestimonial].text}
          </p>
        </div>

        {/* Right Button */}
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() =>
            setCurrentTestimonial((prev) =>
              prev < testimonials.length - 1 ? prev + 1 : 0
            )
          }
        >
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </section>
  );
};
