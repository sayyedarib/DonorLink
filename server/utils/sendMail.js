const nodemailer = require("nodemailer");

module.exports = async function sendMail({email, name,subject, message}) {
  console.log("I'm inside send Mail");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sayyedaribhussain4321@gmail.com",
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  console.log("I've crossed transporter");
  console.log("email ", email, "name ", name);
  await transporter.sendMail({
    from: `DonorLink`,
    to: email,
    subject: subject,
    html: message,
  });
};
