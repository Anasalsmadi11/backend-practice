const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const subdir = require("./routes/subdir");
const home = require("./routes/home");
const corsOptions = require("./config/config");
const register = require("./routes/register");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public"))); //the defult path for the use is / so it is ok if you dont put it
app.use("/subdir", express.static(path.join(__dirname, "public"))); //This means the static files will only be seved if the request URL starts with /subdir.
app.use(logger);
app.use(cors(corsOptions));

app.use("/subdir", subdir); // sincd the required file 'subdir is middleware we should put it inside the app.use as the app.use is a middleware, http://localhost:8080/subdir/test
app.use("/", home);
app.use("/employee", require("./routes/api/employees"));
app.use("/register", register);
app.use("/login", require("./routes/auth"));
app.all("*", (req, res) => {
  // *means any path
  res.status(404);
  if (req.accepts("html")) {
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
