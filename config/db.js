const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db fail to connect");
    });
}

module.exports = connectDB;
