const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const FitnessAdmin = mongoose.model('FitnessAdmin', adminSchema);

const createAdmin = async () => {
    try {
        const adminData = {
            name: 'admin',
            email: 'admin@example.com',
            password: 'password'
        };

        const admin = await FitnessAdmin.create(adminData); 

    } catch (err) {
        console.error('Error creating admin:', err);
    }
};

module.exports = { FitnessAdmin, createAdmin }; 
