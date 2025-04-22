import { useTranslation } from "react-i18next";
import { useRef } from "react";
import HeroSection from "../../components/Hero/Hero";
import RequestForm from "../../components/RequestForm";
import coverImg from "../../assets/chef-cover.png";
import Carousel from "../../components/Carousel/Carousel";
import img1 from "../../assets/slide-img-01.png";
import img2 from "../../assets/slide-img-02.png";
import img3 from "../../assets/slide-img-03.png";
import img4 from "../../assets/slide-img-04.png";
import img5 from "../../assets/slide-img-05.png";
import img6 from "../../assets/slide-img-06.png";

import FeatureImage01 from "../../assets/2-3.jpeg";
import FeatureImage02 from "../../assets/2-4.jpeg";
import Details from "../../components/Details";
import Slider from "../../components/Slider";

const images = [img1, img2, img3, img4, img5, img6];

const ServiceChef = () => {
  const {t}=useTranslation();

  const requestFormRef = useRef<HTMLDivElement>(null);
    const scrollToRequestForm = () => {
      requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
  return (
    <>
      <HeroSection
        backgroundImage={coverImg}
        heading={t("privateChefService")}
        description={t("pChefPageDescription")}
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
        title={t("pChefAtHome")}
        description={t("discoverTastes")}
      />

      <div className="flex justify-center items-center w-full">
        <Carousel images={images} />
      </div>
      <section className="container mx-auto py-16 px-5">
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto py-10 w-full md:px-16 gap-10">
          <div className="w-full md:w-1/2 p-10">
            <h2 className="font-playfair text-4xl text-left mb-5">
              {t("ourOfferings")}
            </h2>
            <ul className="list-disc font-quicksand text-2xl md:text-3xl">
              <li>{t("tastingCanapes")}</li>
              <li>{t("mainCourseMediterranean")}</li>
              <li>{t("homemadeDessert")}</li>
            </ul>
            <p className="font-quicksand pt-10 text-xl md:text-2xl">
              {t("submitYourRequest")}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={FeatureImage01} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto py-10 w-full md:px-16 gap-24">
          <div className="w-full md:w-1/2">
            <img src={FeatureImage02} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-playfair text-4xl text-left mb-5">
              {t("pricingAndPayment")}
            </h2>
            <div className="py-3">
              <span className="text-3xl font-semibold">
              {t("pricingForGroupBookings")}
              </span>
              <ul className="list-disc font-quicksand text-xl md:text-2xl px-5">
                <li>{t("groupOf4Price")}</li>
                <li>{t("groupOf6Price")}</li>
                <li>{t("groupOf10Price")}</li>
              </ul>
            </div>
            <div className="py-3">
              <span className="text-3xl font-semibold">{t("additionalFees")}</span>
              <ul className="list-disc font-quicksand text-xl md:text-2xl px-5">
                <li>{t("chefsFee")}</li>
                <li>{t("chefsAssistant")}</li>
                <li>{t("transportFee")}</li>
              </ul>
            </div>
            <div className="py-3">
              <span className="text-3xl font-semibold">{t("payment")}</span>
              <p className="py-3 font-quicksand text-1xl md:text-3xl">
                {t("secureYourBooking")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Details title={t("whatOurClientsSay")} description="" />
      <Slider />
      <div ref={requestFormRef}>
        <RequestForm />
      </div>
    </>
  );
};

export default ServiceChef;
