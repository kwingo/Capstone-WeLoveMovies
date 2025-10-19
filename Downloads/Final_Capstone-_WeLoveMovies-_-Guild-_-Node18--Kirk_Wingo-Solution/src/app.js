const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const methodNotAllowed = require("./errors/methodNotAllowed");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;

// Helpers
function notFound(_req, res, _next) {
  res.status(404).json({ error: "Path not found" });
}

function errorHandler(err, _req, res, _next) {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
}
