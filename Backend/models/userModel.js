const mongoose = require('mongoose');

const userModel=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique: true,
        sparse:true
    },
    phone:{
        type:String,
        unique: true,
        sparse:true},
    password:{
        type:String,
        required:true,
    }
})