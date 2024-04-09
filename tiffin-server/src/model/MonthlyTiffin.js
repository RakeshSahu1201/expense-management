const mongoose = require("mongoose");

const MonthlyTiffinSchema = new mongoose.Schema({
  month: String,
  year: Number,
  total_tiffin_count: Number,
  total_tiffin_price: Number,
  per_tiffin_price: Number,
  status: String,
});

const MonthlyTiffinModel = mongoose.model("MonthlyTiffin", MonthlyTiffinSchema);

module.exports = MonthlyTiffinModel;
