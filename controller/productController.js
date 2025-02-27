const productModel = require('../model/productModel');


const createProduct = async(req, res) => {
    let { name,price,discount,bgColor,panelColor,textColor } = req.body
    
    let product = await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
    });
    res.redirect('/dashboard');
};
module.exports = {
    createProduct
}