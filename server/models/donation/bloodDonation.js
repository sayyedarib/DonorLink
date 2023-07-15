const mongoose = require('mongoose');
const { Schema } = mongoose;

const bloodDonationSchema = mongoose.Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profileModel'
      },
    bloodGroup: {
        type: String,
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
}, { collection: "bloodDonationData" });


module.exports = mongoose.model("bloodDonationData", bloodDonationSchema);