const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const id = Number(request.params.movieId);
  if (Number.isNaN(id)) {
    return next({ status: 400, message: `movieId is not a number` });
  }
  const movie = await service.read(id);
  if (movie) {
    response.locals.movie = movie;
    return next();  
  }
}

async function read(request, response) {
  const movie = response.locals.movie;
  response.json({ data: "" });
}

async function list(request, response) {
const data = request.query.is_showing === "true"
  ? await service.listShowing()
  : await service.list();
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
