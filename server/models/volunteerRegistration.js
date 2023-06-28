const mongoose = require('mongoose');
const { Schema } = mongoose;
const clothDonationData = require('../models/donation/clothDonation');


const volunteerFormSchema = mongoose.Schema({
picture:{
    type:String, 
    required:false
},

name:{
    type:String,
    required:true
}
,
email:{
    type: String,
    required:true
},
password: {
  type: String,
  required: false,
},
cpassword: {
  type: String,
  required: false
},
phone:{
    type:Number,
    required:true
},
bio:{
    type:String,
    required:false
},
address: {
  custom:{type:String,required:false},
  city:{type:String, required:false},
  zip:{type:String, required:false}
},
coordinates:{
    type: String,
    required:false
},
works: [
    {
      workDetails: {
        type: Schema.Types.ObjectId,
        ref: 'clothDonationData' // Reference the clothDonationData model
      },
      accepted: {
        type: Boolean,
        default:false
      },
      rejected:{
        type:Boolean,
        default:false
      },
      collected:{
        type:Boolean,
        default:false
      }
    }
  ]
}, {collection:"volunteersData"});


module.exports = mongoose.model("volunteerFormModel", volunteerFormSchema);