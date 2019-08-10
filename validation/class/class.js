const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateExerciseInput(data) {
  let errors = {};

  data.classname = !isEmpty(data.classname) ? data.classname : "";
  data.courseID = !isEmpty(data.courseID) ? data.courseID : "";

  if (!Validator.isLength(data.classname, { min: 8, max: 9 })) {
    errors.classname = "Class name must be valid";
  }

  if (Validator.isEmpty(data.classname)) {
    errors.classname = "Topic name field is required";
  }

  if (!Validator.isLength(data.courseID, { min: 6, max: 6 })) {
    errors.courseID = "Question must be valid";
  }

  if (Validator.isEmpty(data.courseID)) {
    errors.courseID = "Topic field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
