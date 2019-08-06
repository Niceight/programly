const express = require("express");
const router = express.Router();

// @route   GET api/lecturers/test
// @desc    Tests lecturers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Lecturers Works" }));

module.exports = router;
