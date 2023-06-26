const mongoose = require('mongoose');

const bloodDonationSchema = mongoose.Schema({
name:{
    type:String,
    required:true
}
,
email:{
    type: String,
    required:true
},
phone:{
    type:Number,
required:true
},
bloodGroup:{
    type:String,
required:true
},
address:{
    custom:{type:String},
    city:{type:String},
    zip:{type:Number}
},
message:{
    type:String,
    required:false
},
coordinates:{
    type:String, 
    required:false
},
timing:{
type:String,
required:true
},
}, {collection:"bloodDonationData"});


module.exports = mongoose.model("bloodDonationData", bloodDonationSchema);