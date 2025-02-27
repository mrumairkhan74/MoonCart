const express = require('express');
const {createProduct } = require('../controller/productController');
const {upload} = require('../config/multer-config');
const router = express.Router();

router.post('/createProduct',upload.single('picture'),createProduct)
router.get('/product',(req,res)=>{
    res.render('product')
})


module.exports = router