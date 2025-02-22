const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.resolve(__dirname, "../config/.env"),
  });
}

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`Database is Sucessfully connected: ${data.connection.host}`);
    })
    .catch((er) => {
      console.log(`Database connection failed: ${er.message}`);
    });
};

module.exports = connectDatabase;
