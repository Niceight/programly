const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateClassroomInput(data) {
  let errors = {};

  data.classroomName = !isEmpty(data.classroomName) ? data.classroomName : "";
  data.courseID = !isEmpty(data.courseID) ? data.courseID : "";

  if (!Validator.isLength(data.classroomName, { min: 8, max: 9 })) {
    errors.classroomName = "Classroom name must be valid";
  }

  if (Validator.isEmpty(data.classroomName)) {
    errors.classroomName = "Classroom name field is required";
  }

  if (!Validator.isLength(data.courseID, { min: 6, max: 6 })) {
    errors.courseID = "Course ID must be valid";
  }

  if (Validator.isEmpty(data.courseID)) {
    errors.courseID = "Course ID field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
