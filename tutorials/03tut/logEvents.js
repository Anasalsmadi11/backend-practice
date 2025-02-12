const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logItems = async (message) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      // fs cus fsPromises doesn't have this method
      await fsPromises.mkdir(path.join(__dirname, "logs")); //we put fsPromises because we are doing it the async await way, try log the fsPromises and see the method, if you want to do the fs way you need to add a callback, search it
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};
// console.log(fsPromises);

module.exports = logItems;
