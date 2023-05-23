import React from "react";
import { FaRebel, FaGalacticRepublic } from "react-icons/fa";
import { DarkModeSwitchProps } from "../../models/component.model";

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({
  isDarkMode,
  handleDarkModeToggle,
}) => {
  return (
    <div className="darkModeSwitch">
      <label
        htmlFor="darkModeToggle"
        className="flex items-center space-x-2 cursor-pointer w-full justify-center flex-col"
      >
        <div className="modeButtons flex flex-row mb-2">
          <span
            className={`w-6 h-6 mr-2 flex items-center justify-center rounded-full relative ${
              isDarkMode ? "bg-white" : "bg-white ring-2 ring-blue-500"
            }`}
          >
            {/* Checkbox for toggling Republic Mode */}
            <input
              type="checkbox"
              id="republicMode"
              onChange={handleDarkModeToggle}
              className="appearance-none w-6 h-6 rounded-full transition duration-300 focus:outline-none cursor-pointer"
            />
            {/* Icon for Republic Mode */}
            <FaGalacticRepublic
              className={`text-xl pointer-events-none absolute ${
                isDarkMode ? "text-black" : "text-black"
              }`}
            />
          </span>

          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full relative ${
              isDarkMode ? "bg-gray-700 ring-2 ring-red-500" : "bg-black"
            }`}
          >
            {/* Checkbox for toggling Rebel Mode */}
            <input
              type="checkbox"
              id="rebelMode"
              onChange={handleDarkModeToggle}
              className="appearance-none w-6 h-6 rounded-full transition duration-300 focus:outline-none cursor-pointer"
            />
            {/* Icon for Rebel Mode */}
            <FaRebel
              className={`text-xl pointer-events-none absolute ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            />
          </span>
        </div>
        <span className="text-sm font-semibold">
          {/* Display mode label based on isDarkMode prop */}
          {isDarkMode ? "Rebel Mode" : "Republic Mode"}
        </span>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
