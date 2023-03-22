const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const geolib = require("geolib");
// const sendMail = require("../controller/sendMail")

//import schema
const volunteerForm = require("../models/volunteerRegistration");
const clothDonation = require("../models/clothDonation");

dotenv.config({ path: "./config.env" });
require("../db/connection");

//SignUp Route


//login Route

//volunteer registration route
router.post("/volunteerRegistration", async (req, res) => {
  try {
    console.log("i'm inside server of volunteer registration");
    const { picture,name, email, phone, bio, address, coordinates } = req.body;
console.log("2");
    const response = await volunteerForm.findOne({ email: email });
    console.log("3");
    if (response) {
      console.log("email already exists");
      return res.status(200).json("email already exists");
    }
    console.log("4");
    const data = new volunteerForm({
      picture,
      name,
      email,
      phone,
      bio,
      address,
      coordinates,
    });
    console.log("5");
    await data.save();
    console.log("6");
  } catch (err) {
    console.log("got an error while volunteer registration ", err);
  }
});

//cloth donation
router.post("/clothDonation", async (req, res) => {
  console.log("I'm on server side now");
  try {
    const { name, email, phone, quantity, address, message, coordinates } =
      req.body;

    const data = new clothDonation({
      name,
      email,
      phone,
      quantity,
      address,
      message,
      coordinates,
    });

    await data.save();
    res.status(200).json("done");
  } catch (err) {
    console.log(
      "got an error while posting cloth donation data to database ",
      err
    );
  }
});

// router.post("/sendMail", sendMail);
router.post("/sendMail", async (req, res) => {
  const donorCoordinate = JSON.parse(req.body.coordinates);
  const volunteers = await volunteerForm.find();

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
console.log("volunteer with distance 1",volunteerWithDistance);
  volunteerWithDistance.sort((a, b) => a.distance - b.distance);

  const emails = volunteers.map((data) => data.email);
  try {
    console.log("I'm inside send Mail");
    const { name, email, phone, quantity, address, message, coordinates } =
      req.body;
    console.log("send mail data: ", req.body);
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
console.log("volunteer with distance ", volunteerWithDistance)
    const nearestVolunteer = volunteerWithDistance[0].volunteer;
console.log("nearest volunteer",nearestVolunteer);
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

router.get("/volunteers", async (req, res) => {
  const volunteers = await volunteerForm.find();
  console.log(volunteers);
  res.json(volunteers);
});


module.exports = router;
