const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendMail } = require("../utils/sendMail.js");

const register = async (req, res, next) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        let user = await User.findOne({ email }).or([{ phone }]);
        // console.log(user)
        // if (email) {
        //     user = await User.findOne({ email });
        // } else if (phone) {
        //     user = await User.findOne({ phone });
        // }

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, Number(process.env.ROUND));
        user = new User({ firstName, lastName, email, phone, password: hashPassword });
        await user.save();

        const accessToken = jwt.sign(
            { userId: user._id, firstName: user.firstName, lastName: user.lastName,role:user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        if (user.email) {
            sendMail(user.email, 'Welcome to LinkedIn', 'Thank you for joining our platform!');
        }
        return res.status(200).json({ message: 'Sign Up Successfully', token: accessToken, user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'server error' });
    }
};

const login = async (req, res, next) => {
    const { email, phone, password } = req.body;
    try {
        let user = await User.findOne({ email: email }).or([{ phone: phone }]);
        // if (email) {
        //     user = await User.findOne({ email });
        // } else if (phone) {
        //     user = await User.findOne({ phone });
        // }

        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id, firstName: user.firstName, lastName: user.lastName,role:user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
};

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' }
        );

        user.resetPasswordToken = token;
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/api/auth/reset-password/${token}`;
        const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

        sendMail(user.email, 'Password Reset', message);
        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
};

const resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ _id: decoded.userId, email: decoded.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user not found' });
        }

        user.password = await bcrypt.hash(password, Number(process.env.ROUND));
        user.resetPasswordToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token has expired' });
        }
        next(error);
    }
};

module.exports = { register, login, forgetPassword, resetPassword };
