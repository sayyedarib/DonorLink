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
    required:true
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
      }
    }
  ]
}, {collection:"volunteersData"});


module.exports = mongoose.model("volunteerFormModel", volunteerFormSchema);