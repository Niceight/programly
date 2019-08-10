const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Exercise = require("../../models/Exercise");

// Validation
const validateExerciseInput = require("../../validation/exercise/exercise");

/**
 * @route   GET api/exercises/test
 * @desc    Tests exercises route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Exercises Works" }));

/**
 * @route   POST api/exercises
 * @desc    Create exercises
 * @access  Private
 */
router.post(
  "/new-exercise",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExerciseInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newExercise = new Exercise({
      topicName: req.body.topicName,
      topic: req.body.topic,
      question: req.body.question,
      content: req.body.content,
      answer: req.body.answer,
      lecturer: req.user.id
    });

    newExercise.save().then(exercise => res.json(exercise));
  }
);

/**
 * @route   POST api/exercises/:id
 * @desc    Update exercises
 * @access  Private
 */
router.post(
  "/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExerciseInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Exercise.findOne({ _id: req.params.id }, (err, exercise) => {
      if (err) {
        return res.status(404).json({
          //err,
          message: "Exercise not found!"
        });
      }

      exercise.topicName = req.body.topicName;
      exercise.topic = req.body.topic;
      exercise.question = req.body.question;
      exercise.content = req.body.content;
      exercise.answer = req.body.answer;
      exercise.lecturer = req.user.id;

      Exercise.findOneAndUpdate(
        { _id: req.params.id },
        { $set: exercise },
        { new: true }
      ).then(exercise => res.json(exercise));
    });
  }
);

/**
 * @route   GET api/exercises/:lecturer_id
 * @desc    Get all exercises own by the lecturer
 * @access  Private
 */
router.get("/:lecturer_id", async (req, res) => {
  await Exercise.find(
    { lecturer: req.params.lecturer_id },
    (err, exercises) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: exercises });
    }
  ).catch(err => console.log(err));
});

/**
 * @route   GET api/exercises/:id
 * @desc    Get exercise
 * @access  Private
 */
router.get("/:lecturer_id/:id", async (req, res) => {
  await Exercise.findOne({ _id: req.params.id }, (err, exercises) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, data: exercises });
  }).catch(err => console.log(err));
});
module.exports = router;
