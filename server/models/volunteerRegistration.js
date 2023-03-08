const mongoose = require('mongoose');
const { collection } = require('./signUpForm');


const volunteerFormSchema = mongoose.Schema({
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
bio:{
    type:String,
    required:false
},
address:{
    type:String,
    required:false
}
}, {collection:"volunteersData"});


module.exports = mongoose.model("volunteerFormModel", volunteerFormSchema);