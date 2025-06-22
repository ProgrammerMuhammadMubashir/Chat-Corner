

let Typemessage=document.getElementById("Typemessage")
let sendmsgbtn=document.getElementById("sendmsgbtn")
let message1=document.getElementById("message1")

let usernameOfOther=document.getElementById("usernameOfOther")
let imgOfOther=document.getElementById("imgOfOther")
let statusOfOther=document.getElementById("statusOfOther")
let urlParams=new URLSearchParams(window.location.search)
usernameOfOther.innerText=urlParams.get("username")
imgOfOther.src=urlParams.get("imgUrl")
 const socket = io({
    query: {
      username:usernameOfOther.innerText,
    }
    })



  socket.on("roomId", (roomId) => {
    console.log(roomId);
    socket.emit("room", roomId);
    Typemessage.addEventListener("input", () => {
      socket.emit("userTyping", usernameOfOther.innerText, roomId);
    });
    Typemessage.addEventListener("blur",()=>{
        socket.emit("userNotTyping",usernameOfOther.innerText,roomId)
    })
    sendmsgbtn.addEventListener("click",()=>{
        socket.emit("newMessage",Typemessage.value,socket.id,roomId)
        Typemessage.value=""
    })
    
    window.addEventListener("keydown",(event)=>{
if(event.key==="Enter"){
  event.preventDefault()
    socket.emit("newMessage",Typemessage.value,socket.id,roomId)
        Typemessage.value=""
}
    })
  });

  socket.on("Room", (activeRooms) => console.log(activeRooms));

  socket.on("userTyping", (statusTyping) => {
    statusOfOther.innerText = `${statusTyping} is typing`;
  });
  socket.on("userNotTyping",(statusNotTyping,roomId)=>{
    statusOfOther.innerText=""
  })
  socket.on("newMessage",(msg,socketId)=>{
    console.log(msg,socketId)
    if(socketId===socket.id){

message1.innerHTML+=`<p id='me'>${msg}</p>`
}
else if(!(socketId===socket.id)){

    message1.innerHTML+=`<p id='computer'>${msg}</p>`
    }
  })
    socket.on("joining",()=>{
      statusOfOther.innerText="Msg could be transfered now!"
    })
window.addEventListener("load", () => {
  
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});