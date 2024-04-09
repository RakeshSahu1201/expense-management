const express = require("express");
const {
  createTiffin,
  getAllTiffins,
  getAllTiffinByMonthlyTiffinId,
  modifyTiffinByTiffinId,
  getTiffinListFilterBy,
} = require("../repository/TiffinRepository");

const TiffinRouter = express.Router();

TiffinRouter.get("/", async (req, res) => {
  try {
    const { result, error } = await getAllTiffins();
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

TiffinRouter.get("/:monthly_tiffin_id", async (req, res) => {
  try {
    const { monthly_tiffin_id } = req.params;
    const { result, error } = await getAllTiffinByMonthlyTiffinId(
      monthly_tiffin_id
    );
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

TiffinRouter.post("/", async (req, res) => {
  try {
    const { tiffin } = req.body;
    const { result, error } = await createTiffin(tiffin);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("create_tiffin_error ", error.message);
    res.send({ error: error.message });
  }
});

TiffinRouter.put("/:tiffin_id", async (req, res) => {
  try {
    const { tiffin } = req.body;
    const tiffin_id = req.params.tiffin_id;
    const { result, error } = await modifyTiffinByTiffinId(tiffin_id, tiffin);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("upate_tiffin_error ", error.message);
    res.send({ error: error.message });
  }
});

TiffinRouter.get("/night/:monthly_id", async (req, res) => {
  try {
    const monthly_id = req.params.monthly_id;
    const { result, error } = await getTiffinListFilterBy("NIGHT", monthly_id);
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

TiffinRouter.get("/morning/:monthly_id", async (req, res) => {
  try {
    const monthly_id = req.params.monthly_id;
    const { result, error } = await getTiffinListFilterBy(
      "MORNING",
      monthly_id
    );
    if (error) {
      res.send({ error });
      return;
    }
    res.send({ result });
  } catch (error) {
    console.trace("get_all_tiffins_error ", error.message);
    res.send({ error: error.message });
  }
});

module.exports = TiffinRouter;
