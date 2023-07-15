const router = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");
const profileModel = require("../../models/profileSchema")

router.get("/", async (req, res) => {
  const id = req.query.particular;

  console.log("SR:router-volunteerList try ", id);
  try {
    if (id) {
      const volunteer = await volunteerData
      .findOne({ profile: id })
      .populate('profile')
      .populate({
        path: 'works.workDetails',
        populate: {
          path: 'profile',
          model: 'profileModel'
        }
      })
      .exec();
    

      if (volunteer) {
        res.status(200).send({ data: volunteer });
      } else {
        const userData =await profileModel.findById(id);
        if(userData){
          res.status(200).send({data:userData});
        }
        else{
          res.status(404).json({ message: "Volunteer not found" });
        }
      }
    } else {
      const volunteers = await volunteerData.find({}).populate('profile').exec();
      res.status(200).json(volunteers);
    }
  } catch (err) {
    console.log("SR:router-volunteerList: error", err);
    res.status(500).json({ message: "Error retrieving volunteers" });
  }
});

module.exports = router;
