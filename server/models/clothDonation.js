const mongoose = require('mongoose');

const clothDonationSchema = mongoose.Schema({
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
quantity:{
    type:Number,
required:true
},
address:{
    type:String,
    required:false
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
assignedVolunteers:{
    type:String, 
    required:false
}
}, {collection:"clothDonationData"});


module.exports = mongoose.model("clothDonationData", clothDonationSchema);