const switchElement = document.getElementsByClassName("toggleSwitch")



Array.from(switchElement).forEach((se)=>{
se.addEventListener("click",()=>{
se.classList.toggle("active")
let knob=se.firstElementChild
knob.classList.toggle("activeknob")
checkDarkMode()
})
})
const checkDarkMode=()=>{
const darkmode=document.getElementById("darkmode")
darkmode.addEventListener("click",()=>{
    if(darkmode.classList.contains("active")){
    document.documentElement.style.setProperty('--primarycolor', "Black");
    document.documentElement.style.setProperty('--primarydarkpurple', "#333333");
    localStorage.setItem('--primarycolor',"black")
    localStorage.setItem("--primarydarkpurple","#333333")
}
    else if (!darkmode.classList.contains("active")){
        document.documentElement.style.setProperty('--primarycolor',"#6915C3" );
        document.documentElement.style.setProperty('--primarydarkpurple', "#550EA0");
        localStorage.setItem('--primarycolor',"#6915C3")
        localStorage.setItem("--primarydarkpurple","#550EA0")
    }
    
})

}
let os = document.querySelector(".os");
let ts = document.querySelector(".ts");
let ch = document.querySelector(".ch"); 

const checkSwitch=(elementHidden,sw)=>{
    if(elementHidden.value==='true'){
sw.classList.add("active")
sw.firstElementChild.classList.add("activeknob")
console.log(true)
}
else{
        sw.classList.remove("active")
        sw.firstElementChild.classList.remove("activeknob")

    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
        if (savedPrimaryColor === "black") {
            darkmode.classList.add("active");
           darkmode.firstElementChild.classList.toggle("activeknob")
        }
    }
    checkDarkMode()
    checkSwitch(os,onlineStatusSwitch)
checkSwitch(ts,typingStatusSwitch)
checkSwitch(ch,clearHistorySwitch)
})



let onlineStatusSwitch=switchElement.item(1)
let typingStatusSwitch=switchElement.item(2)
let clearHistorySwitch=switchElement.item(3)

const switchHandler=(element,key)=>{
    element.addEventListener("click",()=>{
    let active=element.classList.contains("active")
    if(active){
        
        

    document.cookie = `${key}=true; path=/;max-age=${86400}`
    
    }
    else if(!active){
       document.cookie = `${key}=false; path=/;max-age=${86400}`
    }
    })
}

switchHandler(onlineStatusSwitch,"onlineStatus")
switchHandler(typingStatusSwitch,"typingStatus")
switchHandler(clearHistorySwitch,"clearHistory")









// // Online Status Switch
// os ? (
//   onlineStatusSwitch.classList.add("active"),
//   onlineStatusSwitch.firstElementChild.classList.add("activeknob")
// ) : (
//   onlineStatusSwitch.classList.remove("active"), 
//   onlineStatusSwitch.firstElementChild.classList.remove("activeknob")
// );

// // Typing Status Switch 
// ts ? (
//   typingStatusSwitch.classList.add("active"),
//   typingStatusSwitch.firstElementChild.classList.add("activeknob")
// ) : (
//   typingStatusSwitch.classList.remove("active"),
//   typingStatusSwitch.firstElementChild.classList.remove("activeknob")
// );


// ch ? (
//   clearHistorySwitch.classList.add("active"),
//   clearHistorySwitch.firstElementChild.classList.add("activeknob")
// ) : (
//   clearHistorySwitch.classList.remove("active"),
//   clearHistorySwitch.firstElementChild.classList.remove("activeknob")
// );
// }