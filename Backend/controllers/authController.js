const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body
    try {
        let user = await User.findOne({ $or: [{ email }, { phone }] })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        let hashPassword = await bcrypt.hash(password, Number(process.env.ROUND))
        user = new User({
            firstName, lastName, email, phone, password: hashPassword
        })

        await user.save()
        const accessToken = jwt.sign({ userId: user.id, userName: `${user.firstName} ${user.lastName}` }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Sign Up Successfully', accessToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
}

const login=async(req,res)=>{
    const {email,phone,password}=req.body
    try {
        let user=await User.findOne({$or:[{email},{phone}]})
        if(!user){
            return res.status(400).json({message:'User Not Found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
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

module.exports={register,login}