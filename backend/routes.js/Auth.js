const express =require('express')
const User = require('../model/User')
const router =express.Router()

router.get("/",(req, res)=>{
    mern={
        a:"sanjay",
        b: "roman"
    }
    res.send(mern)
})
router.post("/createuser", (req, res)=>{
    console.log(req.body);
    res.send(req.body)
    const user= User(req.body)
    user.save()

    
})
module.exports=router