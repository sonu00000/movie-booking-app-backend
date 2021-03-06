const express = require("express");
const { PORT } = require("./configs/server.config");
const { DB_URL } = require("./configs/db.config");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const Movie = require("./models/movie.model");

const app = express();

//pasrse the JSON request into JS objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const movieRouter = require("./routes/movie.routes");
const theatreRouter = require("./routes/theatre.routes");

app.use("/mba/api/v1/auth", authRouter);
app.use("/mba/api/v1/users", userRouter);
app.use("/mba/api/v1/movies", movieRouter);
app.use("/mba/api/v1/theatres", theatreRouter);

//create admin user if not any
const init = async (req, res) => {
  try {
    const user = await User.findOne({ name: "admin" });

    /** create admin user in system */
    if (!user) {
      const adminUser = await User.create({
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("adminSecret", 8),
        type: "admin",
      });
    }
    return;
  } catch (error) {
    console.log(err);
  }
};

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to mongodb");

    //call the init method after you are able to connect to your db
    init();

    /** create seed data */
    // create movies here
    /*const movie1 = await Movie.create({
      name: "Puspa",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "05-25-2022",
    });
    console.log(movie1);
    const movie2 = await Movie.create({
      name: "Puspa 2",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "03-25-2022",
    });
    console.log(movie2);
    const movie3 = await Movie.create({
      name: "RRR",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "02-25-2022",
    });
    console.log(movie3);
    const movie4 = await Movie.create({
      name: "SHAHO",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "01-25-2022",
    });
    console.log(movie4);
    const movie5 = await Movie.create({
      name: "BEAST",
      description: "This is south indian movie.",
      cast: "Allu Arjun",
      director: "Puspraj",
      trailerUrls: "xyz123.com",
      posterUrls: "xyz123.in",
      releaseDate: "06-25-2022",
    });
    console.log(movie5);*/
    //start the server after db is up and running
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
