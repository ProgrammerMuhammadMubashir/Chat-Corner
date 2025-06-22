import mongoose from "mongoose";
const DBurl = "mongodb+srv://itismubashiratcode:Nvbyr1hW7p2iAycf@cluster0.kz8jyoi.mongodb.net/ChatCorner?retryWrites=true&w=majority";
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