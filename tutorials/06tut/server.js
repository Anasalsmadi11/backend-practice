const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/index(.html)?", (req, res) => {
  //*()? is a regex expression means that putting the html is optional in the route
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 is the default,301 for redirecting
});

// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to say hello");
    next(); // allows you to move to the next function
  },
  (req, res) => {
    // the next function
    res.send("Hello world");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("Finished");
};

app.get("/chain(.html)?", one, two, three); // or [one, two, three]

// this should always be at the end of the routes cus all the routes under it won't be recongnized.
app.get("/*", (req, res) => {
  // *means any path
  res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // i put the status code cus the send methods sends 200 if the path is correct and here any path is correct but they don't exist so i have to change it
});
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
