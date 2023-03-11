const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const geolib = require("geolib");
// const sendMail = require("../controller/sendMail")

//import schema
const signUpForm = require("../models/signUpForm");
const volunteerForm = require("../models/volunteerRegistration");
const clothDonation = require("../models/clothDonation");

dotenv.config({ path: "./config.env" });
require("../db/connection");

//SignUp Route
router.post("/signUp", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({ error: "plz fill all the required field" });
  }

  try {
    const response = await signUpForm.findOne({ email: email });
    if (response) {
      return res.status(422).json({ message: "email already exists." });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ message: "password and confirm password mismatched" });
    } else {
      const data = new signUpForm({
        name,
        email,
        password,
        cpassword,
      });
      await data.save();
      res.status(202).json({ message: "data sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email or password not filled " });
    }

    const userExists = await signUpForm.findOne({ email: email });
    if (userExists) {
      const passwordMatch = await bcrypt.compare(password, userExists.password);
      const token = await userExists.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      console.log("token saved in cookie");
      if (!passwordMatch) {
        return res.status(400).json("Invalid credential");
      } else {
        console.log("user signed in successfully");
        res.json("user signed in successfully");
      }
    } else {
      res.status(400).json({ error: "user not found in database. " });
    }
  } catch (err) {
    console.log("catched error while login ", err);
  }
});

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
      subject: "checking nearest volunteer",
      html: `
        <h6><strong>Name:</strong> ${name}</h6>
        <h6><strong>Email:</strong> ${email}</h6>
        <h6><strong>Phone:</strong> ${phone}</h6>
        <h6><strong>Quantity:</strong> ${quantity}</h6>
        <h6><strong>Address:</strong> ${address}</h6>
        <h6><strong>Message:</strong> ${message}</h6>
        <h6><strong>Coordinates:</strong> ${coordinates}</h6>
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
