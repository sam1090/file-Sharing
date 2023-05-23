const mongoose = require("mongoose");
require("dotenv").config();
const MONGOURI = process.env.MONGOURI;

exports.connectDB = () => {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Database connected");
  });

  connection.on("error", (err) => {
    console.log("Connection failed:", err);
  });
};
