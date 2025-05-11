const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) != -1 || !origin) {
      // i put the !origin cus when i request from my own local host the req.headers.origin will be undefined
      callback(null, true);
    } else {
      callback(new Error("origin is not allowed by scors"));
      logItems(new Error("origin is not allowed by cors"), "errorLog.txt");
    }
  },
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
