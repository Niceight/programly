const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomScheme = new Schema({
  classroomName: {
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
  student: {
    type: [Schema.Types.ObjectId],
    ref: "students"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Classroom = mongoose.model("classrooms", ClassroomScheme);
