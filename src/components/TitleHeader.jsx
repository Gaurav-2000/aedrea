import React from "react";
import TextPressure from "@/components/TextPressure";

const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>

      <div className="w-full flex justify-center">
        <TextPressure
          text={title}
          className="text-center"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
    </div>
  );
};

export default TitleHeader;
