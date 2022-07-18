const { query } = require("express");
const Movie = require("../models/movie.model");

const getSingleMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne({ _id: movieId });

    if (!movie) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Movie id: ${movieId} doesn't exist`,
        });
    }

    return res.status(200).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const queryObj = {};

    //support filter movies based on movie name, release status and actor name
    const { name, releaseStatus, actor } = req.query;
    if (name) {
      queryObj.name = name;
    }
    if (releaseStatus) {
      queryObj.releaseStatus = releaseStatus;
    }
    if (actor) {
      queryObj.casts = { $in: [actor] };
    }
    /**Alternative way for find by actor name*/
    // if (actor) {
    //   queryObj.casts = { $elemMatch: { $eq: actor } };
    // }
    const movies = await Movie.find(queryObj);
    return res.status(201).json({ success: true, movies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId });

    if (!movie) {
      return res
        .status(400)
        .json({ success: false, message: `Movie doesn't exist` });
    }

    const {
      name,
      description,
      casts,
      director,
      trailerUrls,
      posterUrls,
      language,
      releaseStatus,
      releaseDate,
      imdbRating,
    } = req.body;

    //update the movie attribute values
    movie.name = name != undefined ? name : movie.name;
    movie.description =
      description != undefined ? description : movie.description;
    movie.casts = casts != undefined ? casts : movie.casts;
    movie.director = director != undefined ? director : movie.director;
    movie.trailerUrls =
      trailerUrls != undefined ? trailerUrls : movie.trailerUrls;
    movie.posterUrls = posterUrls != undefined ? posterUrls : movie.posterUrls;
    movie.language = language != undefined ? language : movie.language;
    movie.releaseStatus =
      releaseStatus != undefined ? releaseStatus : movie.releaseStatus;
    movie.releaseDate =
      releaseDate != undefined ? releaseDate : movie.releaseDate;
    movie.imdbRating = imdbRating != undefined ? imdbRating : movie.imdbRating;

    //save the updated movie obj in db
    const updatedMovie = await movie.save();

    return res.status(200).json({ success: true, updatedMovie });
  } catch (error) {}
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findByIdAndDelete({ _id: movieId });

    if (!movie) {
      return res.status(400).json({
        success: false,
        message: `Movie id: ${movieId} doesn't exist`,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: `Movie '${movie.name}' removed!` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createMovie,
  getSingleMovie,
  getMovies,
  updateMovie,
  deleteMovie,
};
