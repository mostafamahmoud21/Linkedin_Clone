const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { sendMail } = require("../utils/sendMail.js");

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body
    try {
        let user = await User.findOne({ $or: [{ email }, { phone }] })
        if (!user) {
            return res.status(400).json({ message: "User already exists" })
        }
        let hashPassword = await bcrypt.hash(password, Number(process.env.ROUND))
        user = new User({
            firstName, lastName, email, phone, password: hashPassword
        })

        await user.save()
        const accessToken = jwt.sign({ userId: user.id, userName: `${user.firstName} ${user.lastName}` }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        sendMail(user.email, 'Welcome to LinkedIn', 'Thank you for joining our platform!');
        return res.status(200).json({ message: 'Sign Up Successfully', accessToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
}

const login = async (req, res) => {
    const { email, phone, password } = req.body
    try {
        let user = await User.findOne({ $or: [{ email }, { phone }] })
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' })
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Incorrect!' });
        }
        const accessToken = jwt.sign({ userId: user.id, userName: `${user.firstName} ${user.lastName}` }, 'Desha', { expiresIn: '1h' });
        return res.status(200).json({ message: 'Log In Successfully', accessToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ message: 'User Not Found' })

        let token=jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' }
        );
        user.resetPasswordToken = token
        await user.save()

        const resetUrl = `${process.env.CLIENT_URL}/api/auth/reset-password/${token}`;
        const message = `
      You requested a password reset. Click the link to reset your password:
      ${resetUrl}
    `;
        sendMail(user.email, 'Password Reset', message);
        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ _id: decoded.id, email: decoded.email });

        if (!user) {
            return res.status(400).send('Invalid token or user not found');
        }


        user.password = await bcrypt.hash(password, Number(process.env.ROUND))
        user.resetPasswordToken = undefined;
        await user.save();

        res.status(200).send('Password has been reset');
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).send('Token has expired');
        }
        res.status(500).send('Server error');
    }
}
module.exports = { register, login, forgetPassword ,resetPassword}