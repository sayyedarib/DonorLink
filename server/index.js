require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const connection = require("./db");

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);

connection();

const volunteerRegistrationRoute = require("./router/auth/volunteerRegistration");
const verifyVolunteerRoute = require("./router/auth/verifyVolunteer");
const signUpRoute = require("./router/auth/userRegistration");
const loginRoute = require("./router/auth/login");
const sendQueryRoute = require("./router/sendQuery");
const recordsDataRoute = require("./router/countData");
const clothDonationRoute = require("./router/donation/giveDonation/cloth");
const bloodDonationRoute = require('./router/donation/giveDonation/blood');
const acceptOrderRoute = require("./router/volunteer/orders");
const volunteerListRoute = require("./router/volunteer/volunteerList");
const bloodDonorListRoute = require("./router/donation/getDonation/bloodDonorsList");
const clothDonorsListRoute = require("./router/donation/getDonation/clothDonorsList")

app.use("/api/volunteerRegistration", volunteerRegistrationRoute);
app.use("/api/signUp", signUpRoute);
app.use("/api/login", loginRoute);
app.use("/api/verifyVolunteer", verifyVolunteerRoute);
app.use("/api/sendQuery", sendQueryRoute);
app.use("/api/recordsData", recordsDataRoute);
app.use("/api/clothDonation", clothDonationRoute);
app.use("/api/bloodDonation", bloodDonationRoute);
app.use("/api/volunteerList", volunteerListRoute);
app.use("/api/bloodDonorsList", bloodDonorListRoute);
app.use("/api/clothDonorsList", clothDonorsListRoute)
app.use("/api/order", acceptOrderRoute);

app.get("/", (req, res) => {
  console.log("req of root of server ", req.body);
  res.send("Assalamalaikum");
});

app.listen(
  process.env.PORT,
  console.log(`listening to PORT ${process.env.PORT}`)
);
