const mongoose  = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    weight:{type:Number},
    height:{type:Number},
    dob:{type:String},
    goal:{type:String},
    profileImg:{type:String}
})

const fitnessUser = mongoose.model("FitnessUser",userSchema) 

module.exports = fitnessUser