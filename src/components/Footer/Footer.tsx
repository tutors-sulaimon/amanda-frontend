import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "../../components/Footer/Footer.module.css";
import FooterImage from "../../assets/FooterImage.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h3 className={styles.header}>{t("contactUs")}</h3>
          <p className={styles.text}>{t("footerAddress")}</p>
          <p className={styles.text}>{t("footerPhone")}</p>
          <p className={styles.text}>{t("footerEmail")}</p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Facebook">
              <i className={`fab fa-facebook-f ${styles.icon}`}></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Instagram">
              <i className={`fab fa-instagram ${styles.icon}`}></i>
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <h4 className={styles.header}>{t("footerQuickLinks")}</h4>
          <ul className={styles.links}>
            <li>
              <Link to="/" className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              {t("home")}
              </Link>
            </li>
            <li>
              <Link to="/menu" className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              {t("menu")}
              </Link>
            </li>
            <li>
              <Link to="/blog" className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              {t("blog")}
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              {t("gallery")}
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              {t("about")}
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.header}>{t("footerOpeningHours")}</h4>
          <p className={styles.text}>
            <span className={styles.day}>{t("monday")} - {t("friday")}</span>
            <span className={styles.time}>9:00 am - 8:00 pm</span>
          </p>
          <p className={styles.text}>
            <span className={styles.day}>{t("saturday")}</span>
            <span className={styles.time}>9:30 am - 2:00 pm</span>
          </p>
          <p className={styles.text}>
            <span className={styles.day}>{t("sunday")}</span>
            <span className={styles.time}>{t("sundayTime")}</span>
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <img
          src={FooterImage}
          alt="Footer's Logo"
          className={styles.footerImage}
        />
        <p className={styles.text}>
          &copy; {t("footerCopyRight")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
