const router  = require("express").Router();
const volunteerData = require("../../models/volunteerRegistration");

router.post("/", async (req, res) => {
    try {
      const { picture, name, email, phone, bio, address, coordinates } = req.body;
      const response = await volunteerData.findOne({ email: email });
      if (response) {
        console.log("email already exists");
        return res.status(400).json("email already exists");
      }
      const data = new volunteerData({
        picture,
        name,
        email,
        phone,
        bio,
        address,
        coordinates,
      });
      await data.save();

      res.status(200).json({message: "volunteer data saved successfully."});
    } catch (err) {
      console.log("got an error while volunteer registration", err);
      res.status(500).json({message:"got an error while volunteer registration "})
    }
  });

  module.exports = router;