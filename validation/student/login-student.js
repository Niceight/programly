const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.studentID = !isEmpty(data.studentID) ? data.studentID : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.studentID, { min: 10, max: 10 })) {
    errors.studentID = "Student ID must be valid";
  }

  if (Validator.isEmpty(data.studentID)) {
    errors.studentID = "Student ID field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
