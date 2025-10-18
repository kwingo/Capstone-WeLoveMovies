const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const { reviewId } = request.params;
  const review = await service.read(Number(reviewId));
  if (review) {
    response.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review ${reviewId} cannot be found.` });
}

async function destroy(request, response) {
  const { review } = response.locals;
  await service.destroy(review.review_id);
  // 204 must not include a response body
  return response.sendStatus(204);
}

async function list(request, response) {
  

  response.json({  });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
const { review } = response.locals;
if (review) {
  const updatedReview = {
    ...review,
    ...request.body.data,
  };
  const data = await service.update(updatedReview);
  return response.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
