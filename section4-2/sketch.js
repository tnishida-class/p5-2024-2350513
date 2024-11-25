let balls;

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls = [];
}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    fill(b.color);
    noStroke();
    if (b.shape === "circle") {
      ellipse(b.x, b.y, b.size);
    } else if (b.shape === "polygon") {
      regularPolygon(b.n, b.x, b.y, b.size);
    } else if (b.shape === "star") {
      star(b.x, b.y, b.size);
    }
    b.x += b.vx;
    b.y += b.vy;
  }
}

function mouseDragged() {
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if (mag(dx, dy) > 5) {
    const shapes = ["circle", "polygon", "star"];
    const randomShape = random(shapes);
    const randomColor = color(random(255), random(255), random(255));
    const b = {
      x: mouseX,
      y: mouseY,
      size: random(10, 80),
      vx: dx,
      vy: dy,
      shape: randomShape,
      color: randomColor,
      n: random(3, 10)
    };
    balls.push(b);
  }
}

function star(cx, cy, r) {
  beginShape();
  for (var i = 0; i < 5; i++) {
    let theta = TWO_PI * i * 2 / 5 - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function regularPolygon(n, cx, cy, r) {
  beginShape();
  for (var i = 0; i < n; i++) {
    let theta = TWO_PI * i / n - HALF_PI;
    let x = cx + cos(theta) * r;
    let y = cy + sin(theta) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
