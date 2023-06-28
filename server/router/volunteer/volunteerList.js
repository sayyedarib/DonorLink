const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");

router.get("/", async (req, res) => {
  const email = req.query.particular;
  console.log("SR:router-volunteerList try");
  try {
    const volunteers = email
      ? await volunteerData.findOne({ email })
      : await volunteerData.find({});
    res.status(200).json(volunteers);
  } catch (err) {
    console.log("SR:router-volunteerList: error", err);
    res.status(500).json({ message: "Error retrieving volunteers" });
  }
});

module.exports = router;