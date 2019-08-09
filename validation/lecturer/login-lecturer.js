const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.staffID = !isEmpty(data.staffID) ? data.staffID : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.staffID)) {
    errors.staffID = "Staff ID field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
