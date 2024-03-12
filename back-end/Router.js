const express = require('express')
const createUser = require('./controller/User/UserCreate')
const uploaded = require('./Middleware/ImageUpload')
const { createAdmin } = require('./controller/Admin/Admin')
const loginUser = require('./controller/User/UserLogin')
const updateUser = require('./controller/User/UpdateUser')
const getUser = require('./controller/User/GetUser')
const singleUser = require('./controller/User/GetSingleUser')
const deleteUser = require('./controller/User/DeleteUser')


const router = express.Router()

router.route('/createUser').post(uploaded.single('profileImg'),createUser) 
router.route('/loginUser').post(loginUser)
router.route('/admin').post(createAdmin) 
router.route('/updateUser/:id').put(updateUser)
router.route('/getUser').get(getUser)
router.route('/singleUser/:id').get(singleUser)
router.route('/deleteUser/:id').delete(deleteUser)



module.exports = router