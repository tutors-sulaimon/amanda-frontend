import { useTranslation } from "react-i18next";
import { useRef } from "react";

import HeroSection from "../../components/Hero/Hero";
import RequestForm from "../../components/RequestForm";
import Carousel from "../../components/Carousel/Carousel";
import Details from "../../components/Details";
import MenuCard from "../../components/MenuCard";

import coverImg from "../../assets/daily-cover.png";
import img1 from "../../assets/slide-img-01.png";
import img2 from "../../assets/slide-img-02.png";
import img3 from "../../assets/slide-img-03.png";
import img4 from "../../assets/slide-img-04.png";
import img5 from "../../assets/slide-img-05.png";
import img6 from "../../assets/slide-img-06.png";
import img7 from "../../assets/dailyService01.jpg";

// Menu Image
import sandwich from "../../assets/menu-sandwich.png";
import comidas from "../../assets/menu-barbodos.png";
import croissants from "../../assets/menu-Croissants.png";
import bocadillos from "../../assets/menu-Bocadillos.png";
import bebidas from "../../assets/menu-Bebidas.png";
import vegetariano from "../../assets/menu-Vegetariano.png";
import catering from "../../assets/menu-catering.png";

const images = [img1, img2, img3, img4, img5, img6, img7];

const ServiceDaily = () => {
  const {t}=useTranslation();

  const menus = [
    {
      name: t("sandwich"),
      photo: sandwich,
    },
    {
      name: t("foods"),
      photo: comidas,
    },
    {
      name:t("stuffedCroissants"),
      photo: croissants,
    },
    {
      name: t("snacks"),
      photo: bocadillos,
    },
    {
      name: t("drinks"),
      photo: bebidas,
    },
    {
      name: t("vegetarian"),
      photo: vegetariano,
    },
    {
      name: t("catering"),
      photo: catering,
    },
  ];

  const requestFormRef = useRef<HTMLDivElement>(null);
      const scrollToRequestForm = () => {
        requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
      };

  return (
    <>
      <HeroSection
        backgroundImage={coverImg}
        heading={t("dailyServices")}
        description={t("enjoyDailyBreakfast")}
        buttons={[
          {
            label: t("sendARequest"),
            onClick: scrollToRequestForm,
          },
          {
            label: t("viewMenu"),
            onClick: () => console.log("View Menu Clicked"),
            link: "/menu",
          },
        ]}
      />
      <Details
        title={t("deliciousDailyBites")}
        description={t("discoverOurDailyService")}
      />

      <Carousel images={images} />
      <Details
        title={t("everyFlavorTellsAStory")}
        description={t("indulgeInACurated")}
      />
      <div className="container mx-auto py-10 px-9 md:px-48">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10">
          {menus.map((menu, index) => (
            <MenuCard
              key={index}
              imgUrl={menu.photo}
              menu={menu.name}
              link={t("viewMenu")}
            />
          ))}
        </div>
      </div>
      <div ref={requestFormRef}>
        <RequestForm />
      </div>
    </>
  );
};

export default ServiceDaily;
