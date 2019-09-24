const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/student/register-student");
const validateLoginInput = require("../../validation/student/login-student");

// Load Student model
const Student = require("../../models/Student");

/**
 * @route   GET api/students/test
 * @desc    Tests students route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

/**
 * @route   POST api/students/register
 * @desc    Register students
 * @access  Public
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Student.findOne({ studentID: req.body.studentID }).then(student => {
    if (student) {
      errors.studentID = "Student ID already exists";
      return res.status(400).json(errors);
    } else {
      const newStudent = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        studentID: req.body.studentID,
        programID: req.body.programID,
        email: req.body.email,
        password: req.body.password
        //avatar: ,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
          if (err) throw err;
          newStudent.password = hash;
          newStudent
            .save()
            .then(student => res.json(student))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route   POST api/students/login
 * @desc    Login students / Returning JWT Token
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const studentID = req.body.studentID;
  const password = req.body.password;

  // Find student by studentID
  Student.findOne({ studentID }).then(student => {
    // Check for student
    if (!student) {
      errors.studentID = "Account not found";
      return res.status(400).json(errors);
    }

    // Check Password
    bcrypt.compare(password, student.password).then(isMatch => {
      if (isMatch) {
        // Student Matched
        // Create JWT Payload
        const payload = { id: student.id, name: student.firstname };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @route   GET api/students/student
 * @desc    Return current student
 * @access  Private
 */
router.get(
  "/student",
  passport.authenticate("student-rule", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      fullname: req.user.firstname + " " + req.user.lastname,
      studentID: req.user.studentID,
      email: req.user.email
    });
  }
);

module.exports = router;
