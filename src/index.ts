import http from "http";
import config from "./config";

import app from "./app";

startHTTPServer();

/**
 * Starts the server
 */
function startHTTPServer(): void {
  http
    .createServer(app)
    .listen(config.port, (): void =>
      console.log(`Servidor HTTP ativo na porta ${config.port}`)
    );
  return;
}
