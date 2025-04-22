import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import styles from "../../components/Carousel/Carousel.module.css";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const prevRef = useRef<HTMLButtonElement>(null); // Ref for previous button
  const nextRef = useRef<HTMLButtonElement>(null); // Ref for next button
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null); // Swiper instance
  const [activeIndex, setActiveIndex] = useState(0); // Active slide index

  // Automatic image rotation every 3 seconds
  useEffect(() => {
    if (swiperInstance) {
      const interval = setInterval(() => {
        swiperInstance.slideNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [swiperInstance]);

  // Update active index when slide changes
  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        onSlideChange={handleSlideChange}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 }, // 1 slide on small screens
          800: { slidesPerView: 2 }, // 2 slides on medium screens
          1200: { slidesPerView: 3 }, // 3 slides on larger screens
        }}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index} className={styles.card}>
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className={styles.cardImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className={`${styles.arrowButton} ${styles.prevButton}`}
        aria-label="Previous"
      >
        &#x276E;
      </button>
      <button
        ref={nextRef}
        className={`${styles.arrowButton} ${styles.nextButton}`}
        aria-label="Next"
      >
        &#x276F;
      </button>

      {/* Pagination Dots */}
      <div className={styles.paginationContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.pageDot} ${
              index === activeIndex ? styles.activeDot : ""
            }`}
            onClick={() => swiperInstance?.slideTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
