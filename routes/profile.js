import express from "express"
import multer from "multer"

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
        let username=req.session.login.username
        let refid=req.session.login.refid
        await userCollection.updateOne({email:req.session.login.email},{urlImg:req.file.path})
req.session.destroy(()=>{
  console.log("Session destroyed")
})
res.redirect("/")
    }
  });

    export default profileRoute