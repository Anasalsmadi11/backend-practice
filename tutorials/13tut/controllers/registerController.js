const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRegisterUser = async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and passowrd required" });
  }
  const foundUser = usersDB.users.find((user) => user.username == username);
  console.log("found", foundUser);
  if (foundUser) return res.sendStatus(409); // conflict
  try {
    hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
      username: username,
      password: hashedPassword,
      roles: roles || { User: 2002 },
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users, null, 2) // null,2 for organizing the json file
    );
    res.json({ message: `new user ${username} is registered successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = handleRegisterUser;
