import userCollection from "../models/connection.js";

//For Starting chat with specific user by mentioning its unique referral id
const searchUser=async(req,res)=>{
    const searchBar=req.body.searchBar
    let userFound=await userCollection.findOne({refid:searchBar})
    if(userFound && userFound.email!==req.session.login.email){
        res.render("index.ejs",{username:userFound.username,urlImg:userFound.urlImg,msg:""})

    }
    else{
        
        res.render("index.ejs",{username:"",urlImg:"",msg:"No user found with this refral id"})
    }
}

export default searchUser