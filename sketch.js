// let colora = Math.random() * 255;
// let colorb = Math.random() * 255;
// let colorc = Math.random() * 255;
// let colord = Math.random() * 255;
// let colore = Math.random() * 255;
// let colorf = Math.random() * 255;
// let zoff = 0;
// let speedfactor = 1

// function setup() {
//   createCanvas(displayWidth,displayHeight);
// }

// function draw() {
//   scalef = 90;

//   for (y = 0; y < height; y++) {
//     for (x = 0; x < width; x++) {
//       n = noise(x / scalef, y / scalef, zoff / scalef);
//       if (n <= 0.5) {
//         set(x, y, color(colora, colorb, colorc));
//       } else {
//         set(x, y, color(colord, colore, colorf));
//       }
//       zoff = zoff + 1;
//     }
//     zoff = zoff + 1;
//   }
//   updatePixels();
//   zoff = zoff + speedfactor;
// }

let colora = Math.random() * 255;
let colorb = Math.random() * 255;
let colorc = Math.random() * 255;
let colord = Math.random() * 255;
let colore = Math.random() * 255;
let colorf = Math.random() * 255;
let zoff = 0;
let speedfactor = 0.05;  // Smaller increment for smoother animation

function setup() {
  createCanvas(displayWidth, displayHeight);
  pixelDensity(1);  // Ensures a consistent pixel density
}

function draw() {
  let scalef = 90;

  loadPixels();  // Load the pixel data into the pixels[] array

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let n = noise(x / scalef, y / scalef, zoff);
      let index = (x + y * width) * 4;  // Calculate the pixel array index
      if (n <= 0.5) {
        pixels[index] = colora;
        pixels[index + 1] = colorb;
        pixels[index + 2] = colorc;
      } else {
        pixels[index] = colord;
        pixels[index + 1] = colore;
        pixels[index + 2] = colorf;
      }
      pixels[index + 3] = 255;  // Set alpha to fully opaque
    }
  }

  updatePixels();  // Apply the changes made to the pixels[] array
  zoff += speedfactor;  // Increment zoff to change the noise over time
}