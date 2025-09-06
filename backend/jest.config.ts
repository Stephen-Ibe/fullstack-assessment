import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
};

export default config;
