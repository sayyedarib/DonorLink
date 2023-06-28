const router = require("express").Router();
const userData = require("../../models/userSchema");
const volunteerData = require("../../models/volunteerRegistration");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { loginType } = req.query;
        const responseVolunteer = await volunteerData.findOne({ email: email });
        const responseDonor = await userData.findOne({ email: email });
        console.log("SR:auth-login", responseVolunteer);

        if(loginType=="google"&&responseVolunteer||responseDonor){
            return res.status(200).send({ userData: responseVolunteer?responseVolunteer:responseDonor, message: "loggedIn successfully" })
        }

        if (responseVolunteer) {
            const validPassword = await bcrypt.compare(
                password,
                responseVolunteer.password
            );
            if (!validPassword) {
                return res.status(409).send({ message: "Invalid Email or Password" });
            }
            return res.status(200).send({ userData: responseVolunteer, message: "loggedIn successfully" })
        }

        else if (responseDonor) {
            const validPassword = await bcrypt.compare(
                password,
                responseDonor.password
            );
            if (!validPassword) {
                return res.status(409).send({ message: "Invalid Email or Password" });
            }
            return res.status(200).send({ userData: responseDonor, message: "loggedIn successfully" })
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