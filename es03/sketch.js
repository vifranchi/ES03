let orbitAngle = 0; //rotazione lungo l'orbita
let rotationAngle = 0; // variabile per la rotazione
let orbitDirection = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS); // assicura l'uso dei radianti
}

function draw() {
  background("#1b3144ff"); //back

  fill ("50"); //bianco
  strokeWeight(1);
  
  //stelle NO RANDOM
  noStroke ();
  for(let i=0; i < 150;i++){
    let starX = (i*37) % width + (i%3)*5;
    let starY = ((i*73)% height) + (i%7)
    let alpha = map(sin(frameCount * 0.2 + i), -1, 1, 100, 255);

    fill(255, 255, 180, alpha);

    //stellla a quando i è pari
    if (i % 2 == 0) {
    ellipse(starX, starY, 3);
  } else if (i % 3 == 0) {
    ellipse(starX, starY, 4);
  } else if (i % 3 == 1) {
    ellipse(starX, starY, 2);
  }

  }


  //STELLA
  let orbitRadius = 900; // raggio dell'orbita

  let centerX = width + 10;// centro orbita esterno a destra del canvas
  let centerY = height + 30; // centro orbita esterno a destra del canvas

  // Calcolo posizione della stella lungo l’orbita inclinata
  let xOrbit = cos(orbitAngle) * orbitRadius;
  let yOrbit = sin(orbitAngle) * orbitRadius;

  let orbitRotation = PI * 3 / 4; // inclinazione dell'orbita

  fill(255, 252, 96); 
  push();
  translate(centerX, centerY);
  rotate(orbitRotation);            
  translate(xOrbit, yOrbit);  

  let scaleFactor = map(sin(frameCount * 0.1), -1, 1, 0.9, 1.1);
  scale(scaleFactor);
  rotate(rotationAngle);

  star(0, 0, 50, 120, 5);
  pop();
  
  let orbitSpeed = 0.01;
orbitAngle += orbitSpeed * orbitDirection;
rotationAngle += 0.03;

// Limita l'angolo dell'orbita tra 0 e PI
if (orbitAngle >= PI || orbitAngle <= 0) {
  orbitDirection *= -1; // rimbalza avanti e indietro
}
}
 
function star(x, y, radius1, radius2, npoints) {

  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();

//algoritmo per stella
  for (let a = 0; a < TWO_PI; a += angle) { //cerchio
    let sx = x + cos(a) * radius2; //punta lunga
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1; //punta interna = 
    sy = y + sin(a + halfAngle) * radius1; //rientro tra le punte
    vertex(sx, sy);
  }

  endShape(CLOSE);

  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

}
