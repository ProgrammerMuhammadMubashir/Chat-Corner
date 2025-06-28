import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const DBurl = process.env.DB_URL;
mongoose.connect(`${DBurl}`).then(()=>{
    console.log("Connected to Database successfully")
}).catch(()=>{
    console.log("Failed to connnet to Database")
})

const userSchema=mongoose.Schema({
    username:'String',
    email:'String',
    password:'String',
    refid:"String",
 urlImg:"String",
publicId:"String",


})

const userCollection=mongoose.model("user",userSchema)

export default userCollection