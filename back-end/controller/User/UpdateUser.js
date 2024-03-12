const fitnessUser = require("./UserSchema")
const bcrypt = require('bcrypt')

const updateUser = async (req, res) => {
    const { name, oldpassword, newpassword, weight, age, profileImg } = req.body
    const _id = req.params.id

    try {
        const user = await fitnessUser.findById(_id)

        if (!user) {
            return res.status(404).json("User not found")
        }

        const isPasswordValid = await bcrypt.compare(oldpassword, user.password)

        if (!isPasswordValid) {
            return res.status(401).json('Old password does not match')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newpassword, salt)

        user.password = hashedPassword
        user.name = name
        user.weight = weight
        user.age = age
        user.profileImg = profileImg
        await user.save()

        res.json(user)
        
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal Server Error')
    }
}

module.exports = updateUser
