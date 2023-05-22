import React, { useEffect, useState } from "react";
import { fetchHomeworld } from "../../api/character.api";
import { CharacterDetailListData } from "../../models/component.model";
import Loading from "../loading/loading";

const CharacterDetails: React.FC<CharacterDetailListData> = ({
  selectedCharacter,
  isDarkMode,
  url,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [homeworld, setHomeworld] = useState("");

  useEffect(() => {
    if (selectedCharacter) {
      fetchHomeworldData(url);
    }
  }, [selectedCharacter, url]);

  const fetchHomeworldData = async (url: string) => {
    try {
      setIsLoading(true);
      console.log(url);
      const homeworldDetails = await fetchHomeworld(url);
      console.log(homeworldDetails);
      setHomeworld(homeworldDetails.homeworld);
      setIsLoading(false);
    } catch (error) {
      setHomeworld("");
      console.error(error);
      setError("Error fetching character details");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full md:w-2/4 md:mr-2  ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-black border border-blue-300"
      } rounded-md p-4 border border-red-900`}
    >
      <h4 className="text-xl font-bold mb-4">Character Features</h4>
      {isLoading ? (
        <Loading isDarkMode={isDarkMode} />
      ) : selectedCharacter ? (
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Born:</span>{" "}
            {selectedCharacter.birth_year}
          </li>
          <li>
            <span className="font-semibold">Homeworld:</span> {homeworld}
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
