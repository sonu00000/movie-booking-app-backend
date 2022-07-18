const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      default: 200,
      required: true,
    },
    moviesPlaying: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Movie",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theatre", theatreSchema);
