const express = require("express");
const router = express.Router();

// @route   GET api/exercises/test
// @desc    Tests exercises route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Exercises Works" }));

module.exports = router;
