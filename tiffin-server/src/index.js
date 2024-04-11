const express = require("express");
const cors = require("cors");
const TiffinRouter = require("./router/TiffinRouter");
const MonthlyTiffinRouter = require("./router/MonthlyTiffinRouter");
const config = require("./config/MongoDBConnection");
require("dotenv").config();

const app = express();

const mongodbUrl = process.env.MONGODB_URL;
config(mongodbUrl);

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/tiffin", TiffinRouter);
app.use("/monthly-tiffin", MonthlyTiffinRouter);

app.listen(PORT, () => {
  console.log("app is listening on port : ", PORT);
});
