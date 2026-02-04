import { GetSeasonProps } from "../types";

export const getSeason = ({ date, latitude }: GetSeasonProps) => {
  const month = date.getUTCMonth() + 1;
  const isNorthernHemisphere = latitude >= 0;

  if (isNorthernHemisphere) {
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  } else {
    if (month >= 3 && month <= 5) return "autumn";
    if (month >= 6 && month <= 8) return "winter";
    if (month >= 9 && month <= 11) return "spring";
    return "summer";
  }
};
