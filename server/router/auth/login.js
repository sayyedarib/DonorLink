const router = require("express").Router();
const userData = require("../../models/userSchema");
const volunteerData = require("../../models/volunteerRegistration");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const responseVolunteer = await volunteerData.findOne({ email: email });
        const responseUser = await userData.findOne({ email: email });
        console.log("SR:auth-login", responseVolunteer);
        if (responseVolunteer) {
            const validPassword = await bcrypt.compare(
                password,
                responseVolunteer.password
            );
            if (!validPassword) {
                return res.status(409).send({ message: "Invalid Email or Password" });
            }
            return res.status(200).send({userData:responseVolunteer,message:"loggedIn successfully"})
        }
        // else if (responseUser) {
        //     const validPassword = await bcrypt.compare(
        //         password,
        //         responseUser.password
        //     );
        //     if (!validPassword) {
        //         return res.status(409).send({ message: "Invalid Email or Password" });
        //     }
        //     return res.status(200).send({userData:responseUser,message:"loggedIn successfully"})
        // }

        else {
            return res.status(409).send({ message: "Email doesn't exits please signUp" });
        }
    } catch (err) {
        console.log("SR: got an error while volunteer login", err);
        res.status(500).send({ message: "got an error while login" })
    }
});

module.exports = router;