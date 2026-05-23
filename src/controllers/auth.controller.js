const User = require('../models/user.model')

const signupController = async (req,res) =>{
    try {    
        const {email,password,name} = req.body;
        const newUser = new User({
            email : email,
            password : password,
            name : name
        })
        await newUser.save();
        return res.status(201).json({
            message : 'user created successfully',
            data : newUser
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signupController
}