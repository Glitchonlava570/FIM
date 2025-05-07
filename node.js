// Smooth scrolling behavior
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const target = document.querySelector(button.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
let zoom = 1; // Zoom level
let omega = 1000; // Ω value, representing infinity as a large number
let maxZoom = 10000; // Maximum zoom factor
let minZoom = 1; // Minimum zoom factor

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);

  // Draw the grid
  drawGrid();

  // Display the Ω-plane and zoomed-in view
  drawOmegaPlane();
}

function drawGrid() {
  stroke(200, 200, 255, 100);
  strokeWeight(1);

  let step = 50 * zoom; // Grid step size based on zoom level
  for (let x = -width / 2; x < width / 2; x += step) {
    line(x + width / 2, 0, x + width / 2, height);
  }
  for (let y = -height / 2; y < height / 2; y += step) {
    line(0, y + height / 2, width, y + height / 2);
  }
}

function drawOmegaPlane() {
  fill(255, 0, 0, 100);
  noStroke();
  ellipse(width / 2, height / 2, omega * zoom, omega * zoom); // Draw Ω as a circle

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(30);
  text("Ω-plane", width / 2, height / 2);
  textSize(16);
  text(
    "Zoom: " + Math.round(zoom * 100) + "%",
    width / 2,
    height / 2 + (omega * zoom) / 2 + 20
  );
}

function mouseWheel(event) {
  // Zoom in/out based on mouse wheel
  zoom -= event.delta * 0.001; // Zoom sensitivity
  zoom = constrain(zoom, minZoom, maxZoom); // Constrain the zoom level
}
let omegaSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  omegaSlider = createSlider(100, 5000, 1000, 10); // Omega slider
  omegaSlider.position(20, height - 50);
}

function draw() {
  background(30);
  drawGrid();
  drawOmegaPlane();
}

function drawOmegaPlane() {
  omega = omegaSlider.value(); // Get Omega value from slider
  fill(255, 0, 0, 100);
  noStroke();
  ellipse(width / 2, height / 2, omega * zoom, omega * zoom); // Draw Ω circle

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(30);
  text("Ω-plane", width / 2, height / 2);
  textSize(16);
  text(
    "Zoom: " + Math.round(zoom * 100) + "%",
    width / 2,
    height / 2 + (omega * zoom) / 2 + 20
  );
  text("Ω Value: " + omega, width / 2, height / 2 + (omega * zoom) / 2 + 40);
}
let zoom = 1;
let omega = 1000;
let maxZoom = 100;
let minZoom = 0.01;
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");
}

function draw() {
  background(20);
  drawGrid();
  drawOmega();
  drawNumberLabels();
  drawInfinitesimals();
  drawFinitePoints();
}

// 1. Infinite grid (changes with zoom)
function drawGrid() {
  stroke(80);
  strokeWeight(1);

  let step = 100 * zoom;
  for (let x = 0; x < width; x += step) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += step) {
    line(0, y, width, y);
  }
}

// 2. Draw Ω as a red fixed constant
function drawOmega() {
  fill(255, 0, 0, 100);
  noStroke();
  ellipse(width / 2, height / 2, omega * zoom, omega * zoom);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Ω", width / 2, height / 2);
}

// 3. Infinitesimals (ε) appear when cursor is near Ω
function drawInfinitesimals() {
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  if (d < 100 * zoom) {
    for (let i = 0; i < 20; i++) {
      let angle = random(TWO_PI);
      let radius = random(1, 10) * zoom;
      let x = width / 2 + cos(angle) * radius;
      let y = height / 2 + sin(angle) * radius;
      fill(0, 255, 255);
      noStroke();
      ellipse(x, y, 3, 3);
    }
    fill(0, 255, 255);
    textSize(14);
    text("Infinitesimal zone (ε)", width / 2, height / 2 + 80 * zoom);
  }
}

// 4. Labeled finite values approaching Ω
function drawNumberLabels() {
  fill(255);
  textSize(12);
  textAlign(LEFT);
  for (let i = 1; i <= 5; i++) {
    let val = omega / pow(10, i);
    let x = width / 2 + val * zoom;
    text(`Ω - ${val}`, x, height / 2);
  }
}

// 5. Click to add finite points
function mousePressed() {
  points.push({ x: mouseX, y: mouseY });
}

function drawFinitePoints() {
  fill(0, 255, 0);
  stroke(255);
  strokeWeight(1);
  for (let pt of points) {
    ellipse(pt.x, pt.y, 8, 8);
  }

  fill(0, 255, 0);
  noStroke();
  textSize(14);
  for (let pt of points) {
    text("finite", pt.x + 10, pt.y);
  }
}

// 6. Mouse wheel for zoom
function mouseWheel(event) {
  zoom -= event.delta * 0.001;
  zoom = constrain(zoom, minZoom, maxZoom);
}
