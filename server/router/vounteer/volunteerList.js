const router = require("express").Router();
const volunteerData = require("../../models/volunteerRegistration");

router.get("/", async (req, res) => {
    const volunteers = await volunteerData.find();
    console.log(volunteers);
    res.json(volunteers);
  });

module.exports = router;