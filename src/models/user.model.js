const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true,"email is required"],
        unique : [true, "email should be unique"],
        lowercase : true,
        trim : true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true, "password is required"],
        trim:true, 
    },
    name : {
        type : String,
        required : [true ,"Name is required "],
        minLength : [6, "Name must be more then 6 characters"]
    }
},{timestamps : true})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;