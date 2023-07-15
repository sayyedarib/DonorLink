const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    cpassword: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    bio: {
        type: String,
    },
    address: {
        custom: { type: String, required: false },
        city: { type: String, required: false },
        zip: { type: String, required: false }
    },
    coordinates: {
        type: String,
        required: false
    }
}, { collection: "profileData" });


module.exports = mongoose.model("profileModel", profileSchema);