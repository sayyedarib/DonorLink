const router = require("express").Router();
const sendMail = require("../../utils/sendMail");
const bloodDonation = require("../../models/donation/bloodDonation");
const time = require("../../utils/time");

router.post("/", async (req, res) => {
  console.log("I'm on server side now");
  // Create a new Date object
  const { name, email, phone, bloodGroup, address, message, coordinates } =
    req.body;
const timing = time();

  try {
    const data = new bloodDonation({
      name,
      email,
      phone,
      bloodGroup,
      address,
      message,
      coordinates,
      timing,
    });

  console.log("SR-router-blood: sending mail ");
  // await sendMail({name, email, phone, bloodGroup, address, message, coordinates}, nearestVolunteer[0].volunteer);

    await data.save();
    res.status(200).json("done");
  } catch (err) {
    console.log(
      "got an error while posting blood donation data to database ",
      err
    );
  }
});

module.exports = router;
