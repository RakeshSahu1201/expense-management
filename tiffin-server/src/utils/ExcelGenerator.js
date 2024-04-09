const { createObjectCsvWriter } = require("csv-writer");

// CSV file path
const csvFilePath = "src/payslip/payslip.csv";

async function generateExcelFile(tiffin_records, monthly_tiffin) {
  // Define CSV writer
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
      { id: "_id", title: "ID" },
      { id: "count", title: "Tiffin Count" },
      { id: "price", title: "Tiffin Price" },
      { id: "day_time", title: "Day Time" },
      { id: "date", title: "Date" },
      { id: "comment", title: "Comment" },
      { id: "monthly_tiffin_id", title: "Monthly Tiffin Id" },
    ],
  });

  // Write data to CSV file
  await csvWriter.writeRecords(tiffin_records);
  await csvWriter.writeRecords([{}]);
  await csvWriter.writeRecords([{}]);
  await csvWriter.writeRecords([
    {
      _id: "TOTAL",
      count: monthly_tiffin.total_tiffin_count,
      price: monthly_tiffin.total_tiffin_price,
    },
  ]);

  console.log("CSV file created successfully.");
}

module.exports = { generateExcelFile };
