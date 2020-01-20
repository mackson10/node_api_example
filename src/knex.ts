import knex from "knex";
import config from "./config";

export default createConnection();

function createConnection(): knex {
  const { host, user, password, database } = config.mysql;
  const conn = knex({
    client: "mysql",
    debug: false, // useful
    connection: {
      host,
      user,
      password,
      database
    }
  });

  return conn;
}
