const connection = require('../config/connection');

const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
    }],
    order:{
        type:Array,
        default:[],
    }
})



module.exports = mongoose.model('user',userModel)