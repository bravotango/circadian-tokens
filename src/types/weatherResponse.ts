import { Current, Location, Season, TimeOfDay, Wind } from "./";

export type WeatherResponse = {
  season: Season;
  timeOfDay: TimeOfDay;
  current: Current;
  wind: Wind;
  location: Location;
};
