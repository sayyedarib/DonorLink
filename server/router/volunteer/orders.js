const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");

router.post("/", async (req, res) => {
  const response = req.query.response;
  const { email, workId } = req.body;
  if (response == "accept") {
    await volunteerData.findOneAndUpdate(
      { "profile.email": email, "works._id": workId },
      { $set: { "works.$.accepted": true } }
    );
  }
  else if (response == "reject") {

    await volunteerData.findOneAndUpdate(
      { "profile.email": email, "works._id": workId },
      { $set: { "works.$.rejected": true } }
    );
  }
  else if (response == "collected") {
    await volunteerData.findOneAndUpdate(
      { "profile.email": email, "works._id": workId },
      { $set: { "works.$.collected": true } }
    );
  }
});

module.exports = router;
