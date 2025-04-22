import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../components/Navbar/Navbar.module.css";
import amandaLogo from "../../assets/amandaLogo.png";
import english from "../../assets/english.svg";
import spanish from "../../assets/spanish.svg";
import i18n from "i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const dropdownMenu = [
    { name: t("gastronomicWorkshop"), href: "/gastronomic" },
    { name: t("birthdayWorkshop"), href: "/birthday" },
    { name: t("privateEventCatering"), href: "/catering" },
    { name: t("privateChefService"), href: "/chef" },
    { name: t("dailyServices"), href: "/daily" },
  ];

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load language from localStorage or default to i18n language
  const storedLanguage =
    localStorage.getItem("language") || i18n.language || "es";
  const [currentLanguage, setCurrentLanguage] = useState(storedLanguage);

  const toggleServices = () => {
    setIsServicesOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeServicesDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsServicesOpen(false);
    }
  };

  const closeMenu = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest(`.${styles.navbar}`) && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeServicesDropdown);
    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeServicesDropdown);
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    i18n.changeLanguage(storedLanguage); // Ensure i18n loads the stored language
  }, [storedLanguage]);

  // Function to change language and persist it
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("language", lng); // Save language preference
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={amandaLogo}
          alt="Amanda's Logo"
          className={styles.logoImage}
        />
      </div>

      <span className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </span>

      <ul className={`${styles.navItems} ${isMenuOpen ? styles.showMenu : ""}`}>
        <li>
          <Link to="/">{t("home")}</Link>
        </li>

        <li className={styles.servicesDropdown}>
          <button onClick={toggleServices}>
            {t("services")} <span className={styles.dropdownArrow}>▼</span>
          </button>
          {isServicesOpen && (
            <ul ref={dropdownRef} className={styles.dropdownContent}>
              {dropdownMenu.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} onClick={() => setIsServicesOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link to="/menu">{t("menu")}</Link>
        </li>
        <li>
          <Link to="/blog">{t("blog")}</Link>
        </li>
        <li>
          <Link to="/gallery">{t("gallery")}</Link>
        </li>
        <li>
          <Link to="/about">{t("about")}</Link>
        </li>
        <li className={styles.contactTextMenu}>
          <Link to="/contact">{t("contactUs")}</Link>
        </li>
      </ul>

      <div className={styles.rightSection}>
        <div className={styles.languageFlags}>
          {currentLanguage === "es" ? (
            <img
              src={english}
              alt="English"
              className={styles.flag}
              onClick={() => handleLanguageChange("en")}
            />
          ) : (
            <img
              src={spanish}
              alt="Spanish"
              className={styles.flag}
              onClick={() => handleLanguageChange("es")}
            />
          )}
        </div>
        <button className={styles.contactButton}>
          <Link to="/contact">{t("contactUs")}</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
