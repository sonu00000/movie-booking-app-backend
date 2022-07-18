const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

const createTheatre = async (req, res) => {
  try {
    const { name, description, city, pincode, totalSeats } = req.body;

    const theatre = await Theatre.create({
      name,
      description,
      city,
      pincode,
      totalSeats,
    });
    return res.status(201).json({ success: true, theatre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAlltheatres = async (req, res) => {
  try {
    const { city, pincode } = req.query;
    const queryObj = {};

    if (city) {
      queryObj.city = city;
    }
    if (pincode) {
      queryObj.pincode = pincode;
    }

    const theatres = await Theatre.find(queryObj);
    return res
      .status(200)
      .json({ success: true, theatres, count: theatres.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSingletheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findOne({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }
    return res.status(200).json({ success: true, theatre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findOne({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }

    const { name, description, city, pincode, totalSeats } = req.body;

    theatre.name = name != undefined ? name : theatre.name;
    theatre.description =
      description != undefined ? description : theatre.description;
    theatre.city = city != undefined ? city : theatre.city;
    theatre.pincode = pincode != undefined ? pincode : theatre.pincode;
    theatre.totalSeats =
      totalSeats != undefined ? totalSeats : theatre.totalSeats;

    const updateTheatre = await theatre.save();

    return res.status(200).json({ success: true, updateTheatre });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findOneAndDelete({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }

    return res.status(200).json({
      success: true,
      message: `Theatre with name: ${theatre.name} is removed!`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addOrRemoveMoviesToSingleTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findOne({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }

    //get the list of movie with ids and add property (if add == true -> insert the movieIds, else remove)
    const { movies, add } = req.body;

    //Alternative to check whether all the movies passed in the request body are valid (efficient)
    /*const moviesInDB = await Movie.find({_id: {$in: movies}});
    if(!moviesInDB) {
      return res.status(404).json({success: false, message: `One or some of the movies that you are trying to add/remove doesn't exist`});
    }*/

    //check whether all the movies passed in the request body are valid
    movies.forEach(async (movieId) => {
      const movie = await Movie.findOne({ _id: movieId });
      //if even a single movie id is invalid, return from the controller without any updation
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: `Movie Id: ${movieId} that you are trying to add/remove doesn't exist`,
        });
      }
    });

    if (add) {
      //insert the movie ids
      theatre.moviesPlaying.push(...movies);
    } else {
      //delete the movieIds
      for (let movieId of movies) {
        //find the index of movieId that you need to delete
        let idx = theatre.moviesPlaying.indexOf(movieId);
        if (idx > -1) {
          theatre.moviesPlaying.splice(idx, 1);
        }
      }
    }

    const updatedTheatre = await theatre.save();

    return res.status(200).json({
      success: true,
      theatre: updatedTheatre,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMoviesInSingleTheatre = async (req, res) => {
  try {
    const { theatreId } = req.params;

    const theatre = await Theatre.findOne({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }

    const movies = await Movie.find({ _id: { $in: theatre.moviesPlaying } });

    return res
      .status(200)
      .json({ success: true, movies, count: movies.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleMovieInSingleTheatre = async (req, res) => {
  try {
    const { theatreId, movieId } = req.params;

    const theatre = await Theatre.findOne({ _id: theatreId });

    if (!theatre) {
      return res
        .status(400)
        .json({ success: false, message: `This Theatre doesn't exist` });
    }

    const idx = theatre.moviesPlaying.indexOf(movieId);

    if (idx === -1) {
      return res.status(200).json({
        success: true,
        message: `Movie id: ${movieId} is not playing in this theatre`,
      });
    }

    const movie = await Movie.find({ _id: movieId });

    return res.status(200).json({ success: true, movie });
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTheatre,
  getAlltheatres,
  getSingletheatre,
  updateTheatre,
  deleteTheatre,
  addOrRemoveMoviesToSingleTheatre,
  getMoviesInSingleTheatre,
  getSingleMovieInSingleTheatre,
};
