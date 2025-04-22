import React, { useRef } from "react";
import HeroSection from "../../components/Hero/Hero";
import Details from "../../components/Details";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Cards/Cards";
import { Testimonials } from "../../components/Testimonials";
import RequestForm from "../../components/RequestForm";
import FeatureSection from "../../components/Feature";

import style from "../../components/Cards/Cards.module.css";

import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/4-2.jpeg";
import image5 from "../../assets/catering3-2.jpeg";
import image6 from "../../assets/11-1.jpg";
import image7 from "../../assets/catering3-3.jpeg";
import image8 from "../../assets/catering2-2.jpeg";
import image9 from "../../assets/catering1-5.jpeg";
import privateChef from "../../assets/privateChef.jpeg";
import dailyService from "../../assets/dailyService.jpg";
import gastronomicService from "../../assets/gastronomicService.jpg";
import birthdayService from "../../assets/8-1.png";
import privateEventService from "../../assets/privateEventService.jpeg";
import { Users, ChefHat, UtensilsCrossed, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import Feedback from "../../components/Feedback";

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Users,
      title: t("gastronomicWorkshop1"),
      subtitle: t("gastronomicWorkshop2"),
    },
    {
      icon: ChefHat,
      title: t("creativeBirthdayWorkshop1"),
      subtitle: t("creativeBirthdayWorkshop2"),
    },
    {
      icon: UtensilsCrossed,
      title: t("customizedMenus1"),
      subtitle: t("customizedMenus2"),
    },
    {
      icon: Heart,
      title: t("authenticFood1"),
      subtitle: t("authenticFood2"),
    },
  ];
  const services = [
    {
      title: t("gastronomicWorkshop"),
      description: t("gastronomicServiceDescription"),
      imageUrl: gastronomicService,
      link: "/gastronomic",
    },
    {
      title: t("birthdayWorkshop"),
      description: t("birthdayServiceDescription"),
      imageUrl: birthdayService,
      link: "/birthday",
    },
    {
      title: t("dailyService"),
      description: t("dailyServiceDescription"),
      imageUrl: dailyService,
      link: "/daily",
    },
    {
      title: t("privateEventCatering"),
      description: t("privateEventServiceDescription"),
      imageUrl: privateEventService,
      link: "/catering",
    },
    {
      title: t("privateChefService"),
      description: t("privateChefDescription"),
      imageUrl: privateChef,
      link: "/chef",
    },
  ];
  
  const imageUrls = [
    image1,
    image2,
    image3,
    image4,
    image5,
    privateChef,
    image6,
    image7,
    image8,
    image9,
  ];

  const handleRequest = (service: string) => {
    console.log(`Request sent for ${service}`);
  };

  const requestFormRef = useRef<HTMLDivElement>(null);
    const scrollToRequestForm = () => {
      requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <>
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop"
        heading={t("welcomeMessage")}
        description={t("heroDescription")}
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
        title={t("aFewWordsAboutUs")}
        description={t("aboutUsDescription")}
      />
      <Carousel images={imageUrls} />
      <div className="container max-w-[1120px] mx-auto px-0 py-0">
        <FeatureSection
          heading={t("whyChooseTitle")}
          features={features}
        />
      </div>
      <div className="container max-w-[1120px] mx-auto px-0 py-20">
        <h2 className="heading__secondary">{t("exploreServices")}</h2>
        <div className={style.serviceContainer}>
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              buttonLabel={t("sendARequest")}
              onClick={() => handleRequest(service.title)}
              services={[]}
              link={service.link}
            />
          ))}
        </div>
      </div>
      <Testimonials />
      <div ref={requestFormRef}>
        <RequestForm />
      </div>
      <Feedback />
    </>
  );
};

export default Home;
