const path = require("path");
const express = require("express");
const router = express.Router();

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 is the default,301 for redirecting
});

module.exports = router;
