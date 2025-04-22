import React from "react";
import styles from "../../components/Hero/Hero.module.css";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  heading: string;
  description: string;
  buttons?: Array<{ label: string; onClick: () => void; link?: string }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  backgroundVideo,
  heading,
  description,
  buttons,
}) => {
  return (
    <section
      className={`relative h-[70vh] bg-cover bg-center flex items-center justify-center`}
      style={{
        backgroundImage: backgroundVideo
          ? undefined
          : `url(${backgroundImage})`,
      }}
    >
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      <div className={`${styles.heroContent} text-center text-white z-10`}>
        <h1 className="heading__primary">{heading}</h1>
        <p className={`${styles.body1}`}>{description}</p>
        <div>
        {buttons?.map((button, index) =>
            button.link ? (
              <Link
                key={index}
                to={button.link}
                className={`${
                  index === 0 ? styles.ctaButton : styles.ctaButton2
                }`}
              >
                {button.label}
              </Link>
            ) : (
              <button
                key={index}
                className={`${
                  index === 0 ? styles.ctaButton : styles.ctaButton2
                }`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            )
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  );
};

export default HeroSection;
