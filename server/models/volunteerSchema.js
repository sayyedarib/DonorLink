const mongoose = require('mongoose');
const { Schema } = mongoose;
const clothDonationData = require('./donation/clothDonation');


const volunteerFormSchema = mongoose.Schema({
picture:{
    type:String, 
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
},
cpassword: {
  type: String,
},
phone:{
    type:Number,
    required:true
},
bio:{
    type:String,
},
address: {
  custom:{type:String},
  city:{type:String},
  zip:{type:String}
},
coordinates:{
    type: String,
},
verified:{
  type:Boolean,
  default:false 
},
verifyToken:{
  type:String,
}
,
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