const express = require('express');
const productModel = require('../model/productModel');
const router = express.Router();
const {isLoggedIn} = require('../middleware/middleware');
const userModel = require('../model/userModel');


router.get('/',(req,res)=>{
    res.render('index', { user: req.user || null, error: req.error || null });
})
router.get('/dashboard',isLoggedIn,async(req,res)=>{
    let products = await productModel.find();
    res.render('dashboard',{products,user:req.user});
});
router.get('/cart',isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate('cart')
    res.render('cart',{user});
});
router.get('/cart/:id', isLoggedIn, async (req, res) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return res.status(404).render('dashboard', { products: await productModel.find(), user: req.user, error: "Product not found" });
    }

    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    res.redirect('/dashboard');
});

router.get('/cartDelete/:id', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });

    // Remove only the item that matches req.params.id
    user.cart = user.cart.filter(productId => productId.toString() !== req.params.id);

    await user.save();
    res.redirect('/cart');
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/')
});

module.exports = router