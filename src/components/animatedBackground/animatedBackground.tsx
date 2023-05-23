import React from "react";
import ComponentData from "../../models/component.model";
import "./animatedBackground.scss";

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
        // Render spaceship elements if isDarkMode is false
        [...Array(10)].map((_, index) => (
          <div key={index} className={`spaceship spaceship-${index + 1}`}></div>
        ))}
    </div>
  );
};

export default AnimatedBackground;
