const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Class Model
const Class = require("../../models/Class");

// Validation
const validateClassInput = require("../../validation/class/class");

/**
 * @route   GET api/classes/test
 * @desc    Tests classes route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Classes Works" }));

/**
 * @route   POST api/classes/new-class
 * @desc    Create class
 * @access  Private
 */
router.post(
  "/new-class",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClassInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newClass = new Class({
      classname: req.body.classname,
      courseID: req.body.courseID,
      lecturer: req.user.id,
      // TODO do array on exercise
      exercise: req.body.exercise
    });

    newClass.save().then(clss => res.json(clss));
  }
);

/**
 * @route   POST api/classes/:id
 * @desc    Update classes
 * @access  Private
 */
router.post(
  "/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClassInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Class.findOne({ _id: req.params.id }, (err, clss) => {
      if (err) {
        return res.status(404).json({
          //err,
          message: "Class not found!"
        });
      }

      clss.classname = req.body.classname;
      clss.courseID = req.body.courseID;
      clss.lecturer = req.user.id;
      // TODO do array on exercise
      clss.exercise = req.body.exercise;

      Class.findOneAndUpdate(
        { _id: req.params.id },
        { $set: clss },
        { new: true }
      ).then(clss => res.json(clss));
    });
  }
);

/**
 * @route   GET api/classes/:lecturer_id
 * @desc    Get all classes own by the lecturer
 * @access  Private
 */
router.get(
  "/:lecturer_id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Class.find({ lecturer: req.params.lecturer_id }, (err, clss) => {
      // Check lecturer ID
      if (req.params.lecturer_id !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: clss });
    }).catch(err => console.log(err));
  }
);

/**
 * @route   GET api/classes/:lecturer_id/:id
 * @desc    Get class
 * @access  Private
 */
router.get(
  "/:lecturer_id/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Class.findOne({ _id: req.params.id }, (err, clss) => {
      // Check lecturer ID
      if (req.params.lecturer_id !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // Check if the class exist
      if (!clss) {
        return res
          .status(404)
          .json({ success: false, error: "Class not found" });
      }
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: clss });
    }).catch(err => console.log(err));
  }
);

/**
 * @route   DELETE api/classes/:id
 * @desc    Delete classes
 * @access  Private
 */
router.delete(
  "/:lecturer_id/:id",
  passport.authenticate("lecturer-rule", { session: false }),
  async (req, res) => {
    await Class.findOneAndDelete({ _id: req.params.id }, (err, clss) => {
      // Check lecturer ID
      if (req.params.lecturer_id !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // Check if the class exist
      if (!clss) {
        return res
          .status(404)
          .json({ success: false, error: "Class not found" });
      }
      // More errors
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: clss });
    }).catch(err => console.log(err));
  }
);

module.exports = router;
