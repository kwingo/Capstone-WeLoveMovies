const app = require("./app");
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  const knex = require("./db/connection");
  knex.migrate.latest().then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
} else {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
