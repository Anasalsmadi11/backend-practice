const { logItems } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  // this middleware handles the domains that are not allowed by cors in other words "the domains that are not in the whiteList"
  console.error(err.stack);
  logItems(`${err.name}\t${err.message}`, "errorLog.txt");
  res.status(500).send(err.message);
};
module.exports = errorHandler;
