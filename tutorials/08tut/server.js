const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const { logItems, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const subdir = require("./routes/subdir");
const home = require("./routes/home");
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
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public"))); //the defult path for the use is / so it is ok if you dont put it
app.use("/subdir", express.static(path.join(__dirname, "public"))); //This means the static files will only be seved if the request URL starts with /subdir.

app.use("/subdir", subdir); // sincd the required file 'subdir is middleware we should put it inside the app.use as the app.use is a middleware, http://localhost:8080/subdir/test
app.use("/", home);
app.use("/employee", require("./routes/api/employees"));

// Route handlers
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
