const fs = require("fs");
const fsPromises = require("fs").promises;
const http = require("http");
const path = require("path");

const logEvents = require("./logEvents");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3800;

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(
      filePath,
      contentType.includes("image") ? "" : "utf8" // this is to render image cus it won't if the value were utf8
    );
    response.writeHead(contentType.includes("404.html") ? 404 : 200, {
      contentType: contentType,
    });
    response.end(data);
  } catch (err) {
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errorLog.txt");

    response.stausCode = 500;
    response.end();
  }
};
const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  let extention = path.extname(req.url);
  // console.log(req.url, "++", extention);

  let contentType;

  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url == "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType == "text/html" && req.url.slice(-1) == "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  if (!extention && req.url.slice(-1) != "/") filePath += ".html";
  console.log(filePath);
  // console.log(Boolean(extention));
  // console.log(req.url.slice(-1));
  // console.log(contentType);
  let fileExists = fs.existsSync(filePath);
  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (
      path.parse(filePath).base // or path.basename(filePath)
    ) {
      case "old-page.html":
        res.writeHead(301, { location: "new-page.html" }); //301 :redirect
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "index.html" });
        res.end();
        break;
    }
    serveFile(path.join(__dirname, "views", "404.html"), contentType, res);
  }
});

// with this the .html is not required to add in the browser cus it'll add it with this condition

server.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
