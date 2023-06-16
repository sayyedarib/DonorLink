const router = require("express").Router();
const clothDonation = require("../../models/clothDonation");

router.post("/", async (req, res) => {
    console.log("I'm on server side now");
    try {
      const { name, email, phone, quantity, address, message, coordinates } = req.body;
  
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

  module.exports = router;
  