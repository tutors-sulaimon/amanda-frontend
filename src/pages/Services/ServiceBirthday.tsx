import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import style from "../../components/Cards/Cards.module.css";
import gastronomicService from "../../assets/gastronomicService.jpg";

import HeroSection from "../../components/Hero/Hero";
import RequestForm from "../../components/RequestForm";
import coverImg from "../../assets/birthday-cover.png";
import Carousel from "../../components/Carousel/Carousel";
import img1 from "../../assets/slide-img-01.png";
import img2 from "../../assets/slide-img-02.png";
import img3 from "../../assets/slide-img-03.png";
import img4 from "../../assets/slide-img-04.png";
import img5 from "../../assets/slide-img-05.png";
import img6 from "../../assets/slide-img-06.png";
import { FerrisWheel, Clock, Utensils, HandPlatter } from "lucide-react";
import FeatureSection from "../../components/Feature";
import Card from "../../components/Cards/Cards";
import WorkshopModal from "../../components/WorkshopModal";
import workshopImg1 from "../../assets/birthday-workshop-header.jpg";
import workshopImg2 from "../../assets/birthday-workshop-2.png";
import workshopImg3 from "../../assets/birthday-workshop-3.png";
import Details from "../../components/Details";
import Slider from "../../components/Slider";
import Amanda from "../../assets/Amanda.jpg";
import Amanda3 from "../../assets/Amanda3.png";

interface ModalData {
  heading: string;
  description: string;
  duration: string;
  time: string;
  age: string;
  group_size_required: string;
  what_it_includes: string[];
  pricing: string[];
  payment: string;
  reservation: string;
  imageUrls: {
    img1: string;
    img2: string;
    img3?: string;
  };
}

const images = [img1, img2, img3, img4, img5, img6];

const ServiceBirthday = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const { t } = useTranslation();

  const features = [
    {
      icon: FerrisWheel,
      title: t("inclusive"),
      subtitle: t("fun"),
    },
    {
      icon: Clock,
      title: t("tailored"),
      subtitle: t("yourChild"),
    },
    {
      icon: Utensils,
      title: t("foodFriends"),
      subtitle: t("happyLearning"),
    },
    {
      icon: HandPlatter,
      title: t("stressFree"),
      subtitle: t("forParents"),
    },
  ];

  const services = [
    {
      title: t("birthdayWorkshop"),
      description: t("birthdayServiceDescription"),
      imageUrl: gastronomicService,
    },
  ];

  const workshops = [
    {
      title: t("birthdayWorkshop"),
      description: t("birthdayServiceDescription"),
      imageUrl: workshopImg1,
    },
  ];

  const workshopModalData: ModalData = {
    heading: t("birthdayWorkshop"),
    description: t("celebrateBirthdays"),
    duration: t("3hours"),
    time: t("mondayFriday9am8pm"),
    age: t("minAge"),
    group_size_required: t("minBirthdayWorkshopGroupSize"),
    what_it_includes: [
      t("healthyCanapes"),
      t("tailoredToHonorees"),
      t("customBirthdayCake"),
      t("drinksIncluded"),
    ],
    pricing: [
      t("workshopFee"),
      t("ParticipantsAreChildren"),
    ],
    payment:
      t("secureYourBooking"),
    reservation:
      t("advanceReservation"),
    imageUrls: {
      img1: workshopImg1,
      img2: workshopImg2,
      img3: workshopImg3,
    },
  };

  const handleRequest = (service: string) => {
    console.log(`Request sent for ${service}`);
    setModalData(workshopModalData);
    setIsOpen(true);
  };

  const requestFormRef = useRef<HTMLDivElement>(null);
  const scrollToRequestForm = () => {
    requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroSection
        backgroundImage={coverImg}
        heading={t("birthdayWorkshop")}
        description={t("birthdayWorkshopDesc")}
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
        title={t("unforgettableBirthday")}
        description={t("unforgettableBirthdayDesc")}
      />
      <Carousel images={images} />
      <div className="container max-w-[11120px] px-0 py-10">
        <FeatureSection heading={t("whyKidsAndParents")} features={features} />
      </div>

      <section className="container mx-auto py-16 px-5">
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto py-10 w-full md:px-16 gap-10">
          <div className="w-full md:w-1/2 p-10">
            <h2 className="font-playfair text-4xl text-left mb-5">
              {t("ourOfferings")}
            </h2>
            <ul className="list-disc font-quicksand text-2xl md:text-2xl">
              <li>{t("healthyCanapes")}</li>
              <li>{t("tailoredToHonorees")}</li>
              <li>{t("customBirthdayCake")}</li>
              <li>{t("drinksIncluded")}</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img src={Amanda} alt="" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
      </section>

      <div className="container max-w-[1120px] mx-auto px-0 py-0">
        <h2 className="heading__secondary">{t("bookOurBirthday")}</h2>
        <div className={style["serviceContainer"]}>
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={Amanda3}
              buttonLabel={t("sendARequest")}
              onClick={() => handleRequest(service.title)}
              services={workshops}
            />
          ))}
        </div>
        {modalData && (
          <WorkshopModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            workshopModalData={modalData}
          />
        )}
      </div>

      <Details title={t("whatTheyAreSaying")} description="" />
      <Slider />
      <div ref={requestFormRef}>
        <RequestForm />
      </div>
    </>
  );
};

export default ServiceBirthday;
