const fitnessUser = require("./UserSchema");

const singleUser = async (req, res) => {
        const _id = req.params.id;
        const userSingle = await fitnessUser.findById(_id);
        res.json(userSingle);
}


module.exports = singleUser;
