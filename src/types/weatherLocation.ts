export type WeatherLocation =
  | {
      type: "city";
      city: string;
    }
  | {
      type: "coords";
      lat: number;
      lon: number;
    };
