const nodemailer = require("nodemailer");

module.exports = async function sendMail(req, res) {
  const { email, phone, topic, message } = req.body;
  const receiverEmail = "sayyedaribhussain4321@gmail.com";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: receiverEmail,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  transporter.sendMail({
    from: `DonorLink`,
    to: receiverEmail,
    subject: `DonorLink - Regarding: ${topic}`,
    text: `${message} \n\n Email: ${email} \n Phone no: ${phone}`
  }, (err, info) => {
    if(err) {
      console.log(`Error occured during mail ${err}`);
      res.status(500).send("Error Occured");
    } else
      res.status(200).send("Mail Sent Successfully");
  });
};
