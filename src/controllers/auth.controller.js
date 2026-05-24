require('dotenv').config()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function createToken(user){
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});
    return token;
}

const signupController = async (req,res) =>{
    try {    
        const {email,password,name} = req.body;
        const isExists = await User.findOne({email:email});
        if(isExists){
            return res.status(409).json({
                message : 'user already exists',
                status : 'failed'
            })
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            email : email,
            password : hashPassword,
            name : name
        })
        await newUser.save();
        const token = createToken(newUser);
        res.cookie('token',token,{
            maxAge:'86400000'
        })
        return res.status(201).json({
            message : 'user created successfully',
            data : newUser
        })
    } catch (error) {
        console.log(error)
    }
}

const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({
                message : 'user not found',
                status:'failed'          
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message : 'invalid credentials',
                status : 'failed'
            })
        }
        const token = createToken(user);
        res.cookie('token',token,{maxAge:'86400000'})
        return res.status(200).json({
            message : 'user loggedin successfully',
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signupController,
    loginController
}