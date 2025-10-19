require("dotenv").config();
const { DATABASE_URL, DATABASE_SSL } = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL || "postgres://localhost:5432/welovemovies_dev",
      ssl: DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    },
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  test: {
    client: "sqlite3",
    connection: { filename: ":memory:" },
    useNullAsDefault: true,
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" }
  },
};

