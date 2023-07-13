const mongoose = require('mongoose');

const clothDonationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address: {
        custom: { type: String },
        city: { type: String },
        zip: { type: Number }
    },
    message: {
        type: String,
        required: false
    },
    coordinates: {
        type: String,
        required: false
    },
    timing: {
        type: String,
        required: true
    },
    assignedVolunteers: {
        type: Array,
        required: false
    }
}, { collection: "clothDonationData" });


module.exports = mongoose.model("clothDonationData", clothDonationSchema);