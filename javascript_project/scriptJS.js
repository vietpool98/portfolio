const canvas = document.getElementById('myCanvas');
const buttonIncrease = document.getElementById('increase');
const buttonDecrease = document.getElementById('decrease');
const Size = document.getElementById('size');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const clear = document.getElementById('clear');

let isPressed = false;
let size = 10;
let x = undefined;
let y = undefined;

Size.innerHTML=size;
canvas.addEventListener("mouseup" , function(event){
    isPressed = false;
});

canvas.addEventListener("mousedown" , function(event){

    isPressed = true;
     x = event.offsetX; // Coordonnée X de la souris dans l'élément
     y = event.offsetY;
    drawCircle(x,y);
   
});

canvas.addEventListener("mousemove" , function(event){
    const x2 = event.offsetX; // Coordonnée X de la souris dans l'élément
    const y2 = event.offsetY; // Coordonnée Y de la souris dans l'élément
    if(isPressed == true){
        drawCircle(x2,y2);
        line(x,y,x2,y2);
        x=x2;
        y=y2;
    }
});

 buttonDecrease.addEventListener("click", function(event){
    size -= 1;
     if(size <=2){
         size = 2;
     }

     console.log(color.value);
     updateSize();
 });

 buttonIncrease.addEventListener("click", function(event){
     size += 1;

     if(size >=50){
         size = 50;
     }
     updateSize();
     console.log(size);
 });

 clear.addEventListener("click", function(event){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 });

 function line(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = size*2;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle= color.value;
    ctx.stroke();
 }

 function updateSize(){
    Size.innerHTML=size;
 }

function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle= color.value;
    
    ctx.fill();
    
}

function redimensionnement() {
    
    if("matchMedia" in window) { // Détection
      if(window.matchMedia("(max-width:440px)").matches) {
        // Il y a de la place
        canvas.width = 300;
        canvas.height = 400;
        console.log(canvas.width);
      } else {
        // Il y en a moins...
      }
    }
  }

// On lie l'événement resize à la fonction
window.addEventListener('resize', redimensionnement, false);

