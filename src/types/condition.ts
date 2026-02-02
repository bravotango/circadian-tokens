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
