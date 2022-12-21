const canvas = document.getElementById('myCanvas');
const buttonIncrease = document.getElementById('increase');
const buttonDecrease = document.getElementById('decrease');
const Size = document.getElementById('size');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const clear = document.getElementById('clear');
const fill = document.getElementById('fill');

let isPressed = false;
let isFilled = false;
let size = 10;
let x = undefined;
let y = undefined;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);



Size.innerHTML=size;

var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imgData.data;
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
     updateSize();
 });

 fill.addEventListener("click" , function(ev){

    if(!isFilled){
        isPressed = false;
        isFilled = true;
    }
    else{
        isFilled = false;
        isPressed = true;
    }
 });


 

  canvas.addEventListener("click", function(event){
    
     var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
     var data = imgData.data;
    console.log("hello");
     const x = event.offsetX; // Coordonnée X de la souris dans l'élément
     const y = event.offsetY; // Coordonnée Y de la souris dans l'élément
     const startPos = (y*canvas.width + x) * 4;

    

     const startR = data[startPos];
     const startB = data[startPos+1];
     const startG = data[startPos+2];

     console.log(startR );
     console.log(startG);


     var pixelStack = [[x,y]];

     while(pixelStack.length >= 0){
         newPos = pixelStack.pop();
         xPos = newPos[0];
         yPos = newPos[1];
         pixelPos = (yPos*canvas.width + xPos) * 4;

         while(yPos-- >= 0 && matchStartColor(pixelPos, data, startR, startG, startB)){
             pixelPos -= canvas.width * 4;
         }
         ++yPos;
         pixelPos += canvas.width * 4;
         reachLeft = false;
         reachRight = false;

         while(yPos++ < canvas.height-1 && matchStartColor(pixelPos, data, startR, startG, startB)){
             colorPixel[pixelPos,data];

             if(xPos>0){
                 if(matchStartColor(pixelPos-4, data, startR, startG, startB)){
                     if(!reachLeft){
                         pixelStack.push([xPos-1,yPos]);
                         reachLeft = true;
                     }
                 }
                 else if(reachLeft){
                     reachLeft = false;
                 }
             }
             if(xPos> canvas.width){
                 if(matchStartColor(pixelPos+4, data, startR, startG, startB)){
                     if(!reachRight){
                         pixelStack.push([xPos+1,yPos]);
                         reachRight                    }
                 }
                 else if(reachRight){
                     reachRight = false;
                 }
             }

             pixelPos += canvas.width * 4;
         }
     }

        ctx.putImageData(imgData,0,0);
    });

 

 buttonIncrease.addEventListener("click", function(event){
     size += 1;

     if(size >=50){
         size = 50;
     }
     updateSize();
     //console.log(size);
 });

 clear.addEventListener("click", function(event){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

function getColorR(ev){
    const color = ev.value
    const r = parseInt(color.substr(1,2), 16)
    return r;
}

function getColorG(ev){
    const color = ev.value
    const g = parseInt(color.substr(3,2), 16)
    return g;
}

function getColorB(ev){
    const color = ev.value
    const b = parseInt(color.substr(5,2), 16)
    return b;
}

function matchStartColor(pixelPos , data , startR, startG, startB){
    var r = data[pixelPos];
    var g = data[pixelPos+1];
    var b = data[pixelPos+2];

    return(r == startR && g ==startG && b == startB);
}

function colorPixel(pixelPos ,data){
    data[pixelPos] = getColorR(color);
    data[pixelPos+1]= getColorG(color);
    data[pixelPos+2]= getColorB(color);
    data[pixelPos+3] = 255;
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

