const router = require("express").Router();
const bloodDonationData = require("../../../models/donation/bloodDonation");
const findNearest = require("../../../utils/findNearest");

router.get("/", async (req, res) => {
  const { coordinates } = req.query
  try {
    console.log("coordinates ", coordinates);
    console.log("SR:router-bloodDonorListList try");
    const nearestDonors = await findNearest(coordinates, "bloodDonor");
    res.status(200).send({ data: nearestDonors, message: "Error retrieving blood donors data" });
  } catch (err) {
    console.log("SR:router-bloodDonorList: error", err);
    res.status(500).send({ message: "SR:got an error while finding nearest donor" });
  }
});

module.exports = router;