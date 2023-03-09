const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sayyedaribhusain4231@gmail.com",
      pass: "@Unknown@321",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "gm6697@amu.ac.in", // sender address
    to: "sayyedaribhussain321@gmail.com", // list of receivers
    subject: "New cloth donation form submitted", // Subject line
    html: `
        <h6><strong>Name:</strong> ${data.name}</h6>
        <h6><strong>Email:</strong> ${data.email}</h6>
        <h6><strong>Phone:</strong> ${data.phone}</h6>
        <h6><strong>Quantity:</strong> ${data.quantity}</h6>
        <h6><strong>Address:</strong> ${data.address}</h6>
        <h6><strong>Message:</strong> ${data.message}</h6>
        <h6><strong>Coordinates:</strong> ${data.coordinates}</h6>
      `, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
};

// export default sendEmail;
