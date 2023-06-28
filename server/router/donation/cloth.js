const router = require("express").Router();
const sendMail = require("../../utils/sendMail");
const clothDonation = require("../../models/donation/clothDonation");
const registeredVolunteer = require("../../models/volunteerRegistration");
const findNearest = require("../../utils/findNearest");
const time = require("../../utils/time");

router.post("/", async (req, res) => {
  console.log("SR: cloth donation route");
  // Create a new Date object
  const { name, email, phone, quantity, address, message, coordinates } =
    req.body;
  const timing = time();
  const nearestVolunteer = await findNearest(coordinates, "volunteer");
  const donorIsNotVolunteer = await registeredVolunteer.findOne({ email: email });

  if (donorIsNotVolunteer) { res.status(409).send({ message: "you are volunteer ,sumbit your donations directly" }) };

  try {
    const data = new clothDonation({
      name,
      email,
      phone,
      quantity,
      address,
      message,
      coordinates,
      timing,
      assignedVolunteers: nearestVolunteer,
    });
    console.log("address", address);
    console.log("nearest volunteer is: ", nearestVolunteer[0].volunteer.name);
    await registeredVolunteer.findOneAndUpdate(
      { _id: nearestVolunteer[0].volunteer._id },
      { $push: { works: { workDetails: data, accepted: false } } }
    );
    console.log("SR-router-cloth: sending mail ");
    await sendMail({ name, email, phone, quantity, address, message, coordinates }, nearestVolunteer[0].volunteer);

    await data.save();
    res.status(200).send({ message: "Thank you for donating cloth." });
  } catch (err) {
    console.log(
      "SR: got an error while posting cloth donation data to database ",
      err
    );
  }
});

module.exports = router;
