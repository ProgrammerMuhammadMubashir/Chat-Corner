import express from "express"
import ServerlessHttp from "serverless-http"
const app=express()

import http from "http"
import {Server} from "socket.io"
import userInsertionFunc from "./controllers/Register.js"
import userAuthentication from "./controllers/Login.js"
import session from "express-session"
import profileRoute from "./routes/profile.js"
import registerRoute from "./routes/register.js"
import {forgetPassword,forgetNextFunc} from "./controllers/Forget.js"

import cookieParser from "cookie-parser"
import userCollection from "./models/connection.js"
import searchUser from "./controllers/Home.js"

import dotenv from "dotenv";
dotenv.config()
const port=3000 || process.env.port

app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
let sessionMiddleware=session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false ,maxAge: 24*60*60*1000}
})
app.use(sessionMiddleware)


app.use("/Profile",profileRoute)
app.use("/Register",registerRoute)

app.get("/",(req,res)=>{
  if(req.session && req.session.login){
   res.render("index.ejs",{username:"",urlImg:"",msg:""})
  }
  else{
  res.render("login.ejs",{msg:"You have to login first"})
}
})

app.get("/Home",(req,res)=>{
  if(req.session && req.session.login){
      res.render("index.ejs",{username:"",urlImg:"",msg:""})
  }
  else{
    res.render("login.ejs",{msg:"You have to login first"})
  }
})

app.get("/Setting",(req,res)=>{
  if(req.session && req.session.login){
   
    res.render("setting.ejs")

  }
  else{
  res.render("login.ejs",{msg:"You have to login first"})
}
})




app.post("/",userAuthentication)
app.post("/Forget",forgetPassword)
app.post("/Forget2",forgetNextFunc)

app.post("/Home",searchUser)

app.get("/Forget",(req,res)=>{
  if(req.session && req.session.login){
    res.render("index.ejs",{username:"",urlImg:"",msg:""})
  }
  else{
  res.render("forget.ejs",{msg:""})
}
})
app.get("/Forget2",(req,res)=>{
    if(req.session && req.session.login){
     res.render("index.ejs",{username:"",urlImg:"",msg:""})
  }
  else{
  res.render("forget2.ejs",{msg:""})
  }
})
app.get("/Chat",(req,res)=>{
res.render("chat.ejs")
})

const server=http.createServer(app)
const io=new Server(server)
let activeRooms=[]


const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))
io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  
  // Extract user names
  let myName = socket.request.session.login.username;
  let yourName = socket.handshake.query.username;
  
  // Generate consistent room ID (sorted to avoid duplicates)
  let roomId = [myName, yourName].sort().join('_');
  socket.emit('roomId', roomId);

  // Check for existing rooms (fixed logic)
  let existingRooms = activeRooms.filter(room => 
    room.roomId === roomId || 
    (room.userOne === myName && room.userTwo === yourName) || 
    (room.userOne === yourName && room.userTwo === myName)
  );
  
  console.log('Existing rooms:', existingRooms);

  socket.on("room", (roomId) => {
    
    if (existingRooms.length === 0 && myName && yourName && roomId) {
      let newRoom = {
        roomId: roomId,
        userOne: myName,
        userTwo: yourName,
      };
      activeRooms.push(newRoom);
    }
  socket.join(roomId)
    io.to(roomId).emit("Room", activeRooms);
    let activeMembers=io.sockets.adapter.rooms.get(roomId)
    activeMembers=Array.from(activeMembers)
    if(activeMembers.length===2){
    io.to(roomId).emit("joining")
    }
  });
socket.on("userTyping",(statusTyping,roomId)=>{
  socket.to(roomId).emit("userTyping",statusTyping)
})
socket.on("userNotTyping",(statusNotTyping,roomId)=>{
socket.to(roomId).emit("userNotTyping",statusNotTyping)
})
socket.on("newMessage",(msg,socketId,roomId)=>{
 
io.to(roomId).emit("newMessage",msg,socketId)

})

});






server.listen(port,()=>{
  console.log("Server is listening at port : " + port )
})