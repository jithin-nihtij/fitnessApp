const fitnessUser = require("./UserSchema")

const getUser = async(req,res)=>{
    const userGet = await fitnessUser.find()
    res.json(userGet)
}

module.exports = getUser