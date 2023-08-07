const router = require("express").Router();
const sendMail = require("../utils/sendMail");

router.post("/", async (req, res) => {
   const{subject, phone, email, message}=req.body
    try{
        await sendMail({subject, phone, email:"sayyedaribhussain4321@gmail.com", message:`<p>${message}</p>`, queryMail:email});
        res.status(200).send("query sent succesfully");
    }catch(err){
        res.status(500).send({message:"got error while sending query mail ", error:err});
    }

})

module.exports=router;