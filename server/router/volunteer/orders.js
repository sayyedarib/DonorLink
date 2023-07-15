const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");

router.post("/", async (req, res) => {
  const response = req.query.response;
  const { _id, workId } = req.body;

  try {
    const volunteer = await volunteerData.findById(_id);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const work = volunteer.works.id(workId);

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    if (response === "accept") {
      work.accepted = true;
    } else if (response === "reject") {
      work.rejected = true;
    } else if (response === "collected") {
      work.collected = true;
    } else {
      return res.status(400).json({ message: "Invalid response" });
    }

    await volunteer.save();

    res.json(volunteer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
