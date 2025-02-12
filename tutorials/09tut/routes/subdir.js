const path = require("path");
const express = require("express");
const router = express.Router(); //A router instance is a complete middleware and routing system, for more info https://expressjs.com/en/guide/routing.html;

//the regex expression here means ^ it must start with / and $ must end with/ and the | means or and the ()? means it is optional if you want to put it
router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
