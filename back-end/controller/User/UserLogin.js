const { FitnessAdmin } = require("../Admin/Admin")
const fitnessUser = require("./UserSchema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async(req,res)=>{
    const {email,password}  = req.body

    const loginUser = await fitnessUser.findOne({email})

    if(loginUser && await bcrypt.compare(password,loginUser.password)){
        return res.json({
            message:"success",
            token:generateToken(loginUser._id)  
        })
    }

    const admin = await FitnessAdmin.findOne({email})

    if(admin && password === admin.password){
        return res.json({
            message:"Admin logged in",
            token:generateToken(FitnessAdmin._id)
        })
    }

    return res.status(404).json("login failed")
}

const generateToken = (id)=>{
    return jwt.sign({id},process.env.key,{expiresIn:'1d'}) 
}

module.exports = loginUser