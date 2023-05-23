import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaRebel, FaGalacticRepublic } from "react-icons/fa";
import Loading from "../loading/loading";
import { fetchMovies } from "../../api/movie.api";
import MovieData from "../../models/movie.model";
import { MovieListData } from "../../models/component.model";


const MovieList: React.FC<MovieListData> = ({
  selectedCharacter, // The selected character from props
  isDarkMode, // Flag indicating if dark mode is enabled from props
}) => {
  // State for storing movies data
  const [movies, setMovies] = useState<MovieData[]>([]);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error message, if any
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch movies data when the component mounts
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      // Set loading state to true before fetching data
      setIsLoading(true);
      // Fetch movies using the API
      const data = await fetchMovies();
      // Store the fetched movies data in state
      setMovies(data);
      // Set loading state to false after fetching data
      setIsLoading(false);
    } catch (error) {
      // Set error message if there is an error during fetching
      setError("Error fetching movies");
      // Set loading state to false in case of error
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full order-1 md:w-4/5 md:ml-2 md:order-2 ${
        isDarkMode
          ? "bg-gray-950 text-white border border-red-900"
          : "bg-gray-300 text-black border border-blue-300"
      } rounded-md p-4`}
    >
      <h4 className="text-xl font-bold mb-2 text-gray-500 underline">Movies</h4>
      {isLoading ? (
        <Loading isDarkMode={isDarkMode} />
      ) : (
        <ul className="list-disc list-inside list-none">
          {selectedCharacter.films.map((filmUrl) => {
            const movie = movies.find((m) => m.url === filmUrl);
            return movie ? (
              <li key={movie.episode_id}>
                <span>
                  {/* Display the icon based on the dark mode */}
                  {isDarkMode ? (
                    <FaRebel className="inline-block align-text-bottom mr-4" />
                  ) : (
                    <FaGalacticRepublic className="inline-block align-text-bottom mr-4" />
                  )}
                  {movie.title} ({moment(movie.release_date).format("YYYY")})
                </span>
              </li>
            ) : null;
          })}
        </ul>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default MovieList;
