const router = require("express").Router();
const userData = require("../../models/userSchema");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { type, name, email, password, cpassword, phone, picture, bio, address, coordinates } = req.body;
        const response = await userData.findOne({ email: email });
        if (response) {
            console.log("email already exists");
            return res.status(409).send({ message: "email already exists" });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        const hashConfirmPassword = await bcrypt.hash(
            cpassword,
            salt
        );
        const data = new userData({
            type,
            name,
            email,
            password: hashPassword,
            cpassword: hashConfirmPassword,
            phone,
            picture,
            bio,
            address,
            coordinates,
        });
        await data.save();

        res.status(200).json({ message: "user data saved successfully." });
    } catch (err) {
        console.log("got an error while user registration", err);
        res.status(500).json({ message: "got an error while user registration " })
    }
});

module.exports = router;