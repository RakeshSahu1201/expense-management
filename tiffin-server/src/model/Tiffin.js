const mongoose = require("mongoose");

const TiffinSchema = new mongoose.Schema({
  day_time: String,
  date: Date,
  day: String,
  comment: String,
  count: Number,
  price: Number,
  monthly_tiffin_id: String,
});

const TiffinModel = mongoose.model("Tiffin", TiffinSchema);

module.exports = TiffinModel;
