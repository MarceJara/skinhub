const nodemailer = require("nodemailer");

export const sendEmail = async ({ email, subject, html }) => {
  await nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    .sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject,
      html,
    });
};
