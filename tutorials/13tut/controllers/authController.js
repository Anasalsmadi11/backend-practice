const bcrypt = require("bcrypt");

const fsPromises = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(401).json({ message: "username and password required" });
  const user = usersDB.users.find((user) => user.username == username);

  if (!user)
    return res
      .status(400)
      .json({ message: `no user with the name ${user.username}` });
  const isCorrectpwd = await bcrypt.compare(password, user.password); // order matter for the params here

  if (isCorrectpwd) {
    const roles = Object.values(user.roles); //return array of values
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: roles, //i need it in the verifyJwt middleware
        },
      },
      accessSecret,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign({ username: user.username }, refreshSecret, {
      expiresIn: "1d",
    });
    res.cookie("jwt", refreshToken, {
      //1*
      httpOnly: true, // 2*
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });
    const currentUser = { ...user, refreshToken };
    const otherUsers = usersDB.users.filter(
      (person) => person.username != user.username
    );
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users, null, 2)
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;

/* 1*
 send the refreshToken and set it as cookies  in the client side
 the cookie method doesn't exist in the res object, so we need the cookie-parser package, while the cookies do exist in the req as built in
*/

/* 2*
the httplOnly property is added to enhance the security since the js has no access to the cookies in the http protocol, but it has in the https protocol, so one you finish the development stage you replace it with secure:true
*/
