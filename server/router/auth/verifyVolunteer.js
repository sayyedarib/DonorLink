const router = require("express").Router();
const volunteerModel = require("../../models/volunteerSchema");

router.get("/:verifyToken", async (req, res) => {
  const verifyToken = req.params.verifyToken;
  try {
    const volunteerData = await volunteerModel.findOne({ verifyToken: verifyToken });
    if (!volunteerData) {
      res.status(500).send({ message: "Volunteer email doesn't exist" });
    } else if (volunteerData.verified) {
      res.status(400).send({ message: "Volunteer is already verified" });
    } else {
      await volunteerModel.updateOne({ verifyToken: verifyToken }, { $set: { verified: true } });

      res.send(`
        <html>
          <body>
            <h1>Verification successful! Hurrah!</h1>
            <p>Please wait while you're being redirected...</p>
            <script>
              setTimeout(function() {
                window.location.href = ''${process.env.FRONTEND_URL}/auth'; // Replace '/success' with the desired URL
              }, 3000); // Redirect after 3 seconds (adjust as needed)
            </script>
          </body>
        </html>
      `);
    }
  } catch (error) {
    res.status(500).send("SR: Error while verifying volunteer");
  }
});

module.exports = router;


