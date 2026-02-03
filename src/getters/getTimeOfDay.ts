import type { TimeOfDay } from "../types/timeOfDay";

type GetTimeOfDayProps = {
  sunrise: Date;
  sunset: Date;
};

// Returns the current time of day based on sunrise/sunset
export function getTimeOfDay({
  sunrise,
  sunset,
}: GetTimeOfDayProps): TimeOfDay {
  const time = new Date().getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();
  const ONE_HOUR = 60 * 60 * 1000;

  if (time < sunriseTime) return "night";
  if (time < sunriseTime + ONE_HOUR) return "sunrise";
  if (time < sunsetTime - ONE_HOUR) return "day";
  if (time <= sunsetTime) return "sunset";
  return "night";
}
