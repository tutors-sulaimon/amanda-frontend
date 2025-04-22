import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.css";

interface service {
  title: string;
  description: string;
  imageUrl: string;
}
interface CardProps extends service {
  buttonLabel: string;
  onClick: () => void;
  services: service[];
  link?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  buttonLabel,
  onClick,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.cardContainer} ${isHovered ? styles.cardContainerHovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} className={styles.cardImg} />
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className="p-6">
      {link ? (
          <Link to={link} className="w-full">
            <button
              className={`${styles.cardButton} ${isHovered ? styles.hovered : ""}`}
              onClick={onClick}
            >
              {buttonLabel}
            </button>
          </Link>
        ) : (
          <button
            className={`${styles.cardButton} ${isHovered ? styles.hovered : ""}`}
            onClick={onClick}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
