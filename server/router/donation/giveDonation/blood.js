const router = require("express").Router();
const sendMail = require("../../../utils/sendMail");
const bloodDonation = require("../../../models/donation/bloodDonation");
const profileModel = require("../../../models/profileSchema");
const time = require("../../../utils/time");

router.post("/", async (req, res) => {
  console.log("I'm on server side now");
  // Create a new Date object
  const { id, bloodGroup, message } = req.body;
  const timing = time();
  const {_id,name, email} = await profileModel.findById({_id:id});
  console.log("donors email ", _id);
  const response = await bloodDonation.findOne({ profile: _id });
  console.log("response ", response);
  if (response) {
    res.status(409).send({ message: "you arleardy registered as blood donor" })
  }

  try {
    const data = new bloodDonation({
      profile:_id,
      bloodGroup,
      message,
      timing,
    });

    const messageDonor = `
      <p><strong>Dear ${name},</strong></p>
      
      <p>Thank you for registering as a blood donor with DonorLink. Your willingness to donate blood can save lives and make a significant impact on those in need.</p>
      <p>By becoming a registered blood donor, you have taken an important step towards making a positive difference in your community. Whenever there is a need for blood, your name and contact information will be listed, allowing those in need to reach out to you for assistance.</p>
      <p>We greatly appreciate your commitment to this lifesaving cause. Your generosity and compassion can bring hope and support to individuals and families facing critical situations.</p>
      
      <p>If you have any questions or need further information, please don't hesitate to reach out to us. We are here to assist you in any way we can.</p>
      <p>Once again, thank you for your selfless decision to register as a blood donor. Together, we can make a significant impact on the lives of others.</p>
      <br>
      
      <p><strong>Best regards,</strong></p>
      <p><strong>The DonorLink Team</strong></p>
    `;

    console.log("SR-router-blood: sending mail ");
    await sendMail({ email, name, subject: "Register as Blood Donor", message: messageDonor });

    await data.save();
    res.status(200).json("done");
  } catch (err) {
    console.log(
      "got an error while posting blood donation data to database ",
      err
    );
  }
});

module.exports = router;
