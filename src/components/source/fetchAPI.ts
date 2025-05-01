import { WeatherData } from "./types";

const cache = new Map<string, { data: WeatherData, timestamp: number }>();

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_API_KEY;

export const fetchWeather = async (
  city: string,
  date: Date = new Date(),
  lang: string = "en"
): Promise<WeatherData> => {
  const formattedDate = date.toISOString().split("T")[0];
  const cacheKey = `${city.toLowerCase()}_${formattedDate}_${lang}`;
  const now = Date.now();

  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < 2 * 60 * 1000) {
    console.log("Using cached data");
    return cached.data;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${formattedDate}&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: now });
    console.log("Fetched from API");
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

