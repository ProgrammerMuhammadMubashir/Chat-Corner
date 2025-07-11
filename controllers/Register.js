import userCollection from "../models/connection.js";
import cloudinaryPackage from 'cloudinary';
const { v2: cloudinary } = cloudinaryPackage;
import path from "path"


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config()

   cloudinary.config({
           cloud_name: process.env.CLOUD_NAME,
           api_key: process.env.API_KEY,
           api_secret: process.env.API_SECRET
         });
       
      const storage = new CloudinaryStorage({
        cloudinary,
        params: {
          folder: "uploads",
          format: async (req, file) => "jpg", 
          public_id: (req, file) => Date.now() + "-" + file.originalname,
        },
      });
      const upload2 = multer({ storage });


import bcrypt from "bcrypt"
import { v5 as uuidv5 } from 'uuid';
const userInsertionFunc=async(req,res)=>{
  let {username,emailreg,passwordreg}=req.body;
  let alreadyPresent=await userCollection.find({email:emailreg})
if(alreadyPresent.length > 0){
  res.render("register.ejs",{msg:"Login to your account or use different email"})
}
else{
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
let refid=uuidv5(emailreg, NAMESPACE);
passwordreg=await bcrypt.hash(passwordreg,10)


const publicId = path.basename(req.file.filename, path.extname(req.file.filename)); 

await userCollection.insertMany([{username:username,email:emailreg,password:passwordreg,refid:refid,urlImg:req.file?req.file.path:"",publicId:req.file?publicId:""}])

console.log("User Inserted Successfully")
res.redirect("/")
}
}

export default {userInsertionFunc,upload2}