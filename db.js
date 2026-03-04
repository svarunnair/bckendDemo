require("dotenv").config();
const mongoose = require("mongoose")


const dbConnection =async()=>{

    try{
       await mongoose.connect(process.env.URL)
       console.log("db is connected")
    }
    catch(err){
        console.log("error, db not connected", err)
    }
}

module.exports = dbConnection