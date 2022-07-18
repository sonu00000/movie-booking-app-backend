/**
 * Movie Model having attributes - name, description, casts, trailer url, poster url,
 * language, release date, releaseStatus
 */

const mongoose = require("mongoose");
const {
  languages: { hindi, english, bengali, tamil, telugu },
  releaseStatuses: { released, comingSoon },
} = require("../utils/constants");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    casts: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    trailerUrls: {
      type: [String],
      required: true,
    },
    posterUrls: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      //required: true,
      default: hindi,
      enum: {
        values: [hindi, english, bengali, tamil, telugu],
        message: "{VALUE} is not supported",
      },
    },
    releaseDate: {
      type: Date,
    },
    releaseStatus: {
      type: String,
      required: true,
      default: released,
      enum: {
        values: [released, comingSoon],
        message: "{VALUE} is not supported",
      },
    },
    imdbRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
