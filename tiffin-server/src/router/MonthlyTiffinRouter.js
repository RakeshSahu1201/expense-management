const express = require("express");
const {
  getAllMonthlyTiffin,
  getCurrentMonthlyTiffin,
  getOnGoingMonthlyTiffin,
  getMonthlyTiffinById,
} = require("../repository/MonthlyTiffinRepository");
const { createNewMonthlyTiffin } = require("../service/MonthlyTiffinService");

const MonthlyTiffinRouter = express.Router();

MonthlyTiffinRouter.get("/", async (req, res) => {
  try {
    const { result, error } = await getAllMonthlyTiffin();
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_monthly_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

MonthlyTiffinRouter.get("/:month/:year", async (req, res) => {
  try {
    const { month, year } = req.params;
    const { result, error } = await getCurrentMonthlyTiffin(month, year);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_monthly_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

MonthlyTiffinRouter.get("/:monthly_id", async (req, res) => {
  try {
    const monthly_tiffin_id = req.params.monthly_id;
    const { result, error } = await getMonthlyTiffinById(monthly_tiffin_id);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_monthly_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

MonthlyTiffinRouter.get("/on-going", async (req, res) => {
  try {
    const { result, error } = await getOnGoingMonthlyTiffin();
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_monthly_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

MonthlyTiffinRouter.post("/", async (req, res) => {
  try {
    const { monthly_tiffin } = req.body;
    const { result, error } = await createNewMonthlyTiffin(monthly_tiffin);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("create+_monthly_tiffin_error ", error.message);
    res.send({ error: error.message });
  }
});

module.exports = MonthlyTiffinRouter;
