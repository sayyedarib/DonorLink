const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const signUpSchema = require("../models/signUpForm");
const signUpForm = require("../models/signUpForm");
dotenv.config({ path: "./config.env" });
require("../db/connection");

router.post("/signUp", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(400).json({ error: "plz fill all the required field" });
  }

  try {
    const response = await signUpForm.findOne({ email: email });
    if (response) {
      return res.status(422).json({ message: "email already exists." });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ message: "password and confirm password mismatched" });
    }
    else{
        const data = new signUpForm({
            name, email, password, cpassword
        })
        await data.save();
        res.status(202).json({message:"data sent successfully"})
    }
  } catch (err) {
    console.log(err)
  }
});

router.get("/", (req, res) => {
  res.send("I'm a middleware");
});

module.exports = router;
