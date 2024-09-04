let colora = Math.random() * 255;
let colorb = Math.random() * 255;
let colorc = Math.random() * 255;
let colord = Math.random() * 255;
let colore = Math.random() * 255;
let colorf = Math.random() * 255;
let zoff = 0;
let speedfactor = 0.05;  

function setup() {
  createCanvas(displayWidth, displayHeight);
  pixelDensity(1);  
}

function draw() {
  let scalef = 90;

  loadPixels();  

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let n = noise(x / scalef, y / scalef, zoff);
      let index = (x + y * width) * 4; 
      if (n <= 0.5) {
        pixels[index] = colora;
        pixels[index + 1] = colorb;
        pixels[index + 2] = colorc;
      } else {
        pixels[index] = colord;
        pixels[index + 1] = colore;
        pixels[index + 2] = colorf;
      }
      pixels[index + 3] = 255;  
    }
  }

  updatePixels();  
  zoff += speedfactor;  
}