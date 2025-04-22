import React from "react";
import RequestForm from "../components/RequestForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface WorkshopModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  workshopModalData: {
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
  };
}

const WorkshopModal: React.FC<WorkshopModalProps> = ({
  isOpen,
  setIsOpen,
  workshopModalData,
}) => {
  const {t}=useTranslation();
  // make body unscrollable when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const {
    heading,
    description,
    duration,
    time,
    age,
    group_size_required,
    what_it_includes,
    pricing,
    payment,
    reservation,
    imageUrls,
  } = workshopModalData;

  const handleBackgroundClick = () => {
    setIsOpen(false);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from reaching the background
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex justify-center items-start overflow-y-auto z-10 bg-black bg-opacity-50 font-xl"
    >
      <div
        onClick={handleContentClick}
        className="max-w-[1340px]  w-4/5 bg-white relative mt-10 mb-10"
      >
        {/* Image at the top */}
        <div className="w-full h-[670px]">
          <img
            src={imageUrls.img1}
            alt="Workshop Header"
            className="w-full max-h-[670px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-[10%]">
          <section className="max-w-[1000px]">
            <h2 className="heading__secondary">{heading}</h2>
            <p className="text-center">{description}</p>
          </section>
          <section className="max-w-[1000px]">
            <h2 className="heading__secondary">{t("details")}</h2>
            <p>
              <span className="font-bold">{t("duration")}: </span>
              <span className="">{duration}</span>
            </p>
            <p>
              <span className="font-bold">{t("time")}: </span>
              <span className="">{time}</span>
            </p>
            <p>
              <span className="font-bold">{t("age")}: </span>
              <span className="">{age}</span>
            </p>
            <p>
              <span className="font-bold">{t("groupSizeReq")}: </span>
              <span className="">{group_size_required}</span>
            </p>
            <br></br>
            <p className="font-bold">{t("whatItIncludes")}:</p>
            <ul className="list-disc list-inside">
              {what_it_includes.map((item, index) => (
                <li key={index} className="font-light text-2xl">
                  {item}
                </li>
              ))}
            </ul>
            <br></br>
            <p className="font-bold">{t("pricing")}</p>
            <ul className="list-disc list-inside">
              {pricing.map((item, index) => (
                <li key={index} className="font-light text-2xl">
                  {item}
                </li>
              ))}
            </ul>
            <br></br>
            <p>
              <span className="font-bold">{t("payment")} </span>
              <span className="">{payment}</span>
            </p>
            <br></br>
            <p>
              <span className="font-bold">{t("reservation")} </span>
              <span className="">{reservation}</span>
            </p>
          </section>
          <section className="flex justify-between gap-[10%] mt-40">
            <div
              className={`flex flex-col ${!imageUrls.img3 ? "justify-center max-w-[440px]" : "*:max-h-[433px] gap-20 mt-14 max-w-[380px]"}`}
            >
              <img src={imageUrls.img2} alt="Photo" />
              {imageUrls.img3 && <img src={imageUrls.img3} alt="Photo" />}
            </div>
            <div className="flex flex-col max-w-[660px]">
              <div className="[&>div>div]:bg-transparent">
                <RequestForm haveBg={false} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkshopModal;
