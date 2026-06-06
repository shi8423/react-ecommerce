require('dotenv').config();

const mongoose=require('mongoose');
constdotenv=require('dotenv').config();
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODBURL);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}
module.exports=connectDB;