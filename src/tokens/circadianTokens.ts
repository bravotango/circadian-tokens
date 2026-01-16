import type { TimeOfDay, Current, Wind } from "../types";

export type CircadianTokens = {
  timeOfDay: TimeOfDay;
  current: Current;
  wind: Wind;
};
