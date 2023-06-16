const router  = require("express").Router();
const volunteerData = require("../../models/volunteerRegistration");

router.post("/volunteerRegistration", async (req, res) => {
    try {
      console.log("i'm inside server of volunteer registration");
      const { picture, name, email, phone, bio, address, coordinates } = req.body;
      console.log("2");
      const response = await volunteerData.findOne({ email: email });
      console.log("3");
      if (response) {
        console.log("email already exists");
        return res.status(200).json("email already exists");
      }
      console.log("4");
      const data = new volunteerData({
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

  module.exports = router;