const mongoose = require('mongoose')

const connection = async()=>{ 

    try{
        const connect =  mongoose.connect('mongodb+srv://jithinpnihtij:Jithin12345678@jithinp.6cusfhd.mongodb.net/?retryWrites=true&w=majority')
        console.log("Database connected")

    }

    catch(err){
        console.log(err)
    }
}

module.exports = connection