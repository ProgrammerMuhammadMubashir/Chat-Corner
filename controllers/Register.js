import userCollection from "../models/connection.js";
import bcrypt from "bcrypt"
import { v5 as uuidv5 } from 'uuid';
const userInsertionFunc=async(req,res)=>{
let {username,emailreg,passwordreg}=req.body;
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
let refid=uuidv5(emailreg, NAMESPACE);
passwordreg=await bcrypt.hash(passwordreg,10)
await userCollection.insertMany([{username:username,email:emailreg,password:passwordreg,refid:refid,urlImg:""}])
console.log("User Inserted Successfully")
res.redirect("/")
}

export default userInsertionFunc