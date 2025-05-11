const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;

const verifyJwt = (req, res, next) => {
  const authHeaderes = req.headers.authorization || req.headers.Authorization;
  if (!authHeaderes?.startsWith("Bearer ")) return res.sendStatus(401);

  const accessToken = authHeaderes.split(" ")[1];

  if (!accessToken) return res.sendStatus(403);
  jwt.verify(accessToken, accessSecret, (err, payload) => {
    if (err) return res.sendStatus(401);
    req.username = payload.UserInfo.username;
    req.roles = payload.UserInfo.roles; // im attaching roles to the request cus i need it in the check role middleware
    next();
  });
};
module.exports = verifyJwt;
