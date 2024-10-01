let colora;
let colorb; 
let colorc; 
 let  colord; 
let  colore; 
let   colorf;
let zoff = 0;
let speedfactor = .004;
let noiseGrid;
let gridSize = 100; 
let pixelBuffer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  
  colora = random(255);
  colorb = random(255);
  colorc = random(255);
  colord = random(255);
  colore = random(255);
  colorf = random(255);
  
  noiseGrid = new Array(gridSize * gridSize);
  
  pixelBuffer = createGraphics(width, height);
  pixelBuffer.pixelDensity(1);
  console.log(noiseGrid)
}

function draw() {
  pixelBuffer.loadPixels();
  
  let xoff = 0;
  for (let x = 0; x < gridSize; x++) {
    let yoff = 0;
    for (let y = 0; y < gridSize; y++) {
      let index = x + y * gridSize;
      noiseGrid[index] = noise(xoff, yoff, zoff);
      yoff += 0.1;
    }
    xoff += 0.1;
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let gx = (x / width) * (gridSize - 1);
      let gy = (y / height) * (gridSize - 1);
      
      let gx1 = Math.floor(gx);
      let gy1 = Math.floor(gy);
      let gx2 = Math.min(gx1 + 1, gridSize - 1);
      let gy2 = Math.min(gy1 + 1, gridSize - 1);
      
      let fx = gx - gx1;
      let fy = gy - gy1;
      
      let n1 = noiseGrid[gx1 + gy1 * gridSize];
      let n2 = noiseGrid[gx2 + gy1 * gridSize];
      let n3 = noiseGrid[gx1 + gy2 * gridSize];
      let n4 = noiseGrid[gx2 + gy2 * gridSize];
      
      let n = bilinearInterpolation(n1, n2, n3, n4, fx, fy);
      
      let index = (x + y * width) * 4;
      if (n <= 0.5) {
        pixelBuffer.pixels[index] = colora;
        pixelBuffer.pixels[index + 1] = colorb;
        pixelBuffer.pixels[index + 2] = colorc;
      } else {
        pixelBuffer.pixels[index] = colord;
        pixelBuffer.pixels[index + 1] = colore;
        pixelBuffer.pixels[index + 2] = colorf;
      }
      pixelBuffer.pixels[index + 3] = 255;
    }
  }
  
  pixelBuffer.updatePixels();
  image(pixelBuffer, 0, 0);
  
  zoff += speedfactor;
}

function bilinearInterpolation(v00, v10, v01, v11, fx, fy) {
  let a = v00 * (1 - fx) + v10 * fx;
  let b = v01 * (1 - fx) + v11 * fx;
  return a * (1 - fy) + b * fy;
}