require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const connection = require("./db");

connection();
// const { createRazorpayInstance } = require("./services/razorpay");
// const paymentSchema = require("./models/paymentSchema");
// const paymentRoute = require("./router/paymentRoute");
const volunteerRegistrationRoute = require("./router/vounteer/volunteerRegistration");
const clothDonationRoute = require("./router/donation/cloth");
const volunteerListRoute = require("./router/vounteer/volunteerList")
const sendMailRoute = require("./utils/sendMail");

// const instance = createRazorpayInstance();

// app.use("/api", paymentRoute);
app.use("/api/volunteerRegistration", volunteerRegistrationRoute)
app.use("/api/clothDonation", clothDonationRoute);
app.use("/api/sendMail", sendMailRoute);
app.use("/api/vounteers", volunteerListRoute);

// app.get("/api/getkey", (req, res) => {
//   res.status(200).json({ key: process.env.RAZORPAY_ID });
// });



app.get("/", (req, res) => {
  console.log("req of root of server ", req.body);
  res.send("Assalamalaikum");
});

app.listen(8000, console.log(`listening to PORT 8000`));
