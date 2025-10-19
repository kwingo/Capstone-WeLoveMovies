require("dotenv").config();

const migrations = { directory: "src/db/migrations" };
const seeds = { directory: "src/db/seeds" };

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/welovemovies",
    migrations,
    seeds,
  },

  test: {
    client: "sqlite3",
    connection: { filename: ":memory:" },
    useNullAsDefault: true,          
    migrations,
    seeds,
    pool: {
      afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    },
    migrations,
    seeds,
    pool: { min: 0, max: 10 },
  },
};
