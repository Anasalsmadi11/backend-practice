const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// console.log(path.join(__dirname, "..", "log"));// the last directory in the path is middleware directory, but log directory is not in the middleware directory so i put ".." to go up a level so the last directory would be here is the root which is 07tut then i add the log directory to it
const logItems = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // fs cus fsPromises doesn't have this method
      await fsPromises.mkdir(path.join(__dirname, "..", "logs")); //we put fsPromises because we are doing it the async await way, try log the fsPromises and see the method, if you want to do the fs way you need to add a callback, search it
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};
const logger = (req, res, next) => {
  logItems(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.url}`);
  next();
};
// console.log(fsPromises);

module.exports = { logItems, logger };
