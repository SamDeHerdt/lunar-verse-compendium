// Importing dependencies and components
import React, { useEffect, useState, useRef } from "react";
import "./characterSearch.scss";
import Character from "../../models/character.model";
import { fetchAllCharactersData } from "../../api/character.api";
import { defaultProps } from "./characterSearch.config";
import MovieList from "../../components/movieList/movieList";
import CharacterDetails from "../../components/characterDetailList/characterDetailList";
import { FaRebel, FaGalacticRepublic } from "react-icons/fa";
import { sanitize } from "dompurify";
import { escapeRegExp } from "lodash";
import TwinklingStarsBackground from "../../components/animatedBackground/animatedBackground";
import Loading from "../../components/loading/loading";

const CharacterCompendium: React.FC = () => {
  // State variables
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterName, setSelectedCharacterName] =
    useState<string>("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [suggestedCharacter, setSuggestedCharacter] = useState<string | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetching all characters' data when the component mounts
    fetchAllCharactersData()
      .then((data) => {
        setCharacters(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters", error);
        setIsLoading(false);
      });
  }, []);

  const handleCharacterSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchQuery = sanitize(event.target.value);
    setSelectedCharacterName(searchQuery);
    if (searchQuery.trim() === "") {
      // Clearing search results and selected character if search query is empty
      setSearchResults([]);
      setSelectedCharacter(null);
      setSuggestedCharacter(null);
    } else {
      const sanitizedQuery = escapeRegExp(searchQuery.toLowerCase());
      const matchedCharacters = characters.filter((character) =>
        character.name.toLowerCase().match(new RegExp(sanitizedQuery))
      );
      if (matchedCharacters.length > 0) {
        // Sorting and setting the matched characters as search results
        const sortedCharacters = matchedCharacters.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSearchResults(sortedCharacters);
        setSelectedCharacter(null);
        setSuggestedCharacter(null);
      } else {
        setSearchResults([]);
        setSelectedCharacter(null);
        // Finding a suggested character if no exact match is found
        const suggested = characters.find((character) =>
          character.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        if (suggested) {
          setSuggestedCharacter(suggested.name);
        } else {
          setSuggestedCharacter(null);
        }
      }
    }
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedCharacterName(character.name);
    setSuggestedCharacter(null);
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Rendering the component
  return (
    <div
      className={`min-h-screen p-10 ${
        isDarkMode ? " text-white" : "bg-white text-black"
      } flex flex-col items-center justify-center transition duration-500`}
    >
      <TwinklingStarsBackground isDarkMode={isDarkMode} />
      <div
        className={`characterSearch w-full max-w-2xl p-10 pt-10 pb-30 ${
          isDarkMode
            ? "bg-gray-800 text-white shadow-red-900"
            : "bg-white text-black shadow-blue-200"
        } rounded-lg shadow-xl`}
      >
        {/* Dark mode toggle switch */}
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
                <input
                  type="checkbox"
                  id="republicMode"
                  onChange={handleDarkModeToggle}
                  className="appearance-none w-6 h-6 rounded-full transition duration-300 focus:outline-none cursor-pointer"
                />
                <FaGalacticRepublic // Republic Star Wars icon
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
                <input
                  type="checkbox"
                  id="rebelMode"
                  onChange={handleDarkModeToggle}
                  className="appearance-none w-6 h-6 rounded-full transition duration-300 focus:outline-none cursor-pointer"
                />
                <FaRebel // Rebel Star Wars icon
                  className={`text-xl pointer-events-none absolute ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                />
              </span>
            </div>
            <span className="text-sm font-semibold">
              {isDarkMode ? "Rebel Mode" : "Republic Mode"}
            </span>
          </label>
        </div>

        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center mb-20 mt-10">
            Star Wars
            <br />
            Character Compendium
          </h1>
          {/* Character search input */}
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search your character here"
              value={selectedCharacterName}
              tabIndex={0}
              onChange={handleCharacterSearch}
              className={`w-full p-3 border ${
                isDarkMode
                  ? "bg-gray-900 text-white shadow-gray-700 border-red-900 focus:ring-red-900"
                  : "bg-white text-black border-blue-300 focus:ring-blue-300"
              } rounded-md shadow-sm focus:outline-none focus:ring`}
              ref={searchInputRef}
            />
            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <ul
                className={`absolute z-10 top-full border border-gray-300 rounded-md shadow-md mt-1 w-full max-h-60 overflow-y-auto 
              ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
              >
                {searchResults.map((character) => (
                  <li
                    key={character.name}
                    className={`px-4 py-2 cursor-pointer ${
                      isDarkMode ? "hover:bg-slate-950" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleCharacterSelect(character)}
                  >
                    {character.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Loading indicator */}
          {isLoading && <Loading isDarkMode={isDarkMode} />}
          {/* Error message for invalid search */}
          {!isLoading &&
            suggestedCharacter === null &&
            searchResults.length === 0 &&
            selectedCharacterName.trim() !== "" &&
            !selectedCharacter && (
              <p className="text-red-500 mt-2">
                The name is wrong or no character is found with that name
              </p>
            )}
        </div>

        {/* Displaying selected character and movie list */}
        {selectedCharacter && (
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-10">
              {selectedCharacter.name}
            </h2>
            <div className="flex flex-col md:flex-row">
              {/* Component for displaying character details */}
              <CharacterDetails
                selectedCharacter={selectedCharacter}
                isDarkMode={isDarkMode}
                url={selectedCharacter.url}
              />
              {/* Component for displaying movie list */}
              <MovieList
                selectedCharacter={selectedCharacter}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CharacterCompendium.defaultProps = defaultProps;

export default CharacterCompendium;
