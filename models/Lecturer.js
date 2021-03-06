const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  staffID: {
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
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lecturer = mongoose.model("lecturers", LecturerSchema);
