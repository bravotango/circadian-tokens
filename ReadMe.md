# circadian-tokens

Context-aware design tokens driven by real-world weather data.

`@bravotango/circadian-tokens` transforms live weather data into structured UI variables — enabling interfaces that respond to season, time of day, wind direction, and environmental conditions.

---

## Features

- 🌤 Converts live weather data into structured token objects
- 🌅 Automatic season and time-of-day computation
- 💨 Wind direction and precipitation modeling
- 🎨 Designed for adaptive and ambient UI systems
- ♻️ Framework agnostic (React-ready)
- ✅ Fully unit tested

---

## Installation

```bash
npm install @bravotango/circadian-tokens
```

---

## Requirements

This package relies on live weather data from OpenWeather.

Create an account and generate an API key:

https://openweathermap.org/

Then expose your key via environment variables:

```bash
OPENWEATHER_API_KEY="your-api-key"
```

---

## Usage

```ts
import { getCircadianTokens } from "@bravotango/circadian-tokens";

const tokens = await getCircadianTokens(
  { type: "coords", lon: -122.2054, lat: 47.7623 },
  process.env.OPENWEATHER_API_KEY!,
);

console.log(tokens.wind.directionFrom);
console.log(tokens.season);
console.log(tokens.timeOfDay);
```

---

## Example Response Shape

```ts
{
    "location": {
        "locationId": 803,
        "name": "Seattle",
        "coordinates": {
            "lon": -122.3321,
            "lat": 47.6062
        },
        "timezone": {
            "offsetSeconds": -28800,
            "offsetHours": -8,
            "observedAtLocal": "Feb 18, 10:14 AM",
            "utcSeconds": 1771438495
        }
    },
    "season": "winter",
    "timeOfDay": "day",
    "current": {
        "condition": "clouds",
        "description": "broken clouds",
        "id": 803,
        "icon": "04d",
        "temperature": 38.68
    },
    "wind": {
        "speed": 8.05,
        "directionFrom": "S",
        "degrees": 200,
        "precipitationDegree": -33,
        "gusts": 8.05
    }
}
```

---

## API

### getCircadianTokens(location, apiKey)

Fetches weather data and returns a fully normalized `WeatherResponse` object.

### Parameters

| Name     | Type            | Description                                                                        |
| -------- | --------------- | ---------------------------------------------------------------------------------- |
| location | WeatherLocation | `{ type: "city", city: string }` or `{ type: "coords", lat: number, lon: number }` |
| apiKey   | string          | Your OpenWeather API key                                                           |

---

## Testing

Run the test suite:

```
pnpm run test
```

All core token generators are fully unit tested.

---

## License

[![License: MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This material licensed under the "The MIT License".

---

## Author

Brian Tracy  
https://github.com/bravotango
