const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(config);
module.exports = knex;
