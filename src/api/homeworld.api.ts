import axios from "axios";
import { setupCache } from "axios-cache-adapter";

// Create an instance of axios with caching enabled
const cache = setupCache({
  maxAge: 30 * 60 * 1000, // Cache responses for 30 minutes
});
const api = axios.create({
  adapter: cache.adapter,
});

export const fetchHomeworld = async (url: string) => {
  try {
    const response = await api.get(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch homeworld");
    }

    return response.data;
  } catch (error) {
    throw new Error("Error fetching character's homeworld");
  }
};
