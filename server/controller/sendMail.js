const nodemailer = require("nodemailer");

module.exports = async function sendEmail  ({data, recepient}) {

  try{
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sayyedaribhusain4231@gmail.com",
        pass: "@Unknown@321",
      },
    });
  
    const html =  `
    <h6><strong>Name:</strong> ${data.name}</h6>
    <h6><strong>Email:</strong> ${data.email}</h6>
    <h6><strong>Phone:</strong> ${data.phone}</h6>
    <h6><strong>Quantity:</strong> ${data.quantity}</h6>
    <h6><strong>Address:</strong> ${data.address}</h6>
    <h6><strong>Message:</strong> ${data.message}</h6>
    <h6><strong>Coordinates:</strong> ${data.coordinates}</h6>
  `; // HTML body
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: "gm6697@amu.ac.in", // sender address
      to: recepient, // list of receivers
      subject: "New cloth donation form submitted", // Subject line
      html:html,
    });
  }
  catch(error){
    console.log("SR: error while sending email")
  }
};

// export default sendEmail;
