const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');


const isLoggedIn = async (req, res, next) => {
    // if cookie is available then user move forward else it move back to index or login page
    if (!req.cookies.token) {
        return res.redirect('/')
    }
    try {

        // for jwt verify 
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        // for find user email
        let user = await userModel.findOne({ email: decode.email }).select('-password');

        // if user is not find then it return user to login pass or index page 
        if (!user) return res.redirect('/')
        req.user = user;
        // if user email is admin then he go to dashboard of admin panel if user is email is not admin then he move simple dashboard 
        if (user.email === "admin@gmail.com" && req.originalUrl !=='/dashboard' ) {
            return res.redirect('/dashboard');
        }
        next();

    }
    catch {
        res.redirect('/');
    }
}

module.exports = {
    isLoggedIn
}


// req.orignalUrl mean if url is not equal to /dashboard then this admin user move to dashboard 