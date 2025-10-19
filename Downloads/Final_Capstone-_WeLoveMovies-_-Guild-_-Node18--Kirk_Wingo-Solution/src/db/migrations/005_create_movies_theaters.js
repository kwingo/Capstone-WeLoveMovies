exports.up = (knex) =>
  knex.schema.createTable("movies_theaters", (t) => {
    t.integer("movie_id").unsigned()
      .references("movie_id").inTable("movies").onDelete("cascade");
    t.integer("theater_id").unsigned()
      .references("theater_id").inTable("theaters").onDelete("cascade");
    t.boolean("is_showing").defaultTo(false);
    t.timestamps(true, true);
    t.primary(["movie_id", "theater_id"]);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("movies_theaters");
