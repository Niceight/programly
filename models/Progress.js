const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressScheme = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "students"
  },
  exercise: {
    type: Schema.Types.ObjectId,
    ref: "exercises"
  },
  codeSnippetAnswer: {
    type: String,
    default: "none"
  }
});

ProgressScheme.set("timestamps", true);

module.exports = Progress = mongoose.model("progression", ProgressScheme);
