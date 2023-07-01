const router = require("express").Router();
const clothDonationData = require("../../../models/donation/clothDonation");
const findNearest = require("../../../utils/findNearest");

router.get("/", async (req, res) => {
  const {coordinates}=req.query
  try {
  console.log("coordinates ", coordinates);
  console.log("SR:router-clothDonorListList try");
  const nearestDonors =await findNearest(coordinates, "clothDonor");
  res.status(200).send({data:nearestDonors,  message: "Error retrieving cloth donors data" });
} catch (err) {
  console.log("SR:router-clothDonorList: error", err);
  res.status(500).send({message:"SR:got an error while finding nearest cloth donor"});
  }
});

module.exports = router;