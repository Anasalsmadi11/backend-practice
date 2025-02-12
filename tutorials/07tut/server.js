const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const { logItems, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);
// if you put app.use(cors()) only, it'll allow any site to access your backend and request data.
//here you add the websites you want to give access to your backend nad it is in cors docs
const whiteList = ["https://www.yourSite.com", "https://www.example.com/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      // i put the !origin cus when i request from my own local host the req.headers.origin will be undefined
      callback(null, true);
    } else {
      callback(new Error("origin is not allowed by scors"));
      logItems(new Error("origin is not allowed by cors"), "errorLog.txt");
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(the logic) is a middleware

/*
built in middleware to handle urlencoded data in other words, form data.
contentType: application/x-www-form-urlencoded
*/
app.use(express.urlencoded({ extended: false }));

/*
Order middleware by function:

Request parsers (express.json(), express.urlencoded()) at the top.
Static file serving (express.static) near the top but after parsers.
Route definitions afterward.
Error handling middleware at the bottom.
*/
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // the difference between it and the res.send file is that res.sendFile sends a specific file, while this Serves an entire directory of static files (images, CSS, JavaScript, HTML, etc.)

app.get("/index(.html)?", (req, res) => {
  //*()? is a regex expression means that putting the html is optional in the route
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.post("/data", (req, res) => {
  console.log(req.body);
  res.json({ message: "Data received", data: req.body });
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
// this should always be at the end of the routes cus all the routes under it won't be recongnized.

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

app.all("*", (req, res) => {
  // *means any path
  res.status(404);
  if (req.accepts("html")) {
    //Checks what content type the client expects based on the Accept header.
    res.sendFile(path.join(__dirname, "views", "404.html")); // i put the status code cus the send methods sends 200 if the path is correct and here any path is correct but they don't exist so i have to change it
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found"); // res.type: Sets the Content-Type of the response.
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
