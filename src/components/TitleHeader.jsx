import React from "react";

const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div>
        <h1 className=" md:text-7xl text-3xl text-center">{title}</h1>
      </div>
    </div>
  );
};

export default TitleHeader;
