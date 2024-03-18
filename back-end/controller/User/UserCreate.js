const mongoose = require("mongoose");
const fitnessUser = require("./UserSchema");
const { genSalt, hash } = require("bcrypt");

const createUser = async (req, res) => {
    const { name, email, password, weight, height, age } = req.body;
    let image;

    const existingUser = await fitnessUser.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ alert: "User already exists" });
    }

    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        if (req.file) {
            image = req.file.filename;
        }
        
        const userCreate = await fitnessUser.create({
            name, email, password: hashedPassword, weight, height, age,profileImg:image
        });
        return res.status(201).json(userCreate);

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = createUser;
