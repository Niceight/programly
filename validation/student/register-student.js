const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.studentID = !isEmpty(data.studentID) ? data.studentID : "";
  data.programID = !isEmpty(data.programID) ? data.programID : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "First name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First name field is required";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last name field is required";
  }

  if (!Validator.isLength(data.studentID, { min: 10, max: 10 })) {
    errors.studentID = "Student ID must be valid";
  }

  if (Validator.isEmpty(data.studentID)) {
    errors.studentID = "Student ID field is required";
  }

  if (Validator.isEmpty(data.programID)) {
    errors.programID = "Program ID field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
