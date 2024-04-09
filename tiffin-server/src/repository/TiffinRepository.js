const TiffinModel = require("../model/Tiffin");
const {
  updateTiffinDetailsInMonthlyTiffin,
} = require("../service/MonthlyTiffinService");

const createTiffin = async (tiffin) => {
  try {
    if (!tiffin.monthly_tiffin_id)
      return { error: "please activate monthly pack first" };
    const { price, error } = await updateTiffinDetailsInMonthlyTiffin(
      tiffin.monthly_tiffin_id,
      tiffin.count
    );
    console.trace(error);
    if (error) return error;
    tiffin.price = price * tiffin.count;
    const tiffin_instance = TiffinModel(tiffin);
    const tiffin_created = await tiffin_instance.save();
    return { result: tiffin_created };
  } catch (error) {
    console.trace(error);
    return { error: error.message };
  }
};

const getAllTiffins = async () => {
  try {
    const tiffins = await TiffinModel.find({});
    return { result: tiffins };
  } catch (error) {
    return { error: error.message };
  }
};

const getAllTiffinByMonthlyTiffinId = async (monthly_tiffin_id) => {
  try {
    const tiffins = await TiffinModel.find({ monthly_tiffin_id });
    return { result: tiffins };
  } catch (error) {
    return { error: error.message };
  }
};

const getTiffinListFilterBy = async (shift, monthly_id) => {
  try {
    const tiffins = await TiffinModel.find({
      day_time: shift,
      monthly_tiffin_id: monthly_id,
    });
    return { result: tiffins };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createTiffin,
  getAllTiffins,
  getAllTiffinByMonthlyTiffinId,
  getTiffinListFilterBy,
};
