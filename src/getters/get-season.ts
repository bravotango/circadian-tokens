import { GetSeasonProps } from "../types";

export const getSeason = ({ date, latitude }: GetSeasonProps) => {
  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();
  const isNorthernHemisphere = latitude >= 0;

  if (isNorthernHemisphere) {
    // Northern Hemisphere
    if (
      (month === 3 && day >= 20) ||
      (month > 3 && month < 6) ||
      (month === 6 && day < 21)
    )
      return "spring";
    if (
      (month === 6 && day >= 21) ||
      (month > 6 && month < 9) ||
      (month === 9 && day < 23)
    )
      return "summer";
    if (
      (month === 9 && day >= 23) ||
      (month > 9 && month < 12) ||
      (month === 12 && day < 21)
    )
      return "autumn";
    return "winter"; // Dec 21 – Mar 19
  } else {
    // Southern Hemisphere (opposite seasons)
    if (
      (month === 3 && day >= 20) ||
      (month > 3 && month < 6) ||
      (month === 6 && day < 21)
    )
      return "autumn";
    if (
      (month === 6 && day >= 21) ||
      (month > 6 && month < 9) ||
      (month === 9 && day < 23)
    )
      return "winter";
    if (
      (month === 9 && day >= 23) ||
      (month > 9 && month < 12) ||
      (month === 12 && day < 21)
    )
      return "spring";
    return "summer";
  }
};
