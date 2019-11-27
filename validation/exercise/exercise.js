const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateExerciseInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";
  data.topic = !isEmpty(data.topic) ? data.topic : "";
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : "";

  if (!Validator.isLength(data.question, { min: 10, max: 300 })) {
    errors.question = "Question must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required";
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = "Topic field is required";
  }

  if (Validator.isEmpty(data.difficulty)) {
    errors.difficulty = "Difficulty field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
