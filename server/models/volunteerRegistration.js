const mongoose = require('mongoose');


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
        type: Object,
        required: false
      },
      accepted: {
        type: Boolean,
        required: false
      },
      rejected:{
        type:Boolean,
        required:false
      },
      collected:{
        type:Boolean,
        required:false
      }
    }
  ]
}, {collection:"volunteersData"});


module.exports = mongoose.model("volunteerFormModel", volunteerFormSchema);