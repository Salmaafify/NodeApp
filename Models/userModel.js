const mongoose = require('mongoose');
const validator = require('validator');
////////////////////////////////////////////////////////
const User = mongoose.model("Users",{
    name:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 8 && value.length <3 && !(value.match(/^[A-Za-z]+$/g))){
                throw new Error("Name Must Be Only 8 Characters")
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    address:{
        type: String,
        default: null,
        trim:true
    },
    userImage:{
        // 
        //type: Buffer
        type: String,
        required: true
        // contentType: String
    },

})

module.exports = User