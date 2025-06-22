import userCollection from "../models/connection.js";
import nodemailer from "nodemailer"
import { v5 as uuidv5 } from 'uuid';
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config()

const forgetPassword=async(req,res)=>{
  const email=req.body.emailForget
  let z=await userCollection.find({email:email})
    console.log(z)
if(z.length > 0 ){
  const transporter = nodemailer.createTransport({
    
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,  //  email
    pass: process.env.APP_PASSWORD,  // App Password
  },

  
});
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
let e=Math.floor(Math.random()*1000)
let y=Date.now()
let code=uuidv5(String(e+y), NAMESPACE);
req.session.forget={email,code};

const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to:email , 
    subject: `Password Recovery`,
    text: `Dear User,
 Use this code ${code} and then retype new password in given field to to recover account`
  };

transporter.sendMail(mailOptions,async (error, info) => {
  if (error) {
    console.log('Error:', error);
    res.json({Note:"Failed"})
} else{
  console.log("Email is transfered")
  res.redirect("/Forget2")
}
})
}
else{
    res.render("Forget.ejs",{msg:"Could not find email"})
}
}

const forgetNextFunc=async(req,res)=>{
let {forgetCode,passwordForget}=req.body
let password=await bcrypt.hash(passwordForget,10)
let email=req.session.forget.email
let code=req.session.forget.code
console.log(email)
if(forgetCode===code){
  await userCollection.updateOne({email:email},{password:password})
  res.redirect("/")
}
else if (forgetCode !== code){
res.render("Forget2.ejs",{msg:"Verification code did not match."})
}
else{
  res.render("Forget.ejs",{msg:"Something went wrong"})
}
}


export {forgetPassword,forgetNextFunc} 