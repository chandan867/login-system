const mongoose=require('mongoose')
//const bcrypt=require('bcryptjs')
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:false,
    },
    googleId:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now()

    },
    randString:{
        type:String,
        required:false,
    },
    isValidated:{
        type:Boolean,
        default:false
    }
    
},{
    timeStamps:true
})

const User=mongoose.model('User',UserSchema)
module.exports=User;