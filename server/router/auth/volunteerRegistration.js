const router  = require("express").Router();
const volunteerData = require("../../models/volunteerSchema");
const bcrypt = require("bcrypt");
const sendMail = require("../../utils/sendMail");
const crypto = require("crypto");

router.post("/", async (req, res) => {
    try {
      const { picture, name, email,password,cpassword, phone, bio, address, coordinates } = req.body;
      const response = await volunteerData.findOne({ email: email });
      if (response) {
        console.log("email already exists");
        return res.status(409).send({message:"email already exists"});
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);
      const hashConfirmPassword = await bcrypt.hash(
        cpassword,
        salt
      );
      const verifyToken = crypto.randomBytes(64).toString("hex");
      const data = new volunteerData({
        picture,
        name,
        email,
        password:hashPassword,
        cpassword:hashConfirmPassword,
        phone,
        bio,
        address,
        coordinates,
        verifyToken,
      });
      
      const messageVolunteer = `
      <p><strong>Dear ${name},</strong></p>
      
      <p>Thank you for joining DonorLink as a volunteer! We are thrilled to have you on board and appreciate your commitment to making a positive impact in our community.
      To ensure the security and authenticity of your account, we kindly request you to verify your email address. Please click on the following link to complete the verification process: <a href="${process.env.BACKEND_URL}/api/verifyVolunteer/${verifyToken}">verify account</a>.</p>
      
      <p>Your dedication and support as a volunteer will play a crucial role in helping us fulfill our mission and assist those in need. Together, we can make a difference.
      If you have any questions, need assistance, or would like to explore volunteer opportunities, please don't hesitate to reach out to us. We are here to support you every step of the way.</p>
      
      <p>Thank you once again for joining DonorLink. We are excited to work together towards creating a more compassionate and resilient community.</p>
      
      <p>Best regards,</p>
      <p>The DonorLink Team</p>
      `;
      
      await sendMail({email,name, subject:"Thank you for joining DonorLink", message:messageVolunteer});
      await data.save();

      res.status(200).json({message: "volunteer data saved successfully."});
    } catch (err) {
      console.log("got an error while volunteer registration", err);
      res.status(500).json({message:"got an error while volunteer registration "})
    }
  });

  module.exports = router;