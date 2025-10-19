exports.up = (knex) =>
  knex.schema.createTable("critics", (t) => {
    t.increments("critic_id").primary();
    t.string("preferred_name");
    t.string("surname");
    t.string("organization_name");
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists("critics");
