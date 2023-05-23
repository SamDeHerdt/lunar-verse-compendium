import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Create an instance of axios with caching enabled
const cache = setupCache({
  maxAge: 30 * 60 * 1000, // Cache responses for 30 minutes
});
const api = axios.create({
  adapter: cache.adapter,
});

export const fetchAllCharactersData = async () => {
  try {
    const allCharacters = [];
    let nextPage = `${process.env.REACT_APP_SWAPI_URL}/people`;

    while (nextPage) {
      const response = await api.get(nextPage); // Use the axios instance with caching enabled
      const { results, next } = response.data;
      allCharacters.push(...results);
      nextPage = next;
    }

    return allCharacters;
  } catch (error) {
    throw new Error("Error fetching characters");
  }
};
