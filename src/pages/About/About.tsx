import React from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../../components/Hero/Hero";
import styles from "./About.module.css";
import RequestForm from "../../components/RequestForm";
import backgroundVideo from "../../assets/bday1.mp4";
import chefImage from "../../assets/image3.jpg";
import heroImage from "../../assets/5-1.jpg";
import cateringImage1 from "../../assets/about-page-3.jpg";
import cateringImage2 from "../../assets/menu-catering.png";
import cateringImage3 from "../../assets/about-page-2.jpg";
import cateringImage4 from "../../assets/about-page-1.jpg";

const About: React.FC = () => {
  const {t}=useTranslation();
  return (
    <>
      {/* Hero Section with Video */}
      <HeroSection
        backgroundVideo={backgroundVideo}
        heading={t("aboutTitle")}
        description={t("aboutHero")}
        buttons={[]}
      />

      {/* About Section */}
      <section className="container mx-auto py-16 px-4 sm:px-8">
        <div className="w-full lg:w-3/4 m-auto grid gap-10 py-10 text-center">
          <h2 className={`${styles.heading_l} text-center`}>{t("meetOurTeam")}</h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center py-10 gap-8 lg:gap-20">
          <div className="w-full lg:w-1/2 p-4 sm:p-10">
            <img
              src={chefImage}
              alt="Chef Amanda"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 sm:p-10">
            <h3 className="font-playfair text-3xl sm:text-4xl text-left mb-5">
              {t("helloIAm")} <span className="text-red-500">{t("amanda")}</span>
            </h3>
            <p className="text-gray-600 leading-relaxed mt-4">
              {t("aboutHelloSub")}
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <HeroSection backgroundImage={heroImage} heading="" description="" />

      {/* Catering and Events Section */}
      <div className="container mx-auto py-16 px-4 sm:px-8">
        <div className="text-center">
          <h2 className={`${styles.heading_l} text-center mb-10`}>
            {t("aboutCateringAndEvents")}
          </h2>
          <p className="text-gray-600  leading-relaxed mt-4 text-center">
            {t("aboutCateringAndEventsSub")}
          </p>
        </div>

        {/* Image Grid Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <img
            src={cateringImage1}
            alt="Catering 1"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src={cateringImage2}
            alt="Catering 2"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src={cateringImage3}
            alt="Catering 3"
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src={cateringImage4}
            alt="Catering 4"
            className="w-full rounded-lg shadow-lg"
          />
        </section>
      </div>
      <RequestForm />
    </>
  );
};

export default About;
