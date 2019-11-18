const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateExerciseInput(data) {
  let errors = {};

  data.topicName = !isEmpty(data.topicName) ? data.topicName : "";
  data.topic = !isEmpty(data.topic) ? data.topic : "";
  data.difficulty = !isEmpty(data.difficulty) ? data.difficulty : "";
  data.question = !isEmpty(data.question) ? data.question : "";

  if (!Validator.isLength(data.topicName, { min: 5, max: 35 })) {
    errors.topicName = "Topic name must be between 5 and 35 characters";
  }

  if (Validator.isEmpty(data.topicName)) {
    errors.topicName = "Topic name field is required";
  }

  if (Validator.isEmpty(data.topic)) {
    errors.topic = "Topic field is required";
  }

  if (Validator.isEmpty(data.difficulty)) {
    errors.difficulty = "Difficulty field is required";
  }

  if (!Validator.isLength(data.question, { min: 10, max: 300 })) {
    errors.question = "Question must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
