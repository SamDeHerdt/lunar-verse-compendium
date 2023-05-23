// Importing dependencies and components
import React, { useEffect, useState, useRef } from "react";
import { sanitize } from "dompurify";
import { escapeRegExp } from "lodash";
import MovieList from "../../components/movieList/movieList";
import CharacterDetails from "../../components/characterDetailList/characterDetailList";
import TwinklingStarsBackground from "../../components/animatedBackground/animatedBackground";
import Loading from "../../components/loading/loading";
import DarkModeSwitch from "../../components/darkModeSwitch/darkModeSwitch";
import Character from "../../models/character.model";
import { fetchAllCharactersData } from "../../api/character.api";
import { defaultProps } from "./characterSearch.config";
import "./characterSearch.scss";

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

  // Handles the character search based on the input value
  const handleCharacterSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Sanitize the search query
    const searchQuery = sanitize(event.target.value);
    // Set the selected character name
    setSelectedCharacterName(searchQuery);

    if (searchQuery.trim() === "") {
      // Clearing search results and selected character if search query is empty
      // Clear the search results
      setSearchResults([]);
      // Clear the selected character
      setSelectedCharacter(null);
      // Clear the suggested character
      setSuggestedCharacter(null);
    } else {
      // Sanitize the search query for regular expression matching
      const sanitizedQuery = escapeRegExp(searchQuery.toLowerCase());
      const matchedCharacters = characters.filter((character) =>
        // Filter characters based on a case-insensitive match of the search query
        character.name.toLowerCase().match(new RegExp(sanitizedQuery))
      );

      if (matchedCharacters.length > 0) {
        // Sorting and setting the matched characters as search results
        const sortedCharacters = matchedCharacters.sort(
          // Sort the matched characters alphabetically by name
          (a, b) => a.name.localeCompare(b.name)
        );
        // Set the sorted matched characters as search results
        setSearchResults(sortedCharacters);
        // Clear the selected character
        setSelectedCharacter(null);
        // Clear the suggested character
        setSuggestedCharacter(null);
      } else {
        // Clear the search results
        setSearchResults([]);
        // Clear the selected character
        setSelectedCharacter(null);

        // Finding a suggested character if no exact match is found
        const suggested = characters.find((character) =>
          // Find a character whose name starts with the search query
          character.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

        if (suggested) {
          // Set the suggested character's name
          setSuggestedCharacter(suggested.name);
        } else {
          // Clear the suggested character
          setSuggestedCharacter(null);
        }
      }
    }
  };

  // Handles the selection of a character
  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedCharacterName(character.name);
    setSuggestedCharacter(null);
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  // Handles the toggle of dark mode
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Renders the component
  return (
    <div
      className={`min-h-screen p-10 ${
        isDarkMode ? "text-white" : "bg-white text-black"
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
        <DarkModeSwitch
          isDarkMode={isDarkMode}
          handleDarkModeToggle={handleDarkModeToggle}
        />

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
