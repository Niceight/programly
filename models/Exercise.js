const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseScheme = new Schema({
  question: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  codeSnippet: {
    type: String,
    default: "none"
  },
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: "lecturers",
    required: true
  }
});

ExerciseScheme.set("timestamps", true);

module.exports = Exercise = mongoose.model("exercises", ExerciseScheme);
