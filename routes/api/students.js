const express = require("express");
const router = express.Router();

// @route   GET api/students/test
// @desc    Tests students route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Students Works" }));

module.exports = router;
