const router = require("express").Router();
const profileData = require("../../models/profileSchema");
const volunteerData = require("../../models/volunteerSchema");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { loginType } = req.query;
        const responseUser = await profileData.findOne({email});
        console.log("responseUser ", responseUser);

        if (loginType == "google" && responseUser) {
            return res.status(200).send({ profileData: responseUser, message: "loggedIn successfully" })
        }
        else if (responseUser) {
            const validPassword = await bcrypt.compare(
                password,
                responseUser.password
            );
            if (!validPassword) {
                return res.status(409).send({ message: "Invalid Email or Password" });
            }
            return res.status(200).send({ profileData: responseUser, message: "loggedIn successfully" })
        }
        else {
            return res.status(409).send({ message: "Email doesn't exits please signUp" });
        }

    } catch (err) {
        console.log("SR: got an error while volunteer login", err);
        res.status(500).send({ message: "got an error while login" })
    }
});

module.exports = router;