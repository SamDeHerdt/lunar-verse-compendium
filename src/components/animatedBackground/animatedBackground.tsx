import React from "react";
import "./animatedBackground.scss";
import ComponentData from "../../models/component.model";

const AnimatedBackground: React.FC<ComponentData> = ({ isDarkMode }) => {
  return (
    <div
      className={`${
        isDarkMode ? "starsContainer bg-gray-900" : "starsContainer bg-gray-100"
      }`}
    >
      <div id="stars" className="star star-small"></div>
      <div id="stars2" className="star star-medium"></div>
      <div id="stars3" className="star star-big"></div>
      {!isDarkMode &&
        [...Array(10)].map((_, index) => (
          <div key={index} className={`spaceship spaceship-${index + 1}`}></div>
        ))}
    </div>
  );
};

export default AnimatedBackground;
