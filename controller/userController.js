const userModel = require('../model/userModel');
const { generateToken } = require('../utils/GenerateJSON');

const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');

const createUser = async (req, res) => {
    try {
        let { name, email, contact, password } = req.body;

        // 1. Input validation (basic sanitization)
        name = name.trim();
        email = email.trim().toLowerCase();
        contact = contact.trim();

        // 2. Validate password strength (add more rules as necessary)
        if (!password || password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
        }

        // 3. Check if the user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // 4. Hash password securely using bcrypt (async/await instead of callback)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create new user with hashed password
        user = await userModel.create({
            name,
            email,
            contact,
            password: hashedPassword
        });

        // 6. Generate authentication token (JWT or similar)
        const token = generateToken(user);

        // 7. Set token in cookies securely
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures cookie is only sent over HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'Strict' // Protects against cross-site request forgery (CSRF) attacks
        });

        res.status(201).redirect('/dashboard');
    } catch (error) {
        console.error(error); // Log error for debugging purposes
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.render('index', { error: { email: "Something went Wrong" } });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.render('index', { error: { password:"Something went Wrong" } });
            }

            let token = generateToken(user);
            res.cookie('token', token);
            res.redirect('/dashboard');
        });
    } catch (error) {
        res.status(500).render('index', { error: { general: "Something went wrong" } });
    }
};




module.exports = { createUser, loginUser };