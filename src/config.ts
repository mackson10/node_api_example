import fs from "fs";
import path from "path";

export default getConfig();

/**
 * Returns the config object
 * @return {Config} settings from environment
 */
function getConfig(): Config {
  const envFileName = ".env";

  loadEnviromentFromFile(process.cwd() + "/" + envFileName);

  return {
    port: getFromEnvironment("PORT"),
    p: getFromEnvironment("P")
  };
}

/**
 * Extracts the environment variables from the .env file and merges them to the process.env object
 * @param {String} filePath path to the .env file
 */
function loadEnviromentFromFile(filePath: string): void {
  const normalizedFilePath = path.normalize(filePath);

  if (!fs.existsSync(normalizedFilePath))
    throw new Error(".env file not found");

  const fileString = fs.readFileSync(normalizedFilePath).toString();
  const lines = fileString.split(";");

  lines.forEach(line => {
    const lineSplit = line.split("=");

    const key = lineSplit[0];
    const value = lineSplit[1];

    if (key && value) process.env[key.trim()] = value.trim();
  });
}

/**
 * Verify if some env variable exists, if yes returns it, otherwise throws an Error
 * @param {string} envKey Key in the .env File
 * @return {string} corresponding env variable's value
 * @throws {Error} not defined error
 */
function getFromEnvironment(envKey: string): string {
  if (process.env[envKey] === undefined) {
    throw new Error(`Environment Variable "${envKey}" not defined`);
  }

  return process.env[envKey] as string;
}

/**
 * Config object's keys
 */
type EnvironmentVariablesNames = "port" | "p";

/**
 * Config Object from Environment
 */
type Config = Record<EnvironmentVariablesNames, string>;
