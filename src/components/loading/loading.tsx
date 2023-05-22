import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import ComponentData from "../../models/component.model";

const Loading: React.FC<ComponentData> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center justify-center mt-2 pt-4">
      <FaCircleNotch
        className={`animate-spin ${
          isDarkMode ? "text-white" : "text-black"
        } mr-2 `}
      />
      <p>Loading</p>
    </div>
  );
};

export default Loading;
