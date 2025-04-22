import { Mail, MapPin, PhoneCall, Store } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import HeroSection from "../../components/Hero/Hero";
import styles from "./Contact.module.css";
import venue from "../../assets/about-venue.jpeg";
import map from "../../assets/about-location.png";
import hero_img from "../../assets/about-hero.jpeg";

const Contact = () => {
  const { t } = useTranslation();

  const CONTACT_CONTENT = {
    title: t("contactUs"),
    description: t("contactUsDescription"),
  };
  return (
    <>
      <div>
        <HeroSection backgroundImage={hero_img} heading="" description="" />
      </div>
      <div className="grid gap-24 w-4/5 m-auto">
        <div className="w-3/4 m-auto grid gap-10 py-10 text-center">
          <h2 className={`${styles.heading_l} text-center`}>
            {CONTACT_CONTENT.title}
          </h2>
          <p className="text">{CONTACT_CONTENT.description}</p>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-20 md:gap-10">
            <ShopInfo />
            <ContactForm />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pb-32">
          <img src={venue} />
          <img src={map} />
        </div>
      </div>
    </>
  );
};

const ShopInfo = () => {
  const { t } = useTranslation();

  const SHOP_INFO = {
    title: "Kiosco Amanda",
    address: "La Graja Torro sports complex, Malaga",
    email: "kioskoamanda@gmail.com",
    phone: " +34630362124",
    hours: [
      {
        period: t("monday") + " - " + t("friday"),
        time: "9:00 am - 8:00 pm",
      },
      { period: t("saturday"), time: "9:30 am - 2:00 pm" },
      { period: t("sunday"), time: t("sundayTime") },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className={styles.heading_l}>{SHOP_INFO.title}</h2>
      <div className="flex flex-col gap-6">
        <span className="flex items-center gap-4">
          <MapPin color="#C31818" />
          <p className={styles.text}> {SHOP_INFO.address}</p>
        </span>
        <span className="flex items-center gap-4">
          <Mail color="#C31818" />
          <p className={styles.text}>{SHOP_INFO.email}</p>
        </span>
        <span className="flex items-center gap-4">
          <PhoneCall color="#C31818" />
          <p className={styles.text}>{SHOP_INFO.phone}</p>
        </span>
        <span className="flex items-center gap-4">
          <Store color="#C31818" />
          <p className={styles.text}>{t("footerOpeningHours")}:</p>
        </span>
        {SHOP_INFO.hours?.map((hour) => (
          <div className="grid grid-cols-2">
            <p className={styles.text}>{hour.period}</p>
            <p className={styles.text}>{hour.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrorsType = Partial<Record<keyof FormDataType, string>>;

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrorsType>({});
  const validateField = (name: keyof FormDataType, value: string) => {
    if (!value.trim()) {
      return t("fieldRequired");
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return t("invalidEmail");
    }
    if (name === "phone" && !/^\d{10,15}$/.test(value)) {
      return t("invalidPhoneNumber");
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as {
      name: keyof FormDataType;
      value: string;
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: FormErrorsType = {};
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(
        key as keyof FormDataType,
        formData[key as keyof FormDataType],
      );
      if (errorMessage) newErrors[key as keyof FormErrorsType] = errorMessage;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success(t("formSubmittedSuccessfully"), { autoClose: 3000 });

    // ✅ Reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });

    // ✅ Clear errors after submission
    setErrors({});
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim()) &&
    Object.values(errors).every((error) => !error);

  return (
    <div>
      <form className="max-w-lg w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              {t("formFirstName")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder={t("formFirstName")}
              className={`border p-2 w-full rounded ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-500 focus:outline-none`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              {t("formLastName")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder={t("formLastName")}
              className={`border p-2 w-full rounded ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-500 focus:outline-none`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="email" className="block mb-1">
              {t("formEmail")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("formEmailPlaceholder")}
              className={`border p-2 w-full rounded ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-500 focus:outline-none`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="phone" className="block mb-1">
              {t("formPhoneNumber")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder={t("formPhonePlaceholder")}
              className={`border p-2 w-full rounded ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-500 focus:outline-none`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="message" className="block mb-1">
              {t("formMessageOrRequest")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              placeholder={t("anythingInMind")}
              className={`border p-2 w-full rounded ${errors.message ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-orange-500 focus:outline-none`}
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              style={{ backgroundColor: "#C31818" }}
              type="submit"
              className={`bg-red-800 hover:bg-red-900 text-white px-8 py-2 rounded ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isFormValid}
            >
              {t("contactUs")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
