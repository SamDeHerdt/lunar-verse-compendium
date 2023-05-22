import axios from "axios";
import { setupCache } from 'axios-cache-adapter';

// Create an instance of axios with caching enabled
const cache = setupCache({
  maxAge: 30 * 60 * 1000, // Cache responses for 30 minutes
});
const api = axios.create({
  adapter: cache.adapter,
});

export const fetchMovies = async () => {
  try {
    const response = await api.get(`${process.env.REACT_APP_SWAPI_URL}/films/`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Error fetching movies");
  }
};
