const express= require('express')
const Product =require("../model/Product")
const fetchuser = require('../middleware/Fetchuser')
const router= express.Router()

router.get('/getallproduct',fetchuser, async(req, res)=>{
    try {
        const products= await Product.find({user:req.user.id})
        res.json(products)
    } catch (error) {
        res.status(500).send("internal server error")
    }
})
module.exports = router
