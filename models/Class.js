const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassScheme = new Schema({
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: "lecturers"
  },
  classname: {
    type: String,
    require: true
  },
  courseID: {
    type: String,
    require: true
  }
});

module.exports = Class = mongoose.model("classes", ProfileSchema);
