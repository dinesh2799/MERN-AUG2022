const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add the name']
    },
    email:{
        type: String,
        required: [true,'Please enter an email address'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Please enter a password']
    },
    phone:{
        type: Number,
        required: [true,'Please enter phone number']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)