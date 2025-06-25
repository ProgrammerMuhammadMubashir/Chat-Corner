

let rceDiv=document.querySelector(".rceDiv")
let NameOfOther=document.getElementById("NameOfOther")
console.log(NameOfOther)
if(NameOfOther.innerText===""){
    rceDiv.style.display="none"
}

    rceDiv.addEventListener("click",()=>{
window.open("/Chat","_self")

    })



window.addEventListener("load", () => {
  
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});