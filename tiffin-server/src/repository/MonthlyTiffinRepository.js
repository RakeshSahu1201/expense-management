const MonthlyTiffinModel = require("../model/MonthlyTiffin");

const createMonthlyTiffin = async (monthly_tiffin) => {
  try {
    const monthly_tiffin_instance = MonthlyTiffinModel(monthly_tiffin);
    const monthly_tiffin_created = await monthly_tiffin_instance.save();
    return { result: monthly_tiffin_created };
  } catch (error) {
    return { error: error.message };
  }
};

const getAllMonthlyTiffin = async () => {
  try {
    const monthly_tiffins = await MonthlyTiffinModel.find();
    return { result: monthly_tiffins };
  } catch (error) {
    return { error: error.message };
  }
};

const getMonthlyTiffinByStatus = async () => {
  try {
    const monthly_tiffin = await MonthlyTiffinModel.find({
      status: "ON GOING",
    });
    return { result: monthly_tiffin };
  } catch (error) {
    return { error: error.message };
  }
};

const getCurrentMonthlyTiffin = async (month, year) => {
  try {
    const [current_monthly_tiffin] = await MonthlyTiffinModel.find({
      $and: [
        {
          month,
          year,
          status: "ON GOING",
        },
      ],
    });
    return { result: current_monthly_tiffin };
  } catch (error) {
    return { error: error.message };
  }
};

const getOnGoingMonthlyTiffin = async (_id) => {
  try {
    const current_monthly_tiffin = await MonthlyTiffinModel.findOne({
      _id,
    });
    return { result: current_monthly_tiffin };
  } catch (error) {
    return { error: error.message };
  }
};

const endMonthlyTiffinOnGoing = async ({ _id }) => {
  try {
    const result = await MonthlyTiffinModel.updateOne(
      { _id },
      { status: "ENDED" }
    );
    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

const getMonthlyTiffinById = async (monthly_tiffin_id) => {
  try {
    const result = await MonthlyTiffinModel.findOne({ _id: monthly_tiffin_id });
    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

const modifyMonthlyTiffinByMontlyTiffinId = async (
  monthly_tiffin_id,
  monthly_tiffin
) => {
  try {
    const result = await MonthlyTiffinModel.updateOne(
      { _id: monthly_tiffin_id },
      { $set: monthly_tiffin }
    );
    console.trace(result);
    return { result };
  } catch (error) {
    console.trace(error);
    return { error: error.message };
  }
};

const deleteMonthlyTiffinById = async (monthly_id) => {
  try {
    const result = await MonthlyTiffinModel.deleteOne({
      _id: monthly_id,
    });
    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createMonthlyTiffin,
  getAllMonthlyTiffin,
  getCurrentMonthlyTiffin,
  endMonthlyTiffinOnGoing,
  getOnGoingMonthlyTiffin,
  getMonthlyTiffinByStatus,
  getMonthlyTiffinById,
  modifyMonthlyTiffinByMontlyTiffinId,
  deleteMonthlyTiffinById,
};
