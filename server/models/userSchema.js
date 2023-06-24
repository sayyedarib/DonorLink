const mongoose = require('mongoose');


const userFormSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
    },
    cpassword: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
    },
    bio: {
        type: String,
        required: false
    },
    address: {
       custom:{type:String,required:false},
       city:{type:String, required:false},
       zip:{type:String, required:false}
    },
    coordinates: {
        type: String,
        required: false
    }
}, { collection: "userData" });


module.exports = mongoose.model("userFormModel", userFormSchema);