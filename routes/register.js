import express from "express"


import usercontroller from "../controllers/Register.js"
const registerRoute=express.Router()

import dotenv from "dotenv";
dotenv.config()

registerRoute.get("/",(req,res)=>{
  if(req.session && req.session.login){
    res.render("index.ejs")
  }
  else{
  res.render("register.ejs",{msg:""})
  }
})
registerRoute.post("/",usercontroller.upload2.single("image"),usercontroller.userInsertionFunc)


export default registerRoute