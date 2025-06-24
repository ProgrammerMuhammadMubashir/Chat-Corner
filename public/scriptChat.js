

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
    } // To access other user for chat processing
    })



  socket.on("roomId", (roomId) => {
    console.log(roomId);
    socket.emit("room", roomId);
    Typemessage.addEventListener("input", () => {
      socket.emit("userTyping", usernameOfOther.innerText, roomId); //Typing Status Indicator
    });
    Typemessage.addEventListener("blur",()=>{
        socket.emit("userNotTyping",usernameOfOther.innerText,roomId) // When user leave and stop writing,indicate
    })
    sendmsgbtn.addEventListener("click",()=>{
        socket.emit("newMessage",Typemessage.value,socket.id,roomId) //Message distribution
        Typemessage.value=""
    })
    //Default socket.io flaw handle and will send message on Enter key as most user are used of
    window.addEventListener("keydown",(event)=>{
if(event.key==="Enter"){
  event.preventDefault()
    socket.emit("newMessage",Typemessage.value,socket.id,roomId)
        Typemessage.value=""
}
    })
  });

 

  socket.on("userTyping", (statusTyping) => {
    statusOfOther.innerText = `${statusTyping} is typing`;
  });
  socket.on("userNotTyping",(statusNotTyping,roomId)=>{
    statusOfOther.innerText=""
  })
  socket.on("newMessage",(msg,socketId)=>{
    console.log(msg,socketId)
    if(socketId===socket.id){

message1.innerHTML+=`<p id='me'>${msg}</p>` //id's me and compyter will keep sepeate msgs of both
}
else if(!(socketId===socket.id)){

    message1.innerHTML+=`<p id='computer'>${msg}</p>`
    }
  })
    socket.on("joining",()=>{
      statusOfOther.innerText="Msg could be transfered now!"
    })
    //Dark mode listener
window.addEventListener("load", () => {
  
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});