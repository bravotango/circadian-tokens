export type PinPoint = {
  country: string;
  city: string;
  state?: string;
};

export type WeatherLocation =
  | {
      type: "city";
      city: string;
      pinPoint?: PinPoint;
    }
  | {
      type: "coords";
      lat: number;
      lon: number;
      pinPoint?: PinPoint;
    };
