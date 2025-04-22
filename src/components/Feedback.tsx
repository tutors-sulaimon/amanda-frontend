import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "../styles/global.css";
import EmojiRating from "./EmojiRating";

const Feedback = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0); // 0 means the form is closed
  const [ratings, setRatings] = useState<Record<string, number | null>>({});

  useEffect(() => {
    setRatings({
      [t("foodQuality")]: null,
      [t("qualityOfService")]: null,
      [t("qualityOfFacilities")]: null,
      [t("priceQualityRatio")]: null,
      [t("cleanliness")]: null,
    });
  }, [t]); // Runs when translations update
  const [comments, setComments] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });
  // const [errors, setErrors] = useState<{ name?: string; terms?: string }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailError, setEmailError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleNext = () => {
    let newErrors: { name?: string; terms?: string } = {};
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = t("nameIsRequired");
      }
      if (!termsAccepted) {
        newErrors.terms = t("mustAcceptTerms");
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleClose = () => {
    setStep(0); // Closes the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: new Date().toISOString().split("T")[0], // Reset to today's date
    });
    setRatings({
      [t("foodQuality")]: null,
      [t("qualityOfService")]: null,
      [t("qualityOfFacilities")]: null,
      [t("priceQualityRatio")]: null,
      [t("cleanliness")]: null,
    });
    setComments(""); // Clear comments
    setTermsAccepted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lowerCaseValue = name === "email" ? value.toLowerCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: lowerCaseValue,
    }));

    // Remove error when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the error for this field
      }));
    }

    if (name === "email") {
      setEmailError(
        isValidEmail(lowerCaseValue) ? "" : "Invalid email address",
      );
    }
  };

  const handleRatingChange = (category: string, rating: number) => {
    const newRatings = { ...ratings, [category]: rating };
    setRatings(newRatings);
    localStorage.setItem("emojiRatings", JSON.stringify(newRatings));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const incompleteCategories = Object.values(ratings).some(
      (value) => value === null,
    );

    if (incompleteCategories) {
      toast.error(t("pleaseCompleteAllCat")); // Use error type for better UX
      return;
    }

    toast.success(
      t("thankYouFeedback"), // If you have it in translations
      { autoClose: 3000 }, // Optional: Set auto-close timeout
    );

    setStep(0); // Close form after submission
    // Reset ratings state
    setRatings({}); // Reset state
    localStorage.removeItem("emojiRatings"); // Clear stored ratings
    handleClose();
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const categories = Object.keys(ratings);

  return (
    <>
      {/* Feedback Button */}
      <div className="fixed top-1/2 right-0 z-50 -translate-y-1/2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center justify-center bg-white py-2 px-2 text-primary-foreground shadow-md border border-gray-300 rounded-lg transform -rotate-90 hover:bg-gray-100 focus:outline-none"
        >
          <span className="text-lg font-medium">{t("feedback")}</span>
        </button>
      </div>

      {/* Feedback Form Modal */}
      {step > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-0 right-4 text-black-600 hover:text-gray-800 text-4xl"
            >
              &times;
            </button>

            <h2 className="text-xl text-black capitalize font-bold mb-4">
              {step === 1 && t("shareYourFeedback")}
              {step === 2 && t("tellHowYouFeel")}
              {step === 3 && t("weValueYourFeedback")}
            </h2>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder={t("name")}
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full capitalize border border-gray-300 p-4 rounded mb-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-orange-500 focus:outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded mb-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("phone")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded mb-4 focus:ring-2  focus:ring-orange-500 focus:outline-none"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-4 rounded mb-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mr-2 checkbox"
                  />
                  <label htmlFor="terms">
                    {t("accept")}{" "}
                    <a href="#" className="text-orange-400">
                      {t("termsAndConditions")}
                    </a>
                  </label>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 ml-6 bg-orange-400 text-white rounded"
                  >
                    {t("next")}
                  </button>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.terms}
                  </p>
                )}
              </>
            )}

            {/* Step 2: Ratings */}
            {step === 2 && (
              <>
                {categories.map((category) => (
                  <div key={category} className="mb-4">
                    <p className="mb-2 text-lg text-zinc-800 font-semibold">
                      {category}:
                    </p>

                    <EmojiRating
                      category={category}
                      selectedRating={ratings[category] ?? null}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                ))}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-orange-400 text-white rounded"
                  >
                    {t("next")}
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Comments & Submit */}
            {step === 3 && (
              <>
                {/*  <!-- Yes/No Questions --> */}
                <div className="mb-4">
                  <p className="font-medium mb-2">{t("willYouComeBack")}</p>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="return"
                      value="Yes"
                      className="peer hidden"
                    />
                    <span className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-green-500"></span>
                    <span className="ml-2">{t("yes")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="return"
                      value="No"
                      className="peer hidden"
                    />
                    <span className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-red-500"></span>
                    <span className="ml-2">{t("no")}</span>
                  </label>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-2">{t("wouldYouRecommendUs")}</p>
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="recommend"
                      value="Yes"
                      className="peer hidden"
                    />
                    <span className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-green-500"></span>
                    <span className="ml-2">{t("yes")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value="No"
                      className="peer hidden"
                    />
                    <span className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-red-500"></span>
                    <span className="ml-2">{t("no")}</span>
                  </label>
                </div>
                {/* Additional Comments */}
                <h3 className="text-2xl mb-3">{t("careToShare")}</h3>
                <textarea
                  className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded mb-4"
                  rows={4}
                  placeholder={t("additionalComments")}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>

                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-orange-400 text-white rounded"
                  >
                    {t("submit")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
