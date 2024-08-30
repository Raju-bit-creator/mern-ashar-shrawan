const express =require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router =express.Router()

router.get("/",(req, res)=>{
    mern={
        a:"sanjay",
        b: "roman"
    }
    res.send(mern)
})
router.post("/createuser",[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async(req, res)=>{
    // console.log(req.body);
    // res.send(req.body)
    // const user= User(req.body)
    // user.save()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    let user= await User.findOne({email:req.body.email})
    if (user){
        return res.status(400).json({error:"user already exist"})
    }
    const salt=await bcrypt.genSalt(10)
     secPass= await bcrypt.hash(req.body.password, salt)  ,
    user = await  User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      }).then(user => res.json(user));

    
})
module.exports=router