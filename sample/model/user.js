const mongoose=require('mongoose');
const { type } = require('os');
const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },phone:{
        type:Number
    },
    age:{
        type:Number
    }
})
const UserModel=mongoose.model('data',UserSchema)
module.exports=UserModel;