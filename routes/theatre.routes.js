const express = require("express");
const router = express.Router();
const {
  createTheatre,
  getAlltheatres,
  getSingletheatre,
  updateTheatre,
  deleteTheatre,
  addOrRemoveMoviesToSingleTheatre,
  getMoviesInSingleTheatre,
  getSingleMovieInSingleTheatre,
} = require("../controllers/theatre.controller");
const { validateTheatre } = require("../middlewares/validate.theatre");

router.route("/").post([validateTheatre], createTheatre).get(getAlltheatres);
router
  .route("/:theatreId")
  .get(getSingletheatre)
  .put(updateTheatre)
  .delete(deleteTheatre);

//Add/Remove movies inside theatre
////Get all movies inside a theatre
router
  .route("/:theatreId/movies")
  .put(addOrRemoveMoviesToSingleTheatre)
  .get(getMoviesInSingleTheatre);

//Get specific movie inside theatre
router.route("/:theatreId/movies/:movieId").get(getSingleMovieInSingleTheatre);

module.exports = router;
