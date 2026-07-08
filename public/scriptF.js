


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
