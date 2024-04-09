const mongoose = require("mongoose");
//Set up default mongoose connection
// const mongoDBUrl = "mongodb://127.0.0.1:27017/Expense-Management-App";
const mongoDBUrl =
  "mongodb+srv://tempuser:temppass@cluster0.pzqcr3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const config = () => {
  mongoose.connect(mongoDBUrl);
  //Get the default connection
  const db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on("connected", console.log.bind(console, "MongoDB connected."));
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

module.exports = config;
