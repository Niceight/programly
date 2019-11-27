const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseScheme = new Schema({
  topicName: {
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
  question: {
    type: String,
    required: true
  },
  content: {
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
