import type { Current, Location, Season, TimeOfDay, Wind } from "../types";

export type CircadianTokens = {
  current: Current;
  season: Season;
  timeOfDay: TimeOfDay;
  wind: Wind;
  location: Location;
};
