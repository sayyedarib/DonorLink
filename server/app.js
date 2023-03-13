const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();

//payment
const paymentRoute= require('./router/paymentRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(require("./router/auth"));

dotenv.config({path:'./config.env'});

app.use('/api', paymentRoute);
app.get("/api/getkey", (req,res)=>{
res.status(200).json({key:process.env.RAZORPAY_ID})
})


module.exports = app