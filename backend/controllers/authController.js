let users = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mail = require('../utils/gmail');
require('dotenv').config();

let secretkey = process.env.JWT_SECRET;

// REGISTER
exports.register = async (req, res) => {
    try {

        const { username, password, email, role } = req.body;

        // 1. Check fields
        if (!username || !password || !email || !role)
            return res.json({
                msg: "missing fields"
            });

        // 2. Check if user already exists
        let checkuser = await users.findOne({ username });

        if (checkuser)
            return res.json({
                msg: "user already exist"
            });

        // 3. Hash password
        let hashedpassword = await bcrypt.hash(password, 10);

        // 4. Save user
        await users.create({
            username,
            password: hashedpassword,
            email,
            role
        });

        // 5. Generate token
        let payload = {
            username,
            email
        };

        let token = jwt.sign(
            payload,
            secretkey,
            { expiresIn: '1hr' }
        );

        // 6. Send mail
        mail(email, username);

        // 7. Response
        res.json({
            msg: "registration successful",
            token
        });

    } catch (error) {
        res.json({
            msg: error.message
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password)
            return res.json({
                msg: "missing fields"
            });

        let userdetails = await users.findOne({ username });

        if (!userdetails)
            return res.json({
                msg: "invalid credentials"
            });

        let checkpassword = await bcrypt.compare(
            password,
            userdetails.password
        );

        if (!checkpassword)
            return res.json({
                msg: "invalid credentials"
            });

        // verify the token
        let token = req.headers.authorization.split(' ')[1];

        let isverified = await jwt.verify(
            token,
            process.env.SECRETKEY
        );

        if (!isverified)
            return res.json({
                msg: "invalid token"
            });

        // Generate token
        let payload = {
            username: userdetails.username,
            role: userdetails.role
        };

        token = jwt.sign(
            payload,
            secretkey,
            { expiresIn: '30d' }
        );

        res.json({
            msg: "login successful",
            token
        });

    } catch (error) {
        res.json({
            msg: error.message
        });
    }
};