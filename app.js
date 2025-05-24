const express = require('express');

const cookieParser = require('cookie-parser');
const path = require('path');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const indexRouter = require('./router/index');







const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// dotenv
require('dotenv').config();

// app engine using ejs
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')))



// all router
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/',indexRouter);


app.listen(3000,()=>{
    console.log('Server listen')
})