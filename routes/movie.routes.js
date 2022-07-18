const express = require("express");
const router = express.Router();
const {
  createMovie,
  getSingleMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

router.route("/").post(createMovie).get(getMovies);
router
  .route("/:movieId")
  .post(getSingleMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;
