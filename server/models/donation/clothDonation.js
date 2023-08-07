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
    },
    timing: {
        type: String,
        required: true
    },
    nearestVolunteers: {
        type: Array,
    },
    assignedVolunteer: {
        type: Number,
        default:0
    }
}, { collection: "clothDonationData" });


module.exports = mongoose.model("clothDonationData", clothDonationSchema);