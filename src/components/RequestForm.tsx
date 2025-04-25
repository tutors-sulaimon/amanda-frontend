"use client";

import type React from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { t } from "i18next";
import Swal from "sweetalert2";

interface RequestFormProps {
  haveBg?: boolean;
}

// 📌 Reusable Input Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded p-2 w-full ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-red-500 text-sm">{t(error)}</p>}
  </div>
);

// 📌 Reusable Select Component
const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`border rounded p-2 w-full ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">{t("formSelectDropdownText")}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{t(error)}</p>}
  </div>
);

// 📌 Reusable Textarea Component
const TextareaField = ({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div className="col-span-2">
    <label htmlFor={name} className="block mb-1">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="border border-gray-300 rounded p-2 w-full"
    />
  </div>
);

const RequestForm: React.FC<RequestFormProps> = ({ haveBg = true }) => {
  const { t } = useTranslation();

  // 🔹 Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    participants: "",
    company: "",
    message: "",
    allergy: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // 🔹 Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  // 🔹 Handle CAPTCHA Change
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  // 🔹 Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "formFirstNameRequired";
    if (!formData.email.trim()) newErrors.email = "formEmailRequired";
    if (!formData.phone.trim()) newErrors.phone = "formPhoneRequired";
    if (!formData.date.trim()) newErrors.date = "formDateRequired";
    if (!formData.time.trim()) newErrors.time = "formTimeRequired";
    if (!formData.participants.trim())
      newErrors.participants = "formParticipantsRequired";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Log the URL being used (for debugging)
      const apiUrl = `${import.meta.env.VITE_EXPRESS_BASE_URL}/api/submit-request`;

      const response = await axios.post(apiUrl, { ...formData, captchaValue });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: t("Your request has been successfully submitted!"),
          text: t("We will get back to you as soon as possible."),
          confirmButtonText: '<span style="padding: 0 20px;">OK</span>',
        }).then(() => {
          // Reset form after successful submission
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            participants: "",
            company: "",
            message: "",
            allergy: "",
          });
          setCaptchaValue(null);
          setErrors({});
        });
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
      Swal.fire({
        icon: "error",
        title: t("Oops! Something went wrong while submitting your request."),
        text: t("Please try again later."),
        confirmButtonText: '<span style="padding: 0 20px;">OK</span>',
      });
    }
  }
  // 🔹 Render
  return (
    <div className="mx-auto w-full mt-12" id="form">
      <div className="container m-auto">
        <h2 className="text-2xl font-serif text-center mb-4">
          {t("Submit Your Request Today!")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          {t(
            "Fill out the form below to let us know your preferences and requirements. We'll get back to you as soon as possible!",
          )}
        </p>
      </div>
      <div
        className={`${haveBg ? "bg-request-form bg-cover bg-center" : ""} w-full flex items-center justify-center`}
      >
        <form
          className={`${haveBg ? "shadow-lg" : ""} bg-white p-8 rounded-lg max-w-lg w-full my-12`}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">
            <InputField
              label={t("formFirstName")}
              name="firstName"
              value={formData.firstName}
              placeholder={t("formFirstName")}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <InputField
              label={t("formLastName")}
              name="lastName"
              value={formData.lastName}
              placeholder={t("formLastName")}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <InputField
              label={t("formEmail")}
              name="email"
              type="email"
              value={formData.email}
              placeholder={t("formEmailPlaceholder")}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <InputField
              label={t("formPhoneNumber")}
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder={t("formPhonePlaceholder")}
              onChange={handleChange}
              error={errors.phone}
              required
            />
            <InputField
              label={t("formDate")}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
            />
            <SelectField
              label={t("formTime")}
              name="time"
              value={formData.time}
              options={[
                { value: "morning", label: t("formTimeMorning") },
                { value: "afternoon", label: t("formTimeAfternoon") },
                { value: "evening", label: t("formTimeEvening") },
              ]}
              onChange={handleChange}
              error={errors.time}
              required
            />
            <SelectField
              label={t("formNumberOfParticipants")}
              name="participants"
              value={formData.participants}
              options={[
                { value: "1-5", label: t("formParticipants1to5") },
                { value: "6-10", label: t("formParticipants6to10") },
                { value: "11-15", label: t("formParticipants11to15") },
                { value: "15+", label: t("formParticipants15plus") },
              ]}
              onChange={handleChange}
              error={errors.participants}
              required
            />
            <InputField
              label={t("formCompany")}
              name="company"
              value={formData.company}
              placeholder={t("formCompanyPlaceholder")}
              onChange={handleChange}
            />
            <TextareaField
              label={t("foodIntoleranceOrAllergy")}
              name="allergy"
              value={formData.allergy}
              placeholder={t("foodAllergies")}
              onChange={handleChange}
            />
            <TextareaField
              label={t("formMessageOrRequest")}
              name="message"
              value={formData.message}
              placeholder={t("formMessagePlaceholder")}
              onChange={handleChange}
            />
          </div>

          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            className="my-4"
          />
          {errors.captcha && (
            <p className="text-red-500 text-sm">{errors.captcha}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-sm mt-6"
          >
            {t("sendARequest")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
