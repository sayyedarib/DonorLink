const router = require("express").Router();
const findNearest = require("../../../utils/findNearest");

router.get("/", async (req, res) => {
  const { coordinates } = req.query
  try {
    console.log("blood donor list route called");
    const nearestDonors = await findNearest(coordinates, "bloodDonor");
    res.status(200).send({ data: nearestDonors, message: "success full got the blood donor" });
  } catch (err) {
    res.status(500).send({ message: "SR:got an error while finding nearest donor" });
  }
});

module.exports = router;