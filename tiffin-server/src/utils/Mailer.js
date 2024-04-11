const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
const sendAttachement = async (monthly_tiffin) => {
  // send mail with defined transport object
  const message = `
    <b>This is monthly payslip</b><br/>
    Month : <b>${monthly_tiffin.month}, ${monthly_tiffin.year}</b><br/>
    Total Tiffin Count : <b>${monthly_tiffin.total_tiffin_count}</b><br/>
    Total Tiffin Price : <b>${monthly_tiffin.total_tiffin_price}</b><br/>
    Per Tiffin Price : <b>${monthly_tiffin.per_tiffin_price}</b><br/>
    <h3>This month activation has been ended.</h3>
  `;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.APP_MAIL_ID,
        pass: process.env.APP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.SENDER_MAIL_ID, // sender address
      to: process.env.CLIENT_MAIL_ID, // list of receivers
      subject: "Monthly Tiffin Payslip ✔", // Subject line
      html: message, // html body
      attachments: [
        {
          filename: "payslip.csv",
          path: "src/payslip/payslip.csv", // Replace with the actual path to your CSV file
        },
      ],
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.trace("email.", error);
  }
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

const test = () => {
  console.log("test log");
};

module.exports = { sendAttachement, test };
