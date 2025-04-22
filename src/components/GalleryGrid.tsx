import React from "react";
import ImageCard from "./ImageCard";
import styles from "../pages/Gallery/Gallery.module.css"

import img1_1 from "../assets/1-1.jpeg";
import img1_2 from "../assets/1-2.jpeg";
import img1_3 from "../assets/1-3.jpeg";
import img1_4 from "../assets/1-4.jpeg";
import img1_5 from "../assets/1-5.jpeg";
import img2_1 from "../assets/2-1.jpeg";
import img2_2 from "../assets/2-2.jpeg";
import img2_3 from "../assets/2-3.jpeg";
import img2_4 from "../assets/2-4.jpeg";
import img2_5 from "../assets/2-5.jpeg";
import img3_1 from "../assets/3-1.jpeg";
import img3_2 from "../assets/3-2.jpeg";
import img3_3 from "../assets/3-3.jpeg";
import img3_4 from "../assets/3-4.jpeg";
import img4_1 from "../assets/4-1.jpeg";
import img4_2 from "../assets/4-2.jpeg";
import img4_3 from "../assets/4-3.png";
import img5_1 from "../assets/5-1.jpg";
import img5_2 from "../assets/5-2.png";
import img6_1 from "../assets/6-1.jpg";
import img6_2 from "../assets/6-2.webp";
import img6_3 from "../assets/6-3.jpg";
import img6_4 from "../assets/6-4.jpg";
import img7_1 from "../assets/7-1.jpeg";
import img7_2 from "../assets/7-2.jpeg";
import img7_3 from "../assets/7-3.jpeg";
import img7_4 from "../assets/7-4.jpg";
import img8_1 from "../assets/8-1.png";
import img8_2 from "../assets/8-2.png";
import img9_1 from "../assets/9-1.jpeg";
import img9_2 from "../assets/9-2.png";
import img9_3 from "../assets/9-3.png";
import img9_4 from "../assets/9-4.png";
import img10_1 from "../assets/10-1.jpg";
import img10_2 from "../assets/10-2.jpg";
import img10_3 from "../assets/10-3.jpg";
import img10_4 from "../assets/10-4.jpg";
import img10_5 from "../assets/10-5.jpg";
import img11_1 from "../assets/11-1.jpg";
import img11_2 from "../assets/11-2.jpg";
import img11_3 from "../assets/11-3.png";
// Add other image imports as needed

const images = [
  { src: img1_1, alt: "Image 1" },
  { src: img1_2, alt: "Image 2" },
  { src: img1_3, alt: "Image 3" },
  { src: img1_4, alt: "Image 4" },
  { src: img1_5, alt: "Image 5" },
  { src: img2_1, alt: "Image 6" },
  { src: img2_2, alt: "Image 7" },
  { src: img2_3, alt: "Image 8" },
  { src: img2_4, alt: "Image 9" },
  { src: img2_5, alt: "Image 10" },
  { src: img3_1, alt: "Image 11" },
  { src: img3_2, alt: "Image 12" },
  { src: img3_3, alt: "Image 13" },
  { src: img3_4, alt: "Image 14" },
  { src: img4_1, alt: "Image 15" },
  { src: img4_2, alt: "Image 16" },
  { src: img4_3, alt: "Image 17" },
  { src: img5_1, alt: "Image 18" },
  { src: img5_2, alt: "Image 19" },
  { src: img6_1, alt: "Image 20" },
  { src: img6_2, alt: "Image 21" },
  { src: img6_3, alt: "Image 22" },
  { src: img6_4, alt: "Image 23" },
  { src: img7_1, alt: "Image 24" },
  { src: img7_2, alt: "Image 25" },
  { src: img7_3, alt: "Image 26" },
  { src: img7_4, alt: "Image 27" },
  { src: img8_1, alt: "Image 28" },
  { src: img8_2, alt: "Image 29" },
  { src: img9_1, alt: "Image 30" },
  { src: img9_2, alt: "Image 31" },
  { src: img9_3, alt: "Image 32" },
  { src: img9_4, alt: "Image 33" },
  { src: img10_1, alt: "Image 34" },
  { src: img10_2, alt: "Image 35" },
  { src: img10_3, alt: "Image 36" },
  { src: img10_4, alt: "Image 37" },
  { src: img10_5, alt: "Image 38" },
  { src: img11_1, alt: "Image 39" },
  { src: img11_2, alt: "Image 40" },
  { src: img11_3, alt: "Image 41" },
  // Add more image objects here if necessary
];

const GalleryGrid: React.FC = () => {
  return (
    <div className={styles.galleryGrid}>
      {images.map((image, index) => (
        <ImageCard key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default GalleryGrid;
