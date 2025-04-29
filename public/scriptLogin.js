const canvas = document.querySelector(".stylelog");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";

// Move origin to center and rotate the canvas
ctx.translate(150, 150);  // Move origin to the center of the canvas
ctx.rotate(-0.2 * Math.PI); // Rotate counterclockwise (adjust the angle as needed)

// Draw the pie chart (face with open mouth)
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.arc(0, 0, 100, 0.2 * Math.PI, 1.8 * Math.PI, false);
ctx.lineTo(0, 0);
ctx.fill();
ctx.closePath()

window.addEventListener("load", () => {
  
    const savedPrimaryColor = localStorage.getItem("--primarycolor");
    const savedPrimaryDarkPurple = localStorage.getItem("--primarydarkpurple");

    if (savedPrimaryColor && savedPrimaryDarkPurple) {
        document.documentElement.style.setProperty('--primarycolor', savedPrimaryColor);
        document.documentElement.style.setProperty('--primarydarkpurple', savedPrimaryDarkPurple);
    }
});