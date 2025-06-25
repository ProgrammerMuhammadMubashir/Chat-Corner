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
   
})












