const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Progress = require("../../models/Progress");

/**
 * @route   POST api/progress/
 * @desc    Create or update progress
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("student-rule", { session: false }),
  (req, res) => {
    const progression = {};
    progression.student = req.body.student;
    progression.exercise = req.body.exercise;
    progression.codeSnippetAnswer = req.body.codeSnippet;

    Progress.findOne({
      student: progression.student,
      exercise: progression.exercise
    }).then(progress => {
      if (progress) {
        // Update
        Progress.findOneAndUpdate(
          { student: progression.student, exercise: progression.exercise },
          { $set: progression },
          { new: true }
        ).then(progress => res.json(progress));
      } else {
        // Create
        new Progress(progression).save().then(progress => res.json(progress));
      }
    });
  }
);

/**
 * @route   GET api/progress/current/:student_id/:exercise_id
 * @desc    Get curremt progress og student
 * @access  Private
 */
router.get(
  "/current/:student_id/:exercise_id",
  passport.authenticate("student-rule", { session: false }),
  async (req, res) => {
    await Progress.find(
      { student: req.params.student_id, exercise: req.params.exercise_id },
      (err, progress) => {
        // Check student ID
        if (req.params.student_id !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        // More errors
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: progress });
      }
    ).catch(err => console.log(err));
  }
);

/**
 * @route   GET api/progress/all/:student_id
 * @desc    Get all progress own by og student for other student
 * @access  Private
 */
router.get(
  "/all/:student_id",
  passport.authenticate("student-rule", { session: false }),
  async (req, res) => {
    await Progress.find({ student: req.params.student_id }, (err, progress) => {
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: progress });
    }).catch(err => console.log(err));
  }
);

/**
 * @route   GET api/progress/id/:id
 * @desc    Get progress
 * @access  Private
 */
router.get(
  "/id/:id",
  passport.authenticate("student-rule", { session: false }),
  async (req, res) => {
    await Progress.findOne({ _id: req.params.id }, (err, progress) => {
      // Check if the exercise exist
      if (!progress) {
        return res
          .status(404)
          .json({ success: false, error: "Exercise not found" });
      }
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: progress });
    }).catch(err => console.log(err));
  }
);

module.exports = router;
