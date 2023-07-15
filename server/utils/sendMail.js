const nodemailer = require("nodemailer");

module.exports = async function sendMail({ email, subject, message,phone, queryMail }) {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sayyedaribhussain4321@gmail.com",
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  await transporter.sendMail({
    from: `DonorLink`,
    to: email,
    subject: `DonorLink - Regarding: ${subject}`,
    html: `${message}`
  }, (err, info) => {
    if(err) {
      console.log(`Error occured during mail ${err}`);
      res.status(500).send("Error Occured");
    } else
      res.status(200).send("Mail Sent Successfully");
  });
};