const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken == refreshToken
  );
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, refreshSecret, (err, payload) => {
    if (err || payload.username != foundUser.username)
      // the username in the payload gets its value from the refreshToken i used in the verify method.
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: payload.username,
          roles: roles,
        },
      },
      accessSecret,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });
};
module.exports = { handleRefreshToken };
