const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(`couldn't connect to the DB du to ${err}`);
  }
};

module.exports = connectDB;
