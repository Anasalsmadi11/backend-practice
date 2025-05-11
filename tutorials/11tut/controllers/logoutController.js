const path = require("path");
const fsPromises = require("fs").promises;
require("dotenv").config();
const jwt = require("jsonwebtoken");

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

async function handleLogOut(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken == refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true, // 1*
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }
  const currentUser = { ...foundUser, refreshToken: "" };
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken != refreshToken
  );
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users, null, 2)
  );

  res.clearCookie("jwt", {
    httpOnly: true, // didn't put the maxAge cus it is not necessary when deleting the cookie
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "logged out" });
}
module.exports = { handleLogOut };
/* 1*
the httplOnly property is added to enhance the security since the js has no access to the cookies in the http protocol, but it has in the https protocol, so one you finish the development stage you replace it with secure:true
*/
