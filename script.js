import express from "express"
const app=express()
const port=3000 || process.env.port
import http from "http"
import {Server} from "socket.io"
import userInsertionFunc from "./controllers/Register.js"
import userAuthentication from "./controllers/Login.js"
import session from "express-session"
import profileRoute from "./routes/profile.js"


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false ,maxAge: 24*60*60*1000}
}))

app.use("/Profile",profileRoute)

app.get("/",(req,res)=>{
  if(req.session && req.session.login){
    res.render("index.ejs")
  }
  else{
  res.render("login.ejs",{msg:"You have to login first"})
}
})
app.get("/Home",(req,res)=>{
  if(req.session && req.session.login){
    res.render("index.ejs")
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


app.get("/Register",(req,res)=>{
  if(req.session && req.session.login){
    res.render("index.ejs")
  }
  else{
  res.render("register.ejs")
  }
})

app.post("/Register",userInsertionFunc)
app.post("/",userAuthentication)


const server=http.createServer(app)
const io=new Server(server)
let users=[]
io.on('connection', (socket) => {
  // console.log('a user connected');//to show connection of user


  socket.on("setusername",(username)=>{
   
    io.emit("setusername",username,socket.id)
    users[socket.id]=username

  })
  
  socket.on('disconnect', () => {//to show that user is disconnected
 
    io.emit("userleft",(users[socket.id]),socket.id)
  });


  socket.on("chat message to all",(msg,username)=>{
io.emit("chat message to all",msg,username,socket.id)
  })

});


server.listen(port,()=>{
  console.log("Server is listening at port : " + port )
})