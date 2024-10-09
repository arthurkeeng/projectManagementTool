
const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async ()=>{
   const connection = await mongoose.connect(`${process.env.MONGO_URI}`)

   console.log("mongoose connectd successufully")
}
module.exports = connectDB;
