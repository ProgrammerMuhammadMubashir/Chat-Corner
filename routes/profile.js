import express from "express"
import multer from "multer"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import userCollection from "../models/connection.js";
import upload from  "../controllers/Profile.js";
const profileRoute=express.Router()


profileRoute.get("/",(req,res)=>{
  if(req.session.login){
   let username=req.session.login.username
   let refid=req.session.login.refid
   let urlImg=req.session.login.urlImg
   res.render("profile.ejs",{username:username,refid:refid,urlImg:urlImg,msg:""})
  }
  else{
  res.render("login.ejs",{msg:"You have to login first"})
  }
})
profileRoute.post("/", upload.single("image"), async (req, res) => {
  if(req.file.path){
    let previousImg= await userCollection.find({email:req.session.login.email})
    let previousPublicId = previousImg[0].publicId
    console.log(previousImg)
    const publicId = path.basename(req.file.filename);
    console.log(publicId)  
        let username=req.session.login.username
        let refid=req.session.login.refid
        console.log(req.file)
        await userCollection.updateOne({email:req.session.login.email},{urlImg:req.file.path},{publicId:publicId})
req.session.destroy(()=>{
  console.log("Session destroyed")
})
res.redirect("/")   
    }
  });

    export default profileRoute