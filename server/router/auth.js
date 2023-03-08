const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const signUpForm = require("../models/signUpForm");

dotenv.config({ path: "./config.env" });
require("../db/connection");

//SignUp Route
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
    } else {
      const data = new signUpForm({
        name,
        email,
        password,
        cpassword,
      });
      await data.save();
      res.status(202).json({ message: "data sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});


//login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email or password not filled " });
    
    }

    const userExists = await signUpForm.findOne({ email: email });
    if (userExists) {
      const passwordMatch = await bcrypt.compare(password, userExists.password);
const token = await userExists.generateAuthToken();

res.cookie("jwtoken", token, {
  expires: new Date(Date.now() + 2589200000),
  httpOnly: true,
});
console.log("token saved in cookie")
      if (!passwordMatch) {
        return res.status(400).json("Invalid credential");
      } else {
        console.log("user signed in successfully");
        res.json("user signed in successfully");
      }
    } else {
      res.status(400).json({ error: "user not found in database. " });
    }
  } catch (err) {
    console.log("catched error while login ", err);
  }
});

router.get("/", (req, res) => {
  res.send("I'm a middleware");
});

module.exports = router;
