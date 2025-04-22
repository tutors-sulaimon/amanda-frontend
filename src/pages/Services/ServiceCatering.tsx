import styles from "./Services.module.css";

import Carousel from "../../components/Carousel/Carousel";
import img1 from "../../assets/privateEventService01.jpg";
import img2 from "../../assets/privateEventService02.jpg";
import img3 from "../../assets/privateEventService03.jpg";
import img4 from "../../assets/privateEventService04.jpg";
import img5 from "../../assets/privateEventService05.jpg";
import img6 from "../../assets/privateEventService06.jpg";
import img7 from "../../assets/privateEventService07.jpg";
import RequestForm from "../../components/RequestForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import HeroSection from "../../components/Hero/Hero";
import Details from "../../components/Details";
import Amanda from "../../assets/Amanda.jpg";
import Amanda2 from "../../assets/Amanda2.jpg";
import Catering from "../../assets/Catering.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const ServiceCatering = () => {
  const {t}=useTranslation();
  const handleClick = () => {
    const form = document.getElementById("form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

  const requestFormRef = useRef<HTMLDivElement>(null);
    const scrollToRequestForm = () => {
      requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
  return (
    <>
      <HeroSection
        backgroundImage={Catering}
        heading={t("privateEventCatering")}
        description={t("privateCateringDesc")}
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
        title= {t("makeYourPrivateEvent")}
        description={t("makeYourPrivateEventDesc")}
      />

      <Carousel images={images} />

      <section className="container mx-auto py-16 px-5">
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto py-10 w-full md:px-16 gap-10">
          <div className="w-full md:w-1/2 p-5">
            <h2 className="font-playfair text-4xl text-left mb-5">
              {t("ourOfferings")}
            </h2>
            <p className="pb-6">
              {t("includesFullService")}
              <br></br>
              <br></br>
              {t("minOf15Guests")}
            </p>
            <Link to="/menu" className={`${styles.view__menu}`}>
              {t("viewMenuCAPS")}
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img src={Amanda} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mx-auto py-10 w-full md:px-16 gap-10">
          <div className="w-full md:w-1/2">
            <img src={Amanda2} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-5">
            <h2 className="font-playfair text-4xl text-left mb-5">
              {t("pricingAndReservation")}
            </h2>
            <p className="pb-6">
              {t("tastingMenuRanges")}
              <br></br>
              <br></br>
              {t("secureYourBooking")}
              <br></br>
              <br></br>
              {t("submitYourRequest")}
            </p>
            <Link to="/menu" className={`${styles.view__menu}`}>
            {t("viewMenuCAPS")}
            </Link>
          </div>
        </div>
      </section>
      <div ref={requestFormRef}>
  <RequestForm />
</div>
    </>
  );
};

export default ServiceCatering;
