const router = require("express").Router();
const clothDonation = require("../models/clothDonation");
const volunteerData = require("../models/volunteerRegistration");
const geolib = require("geolib");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
    const donorCoordinate = JSON.parse(req.body.coordinates);
    const volunteers = await volunteerData.find();
  
    //calculate volunteers distance from donor
    const volunteerWithDistance = volunteers.map((data) => {
      const volunteerCoordinate = JSON.parse(data.coordinates);
      const distance = geolib.getDistance(donorCoordinate, volunteerCoordinate);
      console.log("distances ", distance);
      return {
        volunteer: data,
        distance: distance,
      };
    });
    console.log("volunteer with distance 1", volunteerWithDistance);
    volunteerWithDistance.sort((a, b) => a.distance - b.distance);
  
    const emails = volunteers.map((data) => data.email);
    try {
      console.log("I'm inside send Mail");
      const { name, email, phone, quantity, address, message, coordinates } =
        req.body;
      // console.log("send mail data: ", req.body);
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sayyedaribhussain4321@gmail.com",
          pass: "mhzfludsaqzeedej",
        },
      });
      console.log("I've crossed transporter");
      console.log(emails.join(","));
  
      //send mail to nearest volunteer
      // console.log("volunteer with distance ", volunteerWithDistance.name);
      const nearestVolunteer = volunteerWithDistance[0].volunteer;
      console.log("nearest volunteer", nearestVolunteer.name);
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `${name} has donated cloth`,
        to: nearestVolunteer.email,
        subject: "Cloth Donation",
        html: `
        <h6>Dear ${nearestVolunteer.name},</h6>
          <h6>${name} has donated ${quantity} of cloth(s). Get to the donor as soon as possible to collect the donations. You can connect with him</h6>
          <h6 ${email}</h6>
          <h6></h6>+91${phone}</h6>
          <h6><strong>Address:</strong> ${address}</h6>
          <h6><strong>Message:</strong> ${message}</h6>
          <h6><strong>Coordinates:</strong> ${coordinates}</h6>
  
          <h6>Your assistance in this matter would be greatly appreciated. Thank you for your time and consideration.
  </h6><h6>
          Best regards,
          DonorLink Team</h6>
        `,
      });
  
      // console.log('Message sent: %s', info.messageId);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email!" });
    }
  });

  module.exports = router;