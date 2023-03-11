
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
}).then(()=>{console.log("connection successful mongodb database")}).catch((err)=>{
    console.log("error in connecting with mongodb database ", err)
})

