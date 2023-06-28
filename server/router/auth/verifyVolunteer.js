const router = require("express").Router();
const volunteerModel = require("../../models/volunteerSchema");

router.get("/:email", async(req, res)=>{
    const volunteerEmail = req.params.email;
    try{
        const volunteerData =await volunteerModel.findOne({email:volunteerEmail});
        if(!volunteerData){
            res.status(500).send({message:"volunteer email doesn't exist"})
        }
        if(volunteerData.verified){
            res.status(400).send({message:"volunteer is already verified"});
        }
        else{
            volunteerData.updateOne({email:volunteerEmail}, {verified:true});
            res.status(200).send({message:"verification successfull! Hurrah"})
        }
    }catch(error){
            res.status(500).send("SR: error while verifying volunteer");
    }

})

module.exports = router;