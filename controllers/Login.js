import userCollection from "../models/connection.js";

import bcrypt from "bcrypt"
const userAuthentication=async(req,res)=>{
    let {emaillog,passwordlog}=req.body;
    let userFound=await userCollection.findOne({email:emaillog})
    if(userFound){
let verified=await bcrypt.compare(passwordlog,userFound.password)
if(verified){
    req.session.login=userFound
    res.redirect("/Home")
}
else{
res.render('login.ejs',{msg:"Wrong credentials!"})
}
    }
    else{
res.render("login.ejs",{msg:"No user found!"})
    }
}
export default userAuthentication