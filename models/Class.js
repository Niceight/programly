const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassScheme = new Schema({
  classname: {
    type: String,
    require: true
  },
  courseID: {
    type: String,
    require: true
  },
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: "lecturers"
  },
  exercise: {
    type: [Schema.Types.ObjectId],
    ref: "exercises"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Class = mongoose.model("classes", ClassScheme);
