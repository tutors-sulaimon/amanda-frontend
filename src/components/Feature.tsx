import React from "react";

interface Feature {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

interface FeatureSectionProps {
  heading: string;
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  heading,
  features,
}) => {
  return (
    <section className="max-w-[1120px] mx-auto">
      <h2
        style={{
          color: "#4F4F4F",
          fontFamily: "'Playfair Display', serif",
          fontSize: "38px",
          fontWeight: "400",
          lineHeight: "120%",
          textAlign: "center",
          margin: "100px 0 40px 0",
        }}
      >
        {heading}
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center mb-4">
                <feature.icon
                  className="w-[49px] h-[60px] text-red-700"
                  strokeWidth={1.5}
                />
              </div>
              <h5
                style={{
                  color: "#4F4F4F",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {feature.title}
                <br />
                <span>{feature.subtitle}</span>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
