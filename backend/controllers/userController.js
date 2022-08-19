const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')

const emailValidator = require('deep-email-validator');
async function isEmailValid(email) {
    return emailValidator.validate(email)
   }

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

    
    
    const {valid, reason, validators} = await isEmailValid(email);
    
    if (!valid){
        return res.status(400).send({
            message: "Please provide a valid email address.",
            reason: validators[reason].reason
        })
    }
    else{

        var passwordValidator = require('password-validator')
        var schema = new passwordValidator();
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        // .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
        if(schema.validate(password) === false){
            res.status(400)
            throw new Error('Password Rules: Minimum length 8 & Must have uppercase and lowercase letters & Must have at least 1 digit & Should not have spaces')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,phone,
            password:hashedPassword
        })

        //................................
        if(user){

            const nodemailer = require('nodemailer');
            const hbs = require('nodemailer-express-handlebars')
            const path = require('path')
     
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dinesh.chevvakula@classicinformatics.com',
                    pass: 'bt16CSE010'
                }
            });
            
    
            const handlebarOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./backend/views/'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./backend/views/'),
            };
            
            // use a template file with nodemailer
            mailTransporter.use('compile', hbs(handlebarOptions))
            
            let mailDetails = {
                from: 'dinesh.chevvakula@classicinformatics.com',
                to: user.email,
                subject: 'Test mail',
                text: 'Node.js testing mail for Authentication'
            };
    
            var mailOptions = {
                from: '"MERN APP" <registration@gmail.com>', 
                to: 'dinesh.chevvakula@classicinformatics.com', // list of receivers
                subject: 'Registration Successful',
                template: 'email', // the name of the template file i.e email.handlebars
                context:{
                    name: user.name, 
                    company: 'MERN APP' 
                }
            };
    
            
            mailTransporter.sendMail(mailOptions, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
    
    
            
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
        //................................

    }
    


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
        var passwordValidator = require('password-validator')
        var schema = new passwordValidator();
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        // .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
        if(schema.validate(newPassword) === false){
            res.status(400)
            throw new Error('Password Rules: Minimum length 8 & Must have uppercase and lowercase letters & Must have at least 1 digit & Should not have spaces')
        }

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