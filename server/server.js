const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(require("./router/auth"));

dotenv.config({path:'./config.env'});
require('./db/connection');
const PORT = process.env.PORT;



app.get('/', (req, res)=>{
    res.json("Assalamalaikum")
});

app.listen(PORT,console.log(`listening to PORT ${PORT}`));