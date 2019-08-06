const express = require("express");
const router = express.Router();

// @route   GET api/classes/test
// @desc    Tests classes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Classes Works" }));

module.exports = router;
