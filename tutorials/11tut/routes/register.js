const express = require("express");
const router = express.Router();
const handleRegisterUser = require("../controllers/registerController");

router.post("/", handleRegisterUser);
module.exports = router;
