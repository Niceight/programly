const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LecturerSchema = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  matrixID: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  //   avatar: {
  //     type: String,
  //   },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lecturer = mongoose.model("lecturers", LecturerSchema);
