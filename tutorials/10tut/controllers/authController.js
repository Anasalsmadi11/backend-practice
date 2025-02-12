const bcrypt = require("bcrypt");
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
  console.log(user);
  if (!user)
    return res
      .status(400)
      .json({ message: `no user with the name ${user.username}` });
  const isCorrectpwd = await bcrypt.compare(password, user.password); // order matter for the params here
  console.log(isCorrectpwd);
  if (isCorrectpwd) {
    res.json({ message: "user logged in" });
  } else {
    res.sendStatus(401);
  }
};

module.exports = handleLogin;
