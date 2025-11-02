// const socket=io()
// // let username=prompt("Enter your name")

// if(username){
//     socket.emit("setusername",username)
// }

// let Typemessage1=document.getElementById("Typemessage1")
// let sendbtnmsg1=document.getElementById("sendbtnmsg1")
// let message1=document.getElementById("message1")

// sendbtnmsg1.onclick=()=>{
//     if (Typemessage1.value) {
//       socket.emit('chat message to all', Typemessage1.value,username);
//       Typemessage1.value = '';
//     }
// }
// socket.on("chat message to all",(msg,username,sender)=>{
//     if(sender==socket.id){
// message1.innerHTML+=`<span id="me">You:${msg}</span>`
// }
// else{
//     message1.innerHTML+=`<span id="computer">${username}:${msg}</span>` 
// }
// })

// socket.on("setusername",(username,sender)=>{
//     if(sender==socket.id){
//     message1.innerHTML+=`<span id="me">${username} joined the chat</span>` 
//     }
//     else{
//         message1.innerHTML+=`<span id="computer">${username} joined the chat</span>` 
//     }
// })
// socket.on("userleft",(username,sender)=>{
//     if(sender==socket.id){
//     message1.innerHTML+=`<span id="me">${username} left the chat</span>` 
 
//     }
//     else{
//         message1.innerHTML+=`<span id="computer">${username} left the chat</span>` 
//     }
// })



let rceDiv=document.querySelector(".rceDiv")
let NameOfOther=document.getElementById("NameOfOther")
console.log(NameOfOther)
if(NameOfOther.innerText===""){
    rceDiv.style.display="none"
}

    rceDiv.addEventListener("click",()=>{
window.open("/Chat","_self")

    })



document.addEventListener("DOMContentLoaded", () => {
    const darkmode = document.getElementById("darkmode");
    const savedPrimaryColor= localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");
    const savedGradient=localStorage.getItem("--gradient")

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
        document.documentElement.style.setProperty('--gradient', savedGradient);
        
    }
});
