import React, { useEffect, useState } from "react";
import { CharacterDetailListData } from "../../models/component.model";
import Loading from "../loading/loading";
import { fetchHomeworld } from "../../api/homeworld.api";

const CharacterDetails: React.FC<CharacterDetailListData> = ({
  selectedCharacter,
  isDarkMode,
  url,
}) => {
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error message, if any
  const [error, setError] = useState("");
  // State for storing homeworld information
  const [homeworld, setHomeworld] = useState<string>("");

  useEffect(() => {
    if (selectedCharacter) {
      // Fetch homeworld data when the selected character changes
      fetchHomeworldData(selectedCharacter.homeworld);
    }
  }, [selectedCharacter]);

  const fetchHomeworldData = async (url: string) => {
    try {
      setIsLoading(true);
  
      // Fetch homeworld details using the API
      const homeworldResponse = await fetchHomeworld(url);
  
      // Extract the homeworld name from the response
      const homeworldName = homeworldResponse?.name || "";
  
      // Set the homeworld information
      setHomeworld(homeworldName);
  
      // Set loading state to false after fetching data
      setIsLoading(false);
    } catch (error) {
      // Set error message if there is an error during fetching
      setError("Error fetching homeworld details");
  
      // Set loading state to false in case of error
      setIsLoading(false);
    }
  };
  

  return (
    <div
      className={`w-full mt-4 order-2 md:w-3/5 md:mr-2 md:mt-0 md:order-1  ${
        isDarkMode
          ? "bg-gray-900 text-white border border-red-900"
          : "bg-gray-100 text-black border border-blue-300"
      } rounded-md p-4 `}
    >
      <h4 className="text-xl font-bold mb-4 text-gray-500 underline">
        Character Features
      </h4>
      {isLoading ? (
        // Render loading indicator if loading state is true
        <Loading isDarkMode={isDarkMode} />
      ) : selectedCharacter ? (
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Born:</span>{" "}
            {selectedCharacter.birth_year}
          </li>
          <li>
            <span className="font-semibold">Birth planet:</span> {homeworld}
          </li>
          <li>
            <span className="font-semibold">Gender:</span>{" "}
            {selectedCharacter.gender}
          </li>
          <li>
            <span className="font-semibold">Stature:</span>{" "}
            {selectedCharacter.height}cm
          </li>
          <li>
            <span className="font-semibold">Build:</span>{" "}
            {selectedCharacter.mass}kg
          </li>
          <li>
            <span className="font-semibold">Hair Color:</span>{" "}
            {selectedCharacter.hair_color}
          </li>
          <li>
            <span className="font-semibold">Eye Color:</span>{" "}
            {selectedCharacter.eye_color}
          </li>
          <li>
            <span className="font-semibold">Skin Color:</span>{" "}
            {selectedCharacter.skin_color}
          </li>
        </ul>
      ) : (
        <p className="text-center">No character selected.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CharacterDetails;
