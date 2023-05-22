import React, { useEffect, useState } from "react";
// import "./MovieList.scss";
import MovieData from "../../models/movie.model";
import { fetchMovies } from "../../api/movie.api";
import moment from "moment";
import { MovieListData } from "../../models/component.model";
import Loading from "../loading/loading";

const MovieList: React.FC<MovieListData> = ({
  selectedCharacter,
  isDarkMode,
}) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMovies();
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching movies");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full md:w-2/4 md:ml-2 ${
        isDarkMode
          ? "bg-gray-950 text-white border border-red-900"
          : "bg-gray-100 text-black border border-blue-300"
      } rounded-md p-4`}
    >
      <h4 className="text-xl font-bold mb-2">Movies</h4>
      {isLoading ? (
        <Loading isDarkMode={isDarkMode} />
      ) : (
        <ul className="list-disc list-inside">
          {selectedCharacter.films.map((filmUrl) => {
            const movie = movies.find((m) => m.url === filmUrl);
            return movie ? (
              <li key={movie.episode_id}>
                <span>
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
