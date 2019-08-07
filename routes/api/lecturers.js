const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load USer model
const User = require("../../models/Lecturer");

// @route   GET api/lecturers/test
// @desc    Tests lecturers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Lecturers Works" }));

// @route   GET api/lecturers/register
// @desc    Register lecturers
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(lecturer => {
    if (lecturer) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newLecturer = new Lecturer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        matrixID: req.body.matrixID,
        email: req.body.email,
        password: req.body.password
        //avatar: ,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newLecturer.password, salt, (err, hash) => {
          if (err) throw err;
          newLecturer.password = hash;
          newLecturer
            .save()
            .then(lecturer => res.json(lecturer))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
