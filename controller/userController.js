const userModel = require('../model/userModel');
const {generateToken} = require('../utils/GenerateJSON');

const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');


const createUser = async(req,res)=>{
    try{
        let {name,email,contact,password} = req.body;
        let user = await userModel.findOne({email});
        if(user) res.status(501).redirect('/')
        
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,async(err,hash)=>{
                    let user = await userModel.create({
                        name,
                        email,
                        contact,
                        password:hash
                    });

                    let token = generateToken(user);
                    res.cookie('token',token);
                    res.status(201).redirect('/dashboard')
                })
            })
    }
    catch{
        res.status(500).redirect('/');
    }
}

const loginUser = async(req,res)=>{
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email});
        if(!user) return res.redirect('/')
        
            bcrypt.compare(password,user.password,(err,result)=>{
                let token = generateToken(user)
                res.cookie('token',token);
                res.redirect('/dashboard');
            })
    }
    catch{
        res.status(500).redirect('/');
    }
}



module.exports = {createUser,loginUser};