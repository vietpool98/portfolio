

function bubbles(){
    var count = 300;
    var header = document.querySelector('.header');
    var i= 0;
    while (i<count){
        var bubble = document.createElement('i');
        bubble.className = "element";
        
        var x = Math.floor(Math.random() * header.offsetWidth );
        var y = Math.floor(Math.random() * header.offsetHeight + 70);

        var size = Math.random() * 10;
        bubble.style.left = x+ "px";
        bubble.style.top = y+"px";
        bubble.style.width = 1+size+"px";
        bubble.style.height = 1+size+"px";
         bubble.style.animationDuration = 5+size+ 's';
         bubble.style.animationDelay = -size+'s';
        header.appendChild(bubble);
        i++;
    }
}

bubbles()