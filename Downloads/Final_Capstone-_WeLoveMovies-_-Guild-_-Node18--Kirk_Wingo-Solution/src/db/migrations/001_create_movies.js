exports.up = (knex) =>
  knex.schema.createTable("movies", (t) => {
    t.increments("movie_id").primary();
    t.string("title");
    t.integer("runtime_in_minutes");
    t.string("rating");
    t.text("description");
    t.string("image_url");
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("movies");
