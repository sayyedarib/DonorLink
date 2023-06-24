const router = require("express").Router();
const sendMail = require("../../utils/sendMail");
const clothDonation = require("../../models/clothDonation");
const registeredVolunteer = require("../../models/volunteerRegistration");
const findNearest = require("../../utils/findNearest");
const time = require("../../utils/time");

router.post("/", async (req, res) => {
  console.log("I'm on server side now");
  // Create a new Date object
const timing = time();

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
      timing,
      assignedVolunteers:nearestVolunteer,
    });

console.log("coordinates on cloth ", coordinates);
  const nearestVolunteer =await findNearest(coordinates);
  console.log("nearest volunteer is: ", nearestVolunteer.name);
  await registeredVolunteer.findOneAndUpdate(
    { _id: nearestVolunteer._id },
    { $push: { works:{workDetails:data, accepted:false} } }
  );
  console.log("SR-router-cloth: sending mail ");
  await sendMail({name, email, phone, quantity, address, message, coordinates}, nearestVolunteer);

    await data.save();
    res.status(200).json("done");
  } catch (err) {
    console.log(
      "got an error while posting cloth donation data to database ",
      err
    );
  }
});

module.exports = router;
