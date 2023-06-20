const router = require("express").Router();
const volunteerData = require("../../models/volunteerRegistration");

router.get("/", async (req, res) => {
    const volunteers = await volunteerData.find({});
    res.status(200).json(volunteers);
  });

module.exports = router;