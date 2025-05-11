const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refresherTokenController");

router.get("/", refreshController.handleRefreshToken);

module.exports = router;
