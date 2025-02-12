const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const User = require('./model/user');
const sequelize = require('./db/connection');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Define Socket.io handling as before
io.on('connection', (socket) => {
  // ... Socket.io handling as before ...
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
