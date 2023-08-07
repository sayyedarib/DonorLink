const mongoose = require('mongoose');
const { Schema } = mongoose;

const volunteerFormSchema = mongoose.Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profileModel'
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
  }
  ,
  works: [
    {
      workDetails: {
        type: Schema.Types.ObjectId,
        ref: 'clothDonationData'
      },
      accepted: {
        type: Boolean,
        default: false
      },
      rejected: {
        type: Boolean,
        default: false
      },
      collected: {
        type: Boolean,
        default: false
      }
    }
  ]
}, { collection: "volunteersData" });


module.exports = mongoose.model("volunteerModel", volunteerFormSchema);