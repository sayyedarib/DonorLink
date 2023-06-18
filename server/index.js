require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const connection = require("./db");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

connection();
// const { createRazorpayInstance } = require("./services/razorpay");
// const paymentSchema = require("./models/paymentSchema");
// const paymentRoute = require("./router/paymentRoute");
const volunteerRegistrationRoute = require("./router/vounteer/volunteerRegistration");
const clothDonationRoute = require("./router/donation/cloth");
const volunteerListRoute = require("./router/vounteer/volunteerList")
const sendMailRoute = require("./utils/sendMail");
const recordsDataRoute = require("./router/countData")

// const instance = createRazorpayInstance();

// app.use("/api", paymentRoute);
app.use("/api/volunteerRegistration", volunteerRegistrationRoute)
app.use("/api/clothDonation", clothDonationRoute);
app.use("/api/sendMail", sendMailRoute);
app.use("/api/volunteers", volunteerListRoute);
app.use("/api/recordsData", recordsDataRoute);

// app.get("/api/getkey", (req, res) => {
//   res.status(200).json({ key: process.env.RAZORPAY_ID });
// });



app.get("/", (req, res) => {
  console.log("req of root of server ", req.body);
  res.send("Assalamalaikum");
});

app.listen(process.env.PORT, console.log(`listening to PORT ${process.env.PORT}`));
