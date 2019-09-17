const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Classroom Model
const Classroom = require("../../models/Classroom");

// Validation
const validateClassroomInput = require("../../validation/classroom/classroom");

/**
 * @route   GET api/classrooms/test
 * @desc    Tests classrooms route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Classrooms Works" }));

/**
 * @route   POST api/classrooms/new-classroom
 * @desc    Create classroom
 * @access  Private
 */
router.post(
  "/new-classroom",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClassroomInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newClassroom = new Classroom({
      classroomName: req.body.classroomName,
      courseID: req.body.courseID,
      lecturer: req.user.id,
      exercise: req.body.exercises
    });

    newClassroom.save().then(classroom => res.json(classroom));
  }
);

/**
 * @route   POST api/classrooms/:id
 * @desc    Update classrooms
 * @access  Private
 */
router.post(
  "/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClassroomInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Classroom.findOne({ _id: req.params.id }, (err, classroom) => {
      if (err) {
        return res.status(404).json({
          //err,
          message: "Classroom not found!"
        });
      }

      classroom.classroomName = req.body.classroomName;
      classroom.courseID = req.body.courseID;
      classroom.lecturer = req.user.id;
      classroom.exercise = req.body.exercises;

      Classroom.findOneAndUpdate(
        { _id: req.params.id },
        { $set: classroom },
        { new: true }
      ).then(classroom => res.json(classroom));
    });
  }
);

/**
 * @route   GET api/classrooms/:lecturer_id
 * @desc    Get all classrooms own by the lecturer
 * @access  Private
 */
router.get(
  "/:lecturer_id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Classroom.find(
      { lecturer: req.params.lecturer_id },
      (err, classrooms) => {
        // Check lecturer ID
        if (req.params.lecturer_id !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        // More errors
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: classrooms });
      }
    ).catch(err => console.log(err));
  }
);

/**
 * @route   GET api/classrooms/:lecturer_id/:id
 * @desc    Get classroom
 * @access  Private
 */
router.get(
  "/:lecturer_id/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Classroom.findOne({ _id: req.params.id }, (err, classroom) => {
      // Check lecturer ID
      if (req.params.lecturer_id !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // Check if the classroom exist
      if (!classroom) {
        return res
          .status(404)
          .json({ success: false, error: "Classroom not found" });
      }
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: classroom });
    }).catch(err => console.log(err));
  }
);

/**
 * @route   DELETE api/classrooms/:id
 * @desc    Delete classrooms
 * @access  Private
 */
router.delete(
  "/:lecturer_id/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Classroom.findOneAndDelete(
      { _id: req.params.id },
      (err, classroom) => {
        // Check lecturer ID
        if (req.params.lecturer_id !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        // Check if the classroom exist
        if (!classroom) {
          return res
            .status(404)
            .json({ success: false, error: "Classroom not found" });
        }
        // More errors
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: classroom });
      }
    ).catch(err => console.log(err));
  }
);

module.exports = router;
