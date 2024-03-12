const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')

const router = require('./Router')
const connection = require('./Config/Mongo')

app.use('/uploads', express.static('uploads'));

dotenv.config()
connection()
 

app.use(express.json())
app.use(cors());
app.use('/',router)
 


const Port = 5000

app.listen(Port,console.log(`Server is running on ${Port}`))
