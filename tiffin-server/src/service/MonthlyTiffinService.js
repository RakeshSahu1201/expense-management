const {
  createMonthlyTiffin,
  endMonthlyTiffinOnGoing,
  getMonthlyTiffinById,
  modifyMonthlyTiffinByMontlyTiffinId,
  deleteMonthlyTiffinById,
} = require("../repository/MonthlyTiffinRepository");
const cron = require("node-cron");
const { getLastDateTimeOfMonth } = require("../utils/CustomDate");
const { generateExcelFile } = require("../utils/ExcelGenerator");
const { sendAttachement } = require("../utils/Mailer");
const TiffinModel = require("../model/Tiffin");

const map = new Map();

const createNewMonthlyTiffin = async (monthly_tiffin) => {
  try {
    const new_monthly_tiffin = { ...monthly_tiffin, status: "ON GOING" };
    const { result, error } = await createMonthlyTiffin(new_monthly_tiffin);
    if (error) return { error };

    const { minute, hour, day, month, year } = getLastDateTimeOfMonth();

    console.trace(minute, hour, day, month, year);

    const end_monthly_tiffin_on_going = cron.schedule(
      `${minute} ${hour} ${day} ${month} *`,
      async () => {
        try {
          const monthly_id = map.get(end_monthly_tiffin_on_going);
          console.log("job initiated", monthly_id);
          const status = await endMonthlyTiffinOnGoing({
            _id: monthly_id,
          });
          if (status.error) console.log(error);

          // get all tiffin data of this month
          const tiffins = await TiffinModel.find({
            monthly_tiffin_id: monthly_id,
          });

          const { result, error } = await getMonthlyTiffinById({
            _id: monthly_id,
          });
          if (error) {
            console.trace("some thing went wrong status", error);
            return { error };
          }
          // generate the csv file to send attachement
          await generateExcelFile(tiffins, result);
          console.trace("attachment is generated");

          // add code send a csv file to email.
          await sendAttachement(result);
          console.trace("attachment sent");

          // remove all old data
          await deleteMonthlyTiffinById(result._id);
          await TiffinModel.deleteMany({
            monthly_tiffin_id: result._id,
          });
        } catch (error) {
          console.trace(error);
        }
        // end cron job for this month
        setTimeout(() => {
          end_monthly_tiffin_on_going.stop();
          map.delete(endMonthlyTiffinOnGoing);
          console.trace("job ended");
        }, 1000);
      },
      {
        timezone: "Asia/Kolkata", // Adjust timezone as per your requirement
      }
    );

    map.set(end_monthly_tiffin_on_going, result._id);

    return { result };
  } catch (error) {
    return { error: error.message };
  }
};

const updateTiffinDetailsInMonthlyTiffin = async (
  monthly_tiffin_id,
  tiffin_count
) => {
  try {
    const { result, error } = await getMonthlyTiffinById(monthly_tiffin_id);
    if (error) {
      console.trace(error);
      throw new Error("Invalid Monthly ID");
    }
    result.total_tiffin_count += Number(tiffin_count);
    result.total_tiffin_price += result.per_tiffin_price * Number(tiffin_count);
    console.trace(result);
    const success = await modifyMonthlyTiffinByMontlyTiffinId(
      monthly_tiffin_id,
      result
    );
    if (success.error) {
      return { error: success.error.message };
    }
    return { price: result.per_tiffin_price };
  } catch (error) {
    console.trace(error);
    return { error: error.message };
  }
};

module.exports = { createNewMonthlyTiffin, updateTiffinDetailsInMonthlyTiffin };
