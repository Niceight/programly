const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressScheme = new Schema({
  Student: {
    type: Schema.Types.ObjectId,
    ref: "students"
  },
  Exercise: {
    type: Scheme.Types.ObjectId,
    ref: "exercises"
  },
  content: {
    type: String
  }
});

ExerciseScheme.set("timestamps", true);

module.exports = Progress = mongoose.model("progression", ProgressScheme);
