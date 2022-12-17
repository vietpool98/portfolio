 
 scl = 8;
 var terrain = [];
 var fly = 0
function setup() {
  w = 1900;
  h = 950;
  createCanvas(windowWidth,windowHeight+200,WEBGL);
 
 cols = w/scl;
 rows = h/scl;

}


function draw() {
  background(175);
  noStroke();
  pointLight(0,0,255,100,-800,0);
  ambientMaterial(0,0,255);
  
  translate(-windowWidth/2, -windowHeight/5);
  rotateX(PI/3);
  
  fly -= 0.008;
  var xOff = 0;
 for( x = 0 ; x < cols ; x++){
  var yOff = fly;
  terrain[x] = [];
    for( y = 0 ; y < rows ; y++){
      terrain[x][y] = map(noise(xOff,yOff), 0,1,-100,100);
      yOff+=0.01;
    }

    xOff+=0.01;
  }

  for( x = 0 ; x < cols-1 ; x++){
    beginShape(TRIANGLE_STRIP);
    
    for( y = 0 ; y < rows ; y++){
      
      
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex((x+1)*scl, y*scl, terrain[x+1][y]);
      
    }
    endShape();
  }
  
}
