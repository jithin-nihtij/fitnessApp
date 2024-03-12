const fitnessUser = require("./UserSchema")

const deleteUser = async(req,res)=>{
    const _id = req.params.id

    const userDelete = await fitnessUser.findByIdAndDelete(_id)
    res.json("userDeleted")
}

module.exports = deleteUser