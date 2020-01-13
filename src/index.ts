import http from "http";
import app from "./app";
import config from "./config";
import knex from "./knex";

const { port } = config;

(async function(): Promise<void> {
  try {
    await testDBConnection();
    console.log("DB connection is OK");
    startHTTPServer();
  } catch (e) {
    console.log("DB connection error!");
  }
})();

async function testDBConnection(): Promise<void> {
  await knex.select(1);
}

async function startHTTPServer(): Promise<void> {
  http
    .createServer(app)
    .listen(port, (): void =>
      console.log(`HTTP Server listening on port ${port}`)
    );
  return;
}
