let dp=document.querySelector(".dp")
let fileInput=document.querySelector(".fileInput")
fileInput.addEventListener('change',(event)=>{
       const file = event.target.files[0];
       
       if(file){
       dp.src=URL.createObjectURL(file)
       }
})






document.addEventListener("DOMContentLoaded", () => {
    const darkmode = document.getElementById("darkmode");
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});