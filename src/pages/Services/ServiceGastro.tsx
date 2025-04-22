import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import HeroSection from "../../components/Hero/Hero";
import FeatureSection from "../../components/Feature";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Cards/Cards";
import RequestForm from "../../components/RequestForm";
import WorkshopModal from "../../components/WorkshopModal";

import style from "../../components/Cards/Cards.module.css";

import img1 from "../../assets/slide-img-01.png";
import img2 from "../../assets/slide-img-02.png";
import img3 from "../../assets/slide-img-03.png";
import img4 from "../../assets/slide-img-04.png";
import img5 from "../../assets/slide-img-05.png";
import img6 from "../../assets/slide-img-06.png";
import coverImg from "../../assets/service-page-cover-image-gastro.jpeg";
import { LibraryBig, Clock, Gift, Waypoints } from "lucide-react";

// modal window img imports
import ancientGoatCheeseImg1 from "../../assets/gastro-ancient-header.jpg";
import ancientGoatCheeseImg2 from "../../assets/gastro-workshop1.png";
import ancientGoatCheeseImg3 from "../../assets/gastro-ancient-2.png";
import handmadeTurmericImg1 from "../../assets/gastro-handmade-header.jpg";
import handmadeTurmericImg2 from "../../assets/gastro-handmade-2.jpg";
import handmadeTurmericImg3 from "../../assets/gastro-handmade-3.jpg";
import traditionalWineDonutImg1 from "../../assets/gastro-traditional-header.jpg";
import traditionalWineDonutImg2 from "../../assets/gastro-traditional-2.jpg";
import traditionalWineDonutImg3 from "../../assets/gastro-workshop3.png";
import halloweenWorkshopImg1 from "../../assets/gastro-halloween-header.jpg";
import halloweenWorkshopImg2 from "../../assets/gastro-workshop4.jpg";
import customWorkshopImg1 from "../../assets/gastro-custom-header.jpg";
import customWorkshopImg2 from "../../assets/gastro-custom-2.jpg";
import customWorkshopImg3 from "../../assets/gastro-custom-3.png";

// cards
import workshopImg1 from "../../assets/gastro-workshop1.png";
import workshopImg2 from "../../assets/gastro-workshop2.png";
import workshopImg3 from "../../assets/gastro-workshop3.png";
import workshopImg4 from "../../assets/gastro-workshop4.jpg";
import workshopImg5 from "../../assets/gastro-workshop5.jpg";
import Details from "../../components/Details";
import Amanda from "../../assets/Amanda.jpg";
import Amanda2 from "../../assets/Amanda2.jpg";
import Goat from "../../assets/Goat.png";
import Handmade from "../../assets/Handmade.png";
import Donut from "../../assets/Donut.png";
import Halloween from "../../assets/Halloween.jpg";
import Custom from "../../assets/Custom.jpg";
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
    img3?: string; // halloween modal has only 1 bottom image
  };
}

const ServiceGastro = () => {
  const {t}=useTranslation();

  const features = [
    {
      icon: LibraryBig,
      title: t("practical"),
      subtitle: t("learning"),
    },
    {
      icon: Clock,
      title: t("creativity"),
      subtitle: t("experimentation"),
    },
    {
      icon: Gift,
      title: t("cultural"),
      subtitle: t("knowledge"),
    },
    {
      icon: Waypoints,
      title: t("social"),
      subtitle: t("experience"),
    },
  ];
  const services = [
    {
      title: t("goatCheese"),
      description: t("duration3hrsForAllAges"),
      imageUrl: Goat,
    },
    {
      title: t("handmadeTurmeric"),
      description: t("duration3hrsForAllAges"),
      imageUrl: Handmade,
    },
    {
      title: t("wineDonut"),
      description: t("duration3hrsForAllAges"),
      imageUrl: Donut,
    },
    {
      title: t("halloweenWorkshop"),
      description: t("itsFunCome"),
      imageUrl: Halloween,
    },
    {
      title: t("customYourWorkshop"),
      description: t("duration3hrsForAllAges"),
      imageUrl: Custom,
    },
  ];
  const images = [img1, img2, img3, img4, img5, img6];
  
  const workshops = [
    {
      title: "Ancient Goat Cheese",
      description: "Duration: 3hrs for all ages",
      imageUrl: workshopImg1,
    },
    {
      title: "Handmade Turmeric",
      description: "Duration: 3hrs for all ages",
      imageUrl: workshopImg2,
    },
    {
      title: "Traditional Wine Donut",
      description: "Duration: 3hrs for all ages",
      imageUrl: workshopImg3,
    },
    {
      title: "Halloween Workshop",
      description: "It's fun! Come and join us!",
      imageUrl: workshopImg4,
    },
    {
      title: "Customize Your Workshop",
      description: "Duration: 3hrs for all ages",
      imageUrl: workshopImg5,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [workshopModalData, setWorkshopModalData] = useState<ModalData>({
    heading: "",
    description: "",
    duration: "",
    time: "",
    age: "",
    group_size_required: "",
    what_it_includes: [],
    pricing: [],
    payment: "",
    reservation: "",
    imageUrls: {
      img1: "",
      img2: "",
      img3: "",
    },
  });

  const handleRequest = (service: string) => {
    console.log(`Request sent for ${service}`);

    let modalData: ModalData = workshopModalData;

    if (service === "Ancient Goat Cheese" || service === "Queso de Cabra Antiguo") {
      modalData = {
        heading: t("goatCheeseWorkshop"),
        description: t("goatCheeseWorkshopDesc"),
        duration: t("3hours"),
        time: t("mondayFriday9am8pm"),
        age: t("agesForAdultsAndChildren"),
        group_size_required: t("minGoatCheeseGroupSize"),
        what_it_includes: [
          t("twoDrinks"),
          t("customizedWorkshops"),
          t("expertHandsOn"),
          t("interpreterServices"),
          t("uniqueExperiences"),
        ],
        pricing: [
          t("workshopFee"),
          t("interpreterServiceCost"),
        ],
        payment: t("secureYourBooking"),
        reservation:
          t("submitYourRequest"),
        imageUrls: {
          img1: ancientGoatCheeseImg1,
          img2: ancientGoatCheeseImg2,
          img3: ancientGoatCheeseImg3,
        },
      };
    } else if (service === "Handmade Turmeric" || service === "Cúrcuma Hecha a Mano") {
      modalData = {
        heading: t("turmericWorkshop"),
        description: t("turmericWorkshopDesc"),
        duration: t("3hours"),
        time: t("mondayFriday9am8pm"),
        age: t("agesForAdultsAndChildren"),
        group_size_required: t("minGoatCheeseGroupSize"),
        what_it_includes: [
          t("twoDrinks"),
          t("customizedWorkshops"),
          t("expertHandsOn"),
          t("interpreterServices"),
          t("uniqueExperiences"),
        ],
        pricing: [
          t("workshopFee"),
          t("interpreterServiceCost"),
        ],
        payment: t("secureYourBooking"),
        reservation: t("submitYourRequest"),
        imageUrls: {
          img1: handmadeTurmericImg1,
          img2: handmadeTurmericImg2,
          img3: handmadeTurmericImg3,
        },
      };
    } else if (service === "Traditional Wine Donut" || service === "Rosco de Vino Tradicional") {
      modalData = {
        heading: t("wineDonutWorkshop"),
        description: t("wineDonutWorkshopDesc"),
        duration: t("3hours"),
        time: t("mondayFriday9am8pm"),
        age: t("agesForAdultsAndChildren"),
        group_size_required: t("minGoatCheeseGroupSize"),
        what_it_includes: [
          t("twoDrinks"),
          t("customizedWorkshops"),
          t("expertHandsOn"),
          t("interpreterServices"),
          t("uniqueExperiences"),
        ],
        pricing: [
          t("workshopFee"),
          t("interpreterServiceCost"),
        ],
        payment: t("secureYourBooking"),
        reservation: t("submitYourRequest"),
        imageUrls: {
          img1: traditionalWineDonutImg1,
          img2: traditionalWineDonutImg2,
          img3: traditionalWineDonutImg3,
        },
      };
    } else if (service === "Customize Your Workshop" || service === "Personaliza Tu Taller") {
      modalData = {
        heading: t("designYourGroupWorkshop"),
        description: t("designYourGroupWorkshopDesc"),
        duration: t("3hours"),
        time: t("mondayFriday9am8pm"),
        age: t("agesForAdultsAndChildren"),
        group_size_required: t("minGoatCheeseGroupSize"),
        what_it_includes: [
          t("twoDrinks"),
          t("customizedWorkshops"),
          t("expertHandsOn"),
          t("interpreterServices"),
          t("uniqueExperiences"),
        ],
        pricing: [
          t("workshopFee"),
          t("interpreterServiceCost"),
        ],
        payment: t("secureYourBooking"),
        reservation: t("submitYourRequest"),
        imageUrls: {
          img1: customWorkshopImg1,
          img2: customWorkshopImg2,
          img3: customWorkshopImg3,
        },
      };
    } else if (service === "Halloween Workshop" || service === "Taller de Halloween") {
      modalData = {
        heading: t("halloweenWorkshop"),
        description: t("halloweenWorkshopDesc"),
        duration: t("3hours"),
        time: t("mondayFriday9am8pm"),
        age: t("ages4to18"),
        group_size_required: t("min10Participants"),
        what_it_includes: [
          t("twoDrinks"),
          t("customizedWorkshops"),
          t("expertHandsOn"),
          t("interpreterServices"),
          t("uniqueExperiences"),
        ],
        pricing: [
          t("workshopFee"),
        ],
        payment: t("secureYourBooking"),
        reservation: t("advanceReservation"),
        imageUrls: {
          img1: halloweenWorkshopImg1,
          img2: halloweenWorkshopImg2,
        },
      };
    }

    setWorkshopModalData(modalData);
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
        heading={t("gastronomicWorkshop")}
        description={t("gastronomicSub")}
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
        title={t("discoverGastronomicTitle")}
        description={t("discoverGastronomicSub")}
      />

      <Carousel images={images} />
      <div className="container max-w-[1120px] mx-auto px-0 py-0">
        <FeatureSection
          heading={t("whatYouGainTitle")}
          features={features}
        />
      </div>

      <section className="container mx-auto py-16">
  {/* First Section */}
  <div className="flex flex-col md:flex-row justify-between items-center py-10 w-full px-8 md:px-32 gap-10 md:gap-20">
    <div className="w-full md:w-1/2 p-10">
      <h2 className="font-playfair text-3xl md:text-4xl text-left mb-5">
        {t("ourOfferings")}
      </h2>
      <ul className="list-disc font-quicksand text-lg md:text-2xl">
        <li>{t("twoDrinks")}</li>
        <li>{t("customizedWorkshops")}</li>
        <li>{t("expertHandsOn")}</li>
        <li>{t("interpreterServices")}</li>
        <li>{t("uniqueExperiences")}</li>
      </ul>
    </div>
    <div className="w-full md:w-1/2">
      <img src={Amanda} alt="" className="w-full rounded-lg" />
    </div>
  </div>

  {/* Second Section */}
  <div className="flex flex-col md:flex-row justify-between items-center py-10 w-full px-8 md:px-32 gap-10 md:gap-20">
    <div className="w-full md:w-1/2">
      <img src={Amanda2} alt="" className="w-full rounded-lg" />
    </div>
    <div className="w-full md:w-1/2 p-5">
      <div className="py-3">
        <h2 className="font-playfair text-3xl md:text-4xl text-left mb-5">
          {t("timeAndDuration")}
        </h2>
        <ul className="list-disc font-quicksand text-lg md:text-2xl">
          <li>{t("daysMonToFri")}</li>
          <li>{t("time9to8pm")}</li>
          <li>{t("3hrsPerWorkshop")}</li>
        </ul>
      </div>
      <div className="py-3">
        <h2 className="font-playfair text-3xl md:text-4xl text-left mb-5">
          {t("participants")}
        </h2>
        <ul className="list-disc font-quicksand text-lg md:text-2xl">
          <li>{t("adultWorkshops")}</li>
          <li>{t("childrenWorkshop")}</li>
          <li>{t("minGroupSize")}</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Third Section */}
  <div className="flex flex-col md:flex-row justify-between items-center py-10 w-full px-8 md:px-32 gap-10 md:gap-20">
    <div className="w-full md:w-1/2 p-5">
      <h2 className="font-playfair text-3xl md:text-4xl text-left mb-5">
        {t("pricingAndReservation")}
      </h2>
      <span className="text-lg md:text-2xl font-semibold">{t("pricing")}</span>
      <ul className="list-disc font-quicksand text-lg md:text-2xl">
        <li>{t("workshopFee")}</li>
        <li>{t("interpreterServiceCost")}</li>
      </ul>
      <br />
      <span className="text-lg md:text-2xl font-semibold">{t("payment")}</span>
      <p className="font-quicksand">
        {t("secureYourBooking")}
      </p>
      <br />
      <span className="text-lg md:text-2xl font-semibold">{t("reservation")}</span>
      <p className="font-quicksand">
        {t("submitYourRequest")}
      </p>
    </div>
    <div className="w-full md:w-1/2">
      <img src={Amanda} alt="" className="w-full rounded-lg" />
    </div>
  </div>
</section>

      <div className="container max-w-[1120px] mx-auto px-0 py-12">
        <h2 className="heading__secondary">{t("exploreOurGastronomic")}</h2>
        <div className={style.serviceContainer}>
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              buttonLabel={t("sendARequest")}
              onClick={() => handleRequest(service.title)}
              services={workshops}
            />
          ))}
        </div>
        <WorkshopModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          workshopModalData={workshopModalData}
        />
      </div>
      <div ref={requestFormRef}>
        <RequestForm />
      </div>
    </>
  );
};

export default ServiceGastro;
