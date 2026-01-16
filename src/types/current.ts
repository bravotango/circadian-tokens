// Represents weather conditions
export type Atmosphere =
  | "mist"
  | "smoke"
  | "haze"
  | "dust"
  | "fog"
  | "sand"
  | "ash"
  | "squall"
  | "tornado";

export type Condition =
  | "clear"
  | "clouds"
  | "rain"
  | "snow"
  | "thunderstorm"
  | "drizzle"
  | Atmosphere;

export type Current = {
  id: number;
  condition: Condition;
  description: string;
  icon: string;
  temperature: number;
};
