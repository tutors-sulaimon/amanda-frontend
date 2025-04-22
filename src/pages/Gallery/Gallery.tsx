import React from "react";
import GalleryGrid from "../../components/GalleryGrid";
import styles from "../Gallery/Gallery.module.css";
import { useTranslation } from "react-i18next";

const Gallery: React.FC = () => {
  const {t}=useTranslation();
  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.galleryTitle}>{t("gallery")}</h1>
      <GalleryGrid />
    </div>
  );
};

export default Gallery;
