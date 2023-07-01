const router = require("express").Router();
const sendMail = require("../../utils/sendMail");
const clothDonation = require("../../models/donation/clothDonation");
const registeredVolunteer = require("../../models/volunteerSchema");
const findNearest = require("../../utils/findNearest");
const time = require("../../utils/time");

router.post("/", async (req, res) => {
  console.log("SR: cloth donation route");
  // Create a new Date object
  const { name, email, phone, quantity, address, message, coordinates } =
    req.body;
  const timing = time();
  const nearestVolunteer = await findNearest(coordinates, "volunteer");
  const donorIsNotVolunteer = await registeredVolunteer.findOne({ email: email });

  if (donorIsNotVolunteer) { res.status(409).send({ message: "you are volunteer ,sumbit your donations directly" }) };

  try {

    console.log("address", address);
    console.log("nearest volunteer is: ", nearestVolunteer[0].volunteer.name);
    console.log("nearest volunteer email is: ", nearestVolunteer[0].volunteer.email);

    
    const data = new clothDonation({
      name,
      email,
      phone,
      quantity,
      address,
      message,
      coordinates,
      timing,
      assignedVolunteers: nearestVolunteer,
    });
    // console.log("data ", data);
    await registeredVolunteer.findOneAndUpdate({email:email}, {workDetails:data});

    await registeredVolunteer.findOneAndUpdate(
      { _id: nearestVolunteer[0].volunteer._id },
      { $push: { works: { workDetails: data } } }
    );

    console.log("SR-router-cloth: sending mail ");

    await data.save();

    const messageVolunteer = `
    <p><strong>Dear ${nearestVolunteer[0].volunteer.name},</strong></p>
    
    <p>We wanted to inform you that <strong>${name}</strong> has made a generous donation of <strong>${quantity}</strong> cloth(s) through DonorLink. Your assistance as a registered volunteer is highly valued, and we kindly request your support in facilitating the donation process.</p>
    
    <p><strong>Donor Details:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> +91${phone}</li>
      <li><strong>Address:</strong> ${address}</li>
      <li><strong>Message:</strong> ${message}</li>
      <li><strong>Distance:</strong> ${nearestVolunteer[0].distance}</li>
    </ul>
    
    <p>Please <a href="${process.env.FRONTEND_URL}/dashboard">Login</a> to your volunteer dashboard to view and accept the order request associated with this donation. Your support in coordinating the pickup or delivery of the cloth donation would be greatly appreciated.</p>

    <p>If you have any questions or require further information, please don't hesitate to reach out to us. We are here to assist you in ensuring a smooth and successful donation process.</p>
    <p>Thank you for your time and dedication in making a positive impact within our community.</p>
    
    <br>
    
    <p><strong>Best regards,</strong></p>
    <p><strong>The DonorLink Team</strong></p>
  `;
  


    const messageDonor = `
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for donating ${quantity} cloth(s) through DonorLink. Your contribution will make a difference in someone's life.</p>
      <p>We appreciate your generosity and willingness to help those in need.</p>
      <p>Our volunteer will be soon at your door step : ${address.custom}</p>

      <p>If you have any further questions or would like to contribute more, please don't hesitate to reach out to us.</p>
      <p>Thank you once again for your support.</p>

      <p><strong>Best regards,</strong></p>
      <p><strong>The DonorLink Team</strong></p>
    `;


    await sendMail({ email: nearestVolunteer[0].volunteer.email, name, subject: "Cloth Donation alert", message: messageVolunteer });

    await sendMail({ email, name, subject: "Thanks Message", message: messageDonor });

    res.status(200).send({ message: "Thank you for donating cloth." });
  } catch (err) {
    console.log(
      "SR: got an error while posting cloth donation data to database ",
      err
    );
  }
});

module.exports = router;
