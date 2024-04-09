const express = require("express");
const cors = require("cors");
const TiffinRouter = require("./router/TiffinRouter");
const MonthlyTiffinRouter = require("./router/MonthlyTiffinRouter");
const config = require("./config/MongoDBConnection");

const app = express();

config();

app.use(cors());
app.use(express.json());

app.use("/tiffin", TiffinRouter);
app.use("/monthly-tiffin", MonthlyTiffinRouter);

app.listen(5000, () => {
  console.log("app is listening on port : 5000");
});
