const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true); //The res.header(name, value) method in Express.js is used to set(not send cus the request is not processed yet) an HTTP response header.
  }
  next();
};

module.exports = credentials;

/*
res.header() method can set any HTTP response header, not just Access-Control-Allow-Credentials.

Access-Control-Allow-Credentials is a response header that tells the browser whether to allow credentials (cookies, authentication headers, etc.) in a cross-origin request.

Headers are categorized into two main types:
1️⃣ Request Headers – Sent by the client to the server. (e.g., Authorization, Origin, Content-Type)
2️⃣ Response Headers – Sent by the server back to the client. (e.g., Access-Control-Allow-Credentials, Set-Cookie)

What Does Access-Control-Allow-Credentials Do?
It is a response header that allows the browser to include credentials (cookies, authorization headers, etc.) in cross-origin requests, because By default, browsers block credentials in CORS requests for security reasons. This header overrides that behavior for allowed origins.
*/
