const router = require("express").Router();
const userData = require("../../models/userSchema");
const volunteerData = require("../../models/volunteerSchema");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { id } = req.body;
        const { loginType } = req.query;
        const responseUser = await userData.findById(id);
        
        if(responseUser?.type=="volunteer"){
            const responseVolunteer = await volunteerData.findById(id).populate('profile').populate('works.workDetails').exec();
            if (loginType == "google") {
                return res.status(200).send({ userData: responseVolunteer, message: "loggedIn successfully" })
            }
            else{
                const validPassword = await bcrypt.compare(
                    password,
                    responseVolunteer.password
                );
                if (!validPassword) {
                    return res.status(409).send({ message: "Invalid Email or Password" });
                }
                return res.status(200).send({ userData: responseVolunteer, message: "loggedIn successfully" })
            }
        }
        console.log("SR:auth-login", responseVolunteer);

        if (loginType == "google" && responseUser) {
            return res.status(200).send({ userData: responseUser, message: "loggedIn successfully" })
        }
        else if (responseUser) {
            const validPassword = await bcrypt.compare(
                password,
                responseUser.password
            );
            if (!validPassword) {
                return res.status(409).send({ message: "Invalid Email or Password" });
            }
            return res.status(200).send({ userData: responseUser, message: "loggedIn successfully" })
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