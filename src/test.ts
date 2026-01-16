import "dotenv/config";
import { getWeather } from "./getters/index.js";

async function run() {
  const weatherData = await getWeather(
    { type: "city", city: "Seattle" },
    process.env.WEATHER_API_KEY!
  );
  console.log(weatherData);
}

run();
