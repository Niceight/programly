const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const lecturers = require("./routes/api/lecturers");
const students = require("./routes/api/students");
const classrooms = require("./routes/api/classrooms");
const exercises = require("./routes/api/exercises");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/lecturers", lecturers);
app.use("/api/students", students);
app.use("/api/classrooms", classrooms);
app.use("/api/exercises", exercises);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
