const nodemailer = require("nodemailer");

module.exports = async function sendMail({
  name,
  email,
  phone,
  quantity,
  address,
  message,
  coordinates
}, nearestVolunteer) {
  console.log("I'm inside send Mail");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sayyedaribhussain4321@gmail.com",
      pass: "mhzfludsaqzeedej",
    },
  });
  console.log("I've crossed transporter");
  console.log(nearestVolunteer.email);
  await transporter.sendMail({
    from: `${name} has donated cloth`,
    to: nearestVolunteer.email,
    subject: "Cloth Donation",
    html: `
        <h6>Dear ${nearestVolunteer.name},</h6>
          <h6>${name} has donated ${quantity} cloth(s). If you free enough please login to the <a href="${process.env.FRONTEND_URL}/auth"></a> accept the oreder request from your dashboard.</h6>
          <h6>you can use following details to reach out the donor</h6>
          <h6>${email}</h6>
          <h6>+91${phone}</h6>
          <h6><strong>Address:</strong> ${address}</h6>
          <h6><strong>Message:</strong> ${message}</h6>
          <h6><strong>Coordinates:</strong> ${coordinates}</h6>
  
          <h6>Your assistance in this matter would be greatly appreciated. Thank you for your time and consideration.
  </h6><h6>
  <br>
          Best regards,
          DonorLink Team</h6>
        `,
  });
};
