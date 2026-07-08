

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

    document.title=`${urlParams.get("username")} _ Chat `

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
 statusOfOther.innerText=`${statusTyping} is Typing...`
if(!document.getElementById("typingIndicator")){
    message1.innerHTML+=`<div class="typingMessage" id="typingIndicator">

    <div>

        <div class="typingBubble">

            <span></span>
            <span></span>
            <span></span>

        </div>

        <div class="typingText">
            Typing...
        </div>

    </div>

</div>`
let chatbox=document.getElementById("messag1")
chatbox?.scrollTo({
  top:chatbox.scrollHeight,
  behavior:"smooth"
})
}

  });
  socket.on("userNotTyping",(statusNotTyping,roomId)=>{
    statusOfOther.innerText=""
    document.getElementById("typingIndicator")?.remove()
  })
  socket.on("newMessage",(msg,socketId)=>{
    
    console.log(msg,socketId)
    if(socketId===socket.id){
      const now = new Date();
      const time = now.toLocaleTimeString();
      document.getElementById("typingIndicator")?.remove()
message1.innerHTML+=`
<div class="message sent">

<div class="messageContent">

    <div class="bubble" id="me">
        ${msg}
    </div>

    <span class="msgTime">${time}</span>

</div>

</div>` //id's me and computer will keep sepeate msgs of both

let chatbox=document.getElementById("messag1")
chatbox?.scrollTo({
  top:chatbox.scrollHeight,
  behavior:"smooth"
})
}
else if(!(socketId===socket.id)){
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("typingIndicator")?.remove()
    message1.innerHTML+=`
    <div class="message received">

    <img src="${imgOfOther.src}" class="messageAvatar">

    <div class="messageContent">

        <div class="bubble" id="computer">
            ${msg}
        </div>

        <span class="msgTime">${time}</span>

    </div>

</div>
`
let chatbox=document.getElementById("messag1")
chatbox?.scrollTo({
  top:chatbox.scrollHeight,
  behavior:"smooth"
})
    }
  })
    socket.on("joining",()=>{
      statusOfOther.innerText="Msg could be transfered now!"
    })

    socket.on("leaving",()=>{
      statusOfOther.innerText="Other user is not there.Messages will only be transfered when both users are online "
    })
    //Dark mode listener
window.addEventListener("DOMContentLoaded", () => {
  
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});