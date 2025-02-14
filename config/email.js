const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendResetEmail = async (to, code) => {
  try {
    await transporter.sendMail({
      from: '"GradApp" <no-reply@gradapp.com>',
      to,
      subject: "Your Reset Code",
      text: `Your verification code: ${code}`,
      html: `<b>Your verification code:</b> ${code}`,
    });
    console.log("Reset email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendResetEmail };
