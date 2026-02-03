import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)$",
  collectCoverage: true,
  coverageDirectory: "coverage",
  verbose: true,
};

export default config;
