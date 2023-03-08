const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const signUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
  },
  { collection: "signUpData" }
);

signUpSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

signUpSchema.methods.generateAuthToken = async function (){
  try {
    let tokenNew = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenNew });
    await this.save();
    console.log("token saved")
    return tokenNew;
  } catch (err) {
    console.log("error in generating token ", err);
  }
}


module.exports = mongoose.model("signUpData", signUpSchema);
