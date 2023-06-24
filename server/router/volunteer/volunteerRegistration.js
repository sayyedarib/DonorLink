const router  = require("express").Router();
const volunteerData = require("../../models/volunteerRegistration");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
      const { picture, name, email,password,cpassword, phone, bio, address, coordinates } = req.body;
      const response = await volunteerData.findOne({ email: email });
      if (response) {
        console.log("email already exists");
        return res.status(409).send({message:"email already exists"});
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);
      const hashConfirmPassword = await bcrypt.hash(
        cpassword,
        salt
      );
      const data = new volunteerData({
        picture,
        name,
        email,
        password:hashPassword,
        cpassword:hashConfirmPassword,
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