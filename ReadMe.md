# circadian-tokens

## Description

@bravotango/circadian-tokens is a context driven design token engine that converts real-time weather data into structured UI variables.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

`npm install @bravotango/circadian-tokens`

### Requirements

circadian-tokens relies on live weather data from OpenWeather.

You must obtain your own API key from:

https://openweathermap.org/

After creating an account, generate an API key from your dashboard and provide it to your application via environment variables.

`WEATHER_API_KEY="your-openweathermap.org-api-key"`

## Usage

Instead of hard coded themes, circadian-tokens enables interfaces to adapt to the physical world, creating ambient, location aware UI experiences.

### api/weather/routes.ts

Here is a Next.js example route that populates the tokens with @bravotango/circadian-tokens getWeather().

```
import { NextRequest, NextResponse } from "next/server";
import { getWeather } from "@bravotango/circadian-tokens";

export async function GET(req: NextRequest) {
try {
const { city, lon, lat } = Object.fromEntries(req.nextUrl.searchParams);

    let tokens;

    if (city) {
      tokens = await getWeather(
        { type: "city", city },
        process.env.WEATHER_API_KEY!,
      );
    } else if (lon && lat) {
      tokens = await getWeather(
        { type: "coords", lon: Number(lon), lat: Number(lat) },
        process.env.WEATHER_API_KEY!,
      );
    } else {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    return NextResponse.json(tokens);

  } catch (err) {
    console.error("Failed to fetch weather:", err);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 },
    );
  }
}
```

## License

[![License: MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This material licensed under the "The MIT License". All rights not explicitly granted in the "The MIT License" are reserved.

## Contributing

Author's gitHub profiles:

[https://github.com/@bravotango](https://github.com/@bravotango)<br/>

## Tests

### Jest

```
  "devDependencies": {
    "jest": "^30.2.0",
    "ts-jest": "^29.4.6"
  }
```

`pnpm run test`

| File                        | % Stmts | % Branch | % Funcs | % Lines |
| --------------------------- | ------- | -------- | ------- | ------- |
| All files                   | 100     | 100      | 100     | 100     |
| get-precipitation-degree.ts | 100     | 100      | 100     | 100     |
| get-season.ts               | 100     | 100      | 100     | 100     |
| get-time-of-day.ts          | 100     | 100      | 100     | 100     |
| get-weather.ts              | 100     | 100      | 100     | 100     |
| get-wind-direction.ts       | 100     | 100      | 100     | 100     |
| index.ts                    | 100     | 100      | 100     | 100     |

Test Suites: 5 passed, 5 total<br/>
Tests: 45 passed, 45 total<br/>
Snapshots: 0 total<br/>
Time: 2.28 s<br/>
Ran all test suites.

## Questions

Repository owner:
[https://github.com/@bravotango](https://github.com/@bravotango)

Repository email:
<a href="mailto:brian.tracy@btgraphix.com">brian.tracy@btgraphix.com</a>
