import {
  TimeOfDay,
  WeatherLocation,
  Condition,
  Season,
  WeatherResponse,
} from "../types";
import { getPrecipitationDegree } from "./get-precipitation-degree";
import { getSeason, getTimeOfDay, getWindDirection } from ".";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetches weather for a location and returns fully prepared WeatherData.
 * timeOfDay is computed internally using sunrise/sunset from API.
 */
export async function getWeather(
  location: WeatherLocation,
  apiKey: string,
): Promise<WeatherResponse> {
  if (!apiKey) {
    throw new Error("Weather API key is required");
  }

  const query = buildQuery(location);
  const url = new URL(OPENWEATHER_BASE_URL);
  url.search = `${query}&appid=${apiKey}&units=imperial`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return parseWeatherResponse(data);
}

function buildQuery(location: WeatherLocation): string {
  switch (location.type) {
    case "city":
      return `q=${encodeURIComponent(location.city)}`;
    case "coords":
      return `lat=${location.lat}&lon=${location.lon}`;
  }
}

function parseWeatherResponse(data: any): WeatherResponse {
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  const timeOfDay: TimeOfDay = getTimeOfDay({ sunrise, sunset });
  const utcSeconds = data.dt;
  const offsetSeconds = data.timezone;

  // compute the local epoch seconds
  const localSeconds = utcSeconds + offsetSeconds;

  // create a Date object from milliseconds
  const localDate = new Date(localSeconds * 1000);
  const observedAtLocal = localDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  console.log(observedAtLocal);

  const season: Season = getSeason({
    date: new Date(data.dt * 1000),
    latitude: data.coord.lat,
  });

  const [weatherItem] = data.weather;

  return {
    location: {
      locationId: weatherItem.id,
      name: data.name,
      coordinates: {
        lon: data.coord.lon,
        lat: data.coord.lat,
      },
      timezone: {
        offsetSeconds: data.timezone,
        offsetHours: data.timezone / 3600,
        observedAtLocal: observedAtLocal,
        utcSeconds: data.dt,
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
