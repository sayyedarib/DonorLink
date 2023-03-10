const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(require("./router/auth"));

dotenv.config({path:'./config.env'});
require('./db/connection');
const PORT = process.env.PORT;

app.get('/test', (req, res)=>{
    res.send("working now");
})

app.get('/', (req, res)=>{
    res.send("Assalamalaikum")
});

app.listen(PORT||8080,console.log(`listening to PORT ${PORT}`));