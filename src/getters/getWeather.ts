import {
  TimeOfDay,
  Current,
  Wind,
  WeatherLocation,
  Condition,
  Season,
  Location,
} from "../types";
import { getPrecipitationDegree } from "./getPrecipitationDegree";
import { getSeason, getTimeOfDay, getWindDirection } from "./index.js";

/**
 * Fetches weather for a location and returns fully prepared WeatherData.
 * timeOfDay is computed internally using sunrise/sunset from API.
 */

type WeatherResponse = {
  season: Season;
  timeOfDay: TimeOfDay;
  current: Current;
  wind: Wind;
  location: Location;
};

export async function getWeather(
  location: WeatherLocation,
  apiKey: string,
): Promise<WeatherResponse> {
  if (!apiKey) throw new Error("Weather API k1ey is required");
  let query: string;

  switch (location.type) {
    case "city":
      query = `q=${encodeURIComponent(location.city)}`;
      break;

    case "coords":
      query = `lat=${location.lat}&lon=${location.lon}`;
      break;
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = `${query}&appid=${apiKey}&units=imperial`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`);

  const data = await response.json();

  // API returns sunrise/sunset as Unix timestamps
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  const timeOfDay: TimeOfDay = getTimeOfDay({ sunrise, sunset });
  const season = getSeason({
    date: new Date(data.dt * 1000),
    latitude: data.coord.lat,
  });

  const [weatherItem] = data.weather;
  console.log({ data });

  return {
    location: {
      locationId: weatherItem.id,
      name: data.name,
      coordinates: { lon: data.coord.lon, lat: data.coord.lat },
      timezone: {
        offsetSeconds: data.timezone,
        offsetHours: data.timezone / 3600,
      },
    },
    season,
    timeOfDay,
    current: {
      condition: weatherItem.main.toLowerCase() as Condition,
      description: weatherItem.description,
      id: weatherItem.id,
      icon: weatherItem.icon,
      temperature: data.main.temp,
    },
    wind: {
      speed: data.wind.speed,
      directionFrom: getWindDirection(data.wind.deg),
      degrees: data.wind.deg,
      precipitationDegree: getPrecipitationDegree(
        data.wind.deg,
        data.wind.speed,
      ),
      gusts: data.wind.gust ?? data.wind.speed,
    },
  };
}
