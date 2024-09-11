const express = require('express')
const Product = require("../model/Product")
const fetchuser = require('../middleware/Fetchuser')
const {body, validationResult } = require('express-validator')
const router = express.Router()

//fetch all products by single user
router.get('/getallproduct', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id })
        res.json(products)
    } catch (error) {
        res.status(500).send("internal server error")
    }
})
// add products 

router.post('/addproduct', fetchuser,
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
    async (req, res) => {
        console.log("req.files", req.files)
        console.log("req.body", req.body)
     try {
        const {title, description, price, instock}= req.body
        console.log('this our product', req.body);
        
        const error= validationResult(req)
        
        if (!error.isEmpty()){
         res.status(400).json({error:error.array()})
        }
        let images = req.files.map(el => {
            return el.filename
        })
        const product = new Product({
            title, description, price, instock, images, user: req.user.id
        })
        const savedProduct =await product.save()
        res.json(savedProduct)

     } catch (error) {
        res.status(500).send("internal server error")
     }
    })

    // update product
    router.put('/updateproduct/:id',fetchuser, async (req, res)=>{
        const {title, description,price, instock}= req.body
        try {
            const newProduct={}
            if(title){newProduct.title=title}
            if(description){newProduct.description=description}
            if(price){newProduct.price=price}
            if(instock){newProduct.instock=instock}

            let product=await Product.findById(req.params.id)
            if(!product){
                return res.status(404).send('not found')
            }
            if(!product.user  ||  product.user.toString()!==req.user.id){
                return res.status(401).send('not allowed')
            }
            product= await Product.findByIdAndUpdate(req.params.id,{$set:newProduct},{new:true} )
            res.json(product)

        } catch (error) {
            res.status(500).send("internal server error") 
        }
    })
    //deleting product
    router.delete('/deleteproduct/:id', fetchuser, async(req, res)=>{
       try {
        let product=await Product.findById(req.params.id)
        if(!product){
            return res.status(404).send('product not found')
        }
        if (product.user.toString() !==req.user.id){
            return res.status(401).send('not allowed')
        }
        product = await Product.findByIdAndDelete(req.params.id)
        res.json({"success": "product has been deleted", product:product})
       } catch (error) {
        res.status(500).send("internal server error") 
       }
    })

module.exports = router


//status code

//  200OK: The request was successful, and the server returned the requested data.

// 400 Bad Request: The server could not understand the request due to invalid syntax.
// 401 Unauthorized: The client must authenticate itself to get the requested response.
// 403 Forbidden: The client does not have access rights to the content.
// 404 Not Found: The server could not find the requested resource.

// 500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.
