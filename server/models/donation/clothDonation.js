const mongoose = require('mongoose');
const { Schema } = mongoose;

const clothDonationSchema = mongoose.Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profileModel'
      },
    quantity: {
        type: Number,
        required: true
    },
    message: {
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