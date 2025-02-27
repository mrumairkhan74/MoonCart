const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    discount:{
        type:Number,
        default:0,
    },
    image:{
        type:Buffer
    },
    bgColor:{
        type:String
    },
    panelColor:{
        type:String
    },
    textColor:{
        type:String
    }
});

module.exports = mongoose.model('products',productModel);