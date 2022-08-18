const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')

//  register user
//  post
//  http://localhost:5000/api/users/

const registerUser = asynchandler(async(req,res) => {
    const {name,email,phone,password} = req.body
    if(!name || !email || !phone || !password)
    {
        res.status(400)
        throw new Error('Some fields are missing')
    }

    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,phone,
        password:hashedPassword
    })

    if(user){

        
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('INVALID user data')
    }

    res.json({message:'register User'})


})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '1d',
    })
}

// login user
// post
// http://localhost:5000/api/users/login
const loginUser = asynchandler(async(req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('INVALID user data')
    }

    res.json({message:'User Loggedin' })
})

// get user
// get
// http://localhost:5000/api/users/user

const getUser = asynchandler(async(req,res) => {
    const {_id,name,email,phone} = await User.findById(req.user.id)
    

    res.status(200).json({
        id: _id,
        name,email,phone
    })
})

// Change Password
// put
// http://localhost:5000/api/users/change

const changePassword = asynchandler(async(req,res) => {
    const {email,oldPassword,newPassword} = req.body
    console.log(email)

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(oldPassword,user.password)))
    {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,salt)

        const updated = await User.findByIdAndUpdate(user._id,{
            password: hashedPassword,
        })
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('INVALID user data')
    }

    res.json({message:'User Loggedin' })
})

module.exports = {
    registerUser,loginUser,getUser,changePassword
}