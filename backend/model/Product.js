const mongoose= require('mongoose')
const {Schema} =mongoose

const productSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const Product= mongoose.model('product', productSchema)
module.exports= Product