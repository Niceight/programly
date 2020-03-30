const express = require("express");
const router = express.Router();

const { python } = require("compile-run");

/**
 * @route   GET compiler/
 * @desc    compile codeSnippet
 * @access  Private
 */
router.post("/", (req, res) => {
  let resultPromise = python.runSource(req.body.codeSnippet);
  resultPromise
    .then(compiler => {
      return res.status(200).json({ success: true, data: compiler });
    })
    .catch(err => {
      return res.status(400).json({ success: false, data: err });
    });
});

module.exports = router;
