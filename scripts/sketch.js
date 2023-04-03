var wall = [];       /* Store static streak objects */
var rayCount = 500;  /* Define the number of rays to be cast */
var streakCount = 5; /* Define the number of static wall */

function setup() {
  createCanvas(windowWidth, windowHeight);

  /* Create static streak objects */
  for (var i = 0; i < streakCount; i++) {
    let streak = ({
      p1: { x: random(windowWidth), y: random(windowHeight) },
      p2: { x: random(windowWidth), y: random(windowHeight) }
    });
    wall.push(streak);
  }
}

function draw() {
  background(27, 27, 27);

  /* Draw static wall. */
  for (var w of wall) { drawLine(w.p1, w.p2); }

  for (var a = 0; a < TWO_PI; a += TWO_PI / rayCount) {
    stroke(255);
    let p1 = {x: mouseX, y: mouseY};
    let p2 = {x: p1.x + 5000 * Math.cos(a), y: p1.y + 5000 * Math.sin(a)};

    var cpt = null;
    var cdt = Infinity;
    for (var w of wall) {
      var pt = intersection(p1, p2, w.p1, w.p2)
      if (pt) {
        var dt = distance(p1, pt);
        if (dt < cdt) {
          cpt = pt;
          cdt = dt; 
        }
      }
    }

    if (cpt) { 
      drawLine(p1, cpt); 
    }
    else {
      drawLine(p1, p2);
    }

  }
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function distance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function intersection(p1, p2, p3, p4) {
  let x1 = p1.x; let x2 = p2.x; let y1 = p1.y; let y2 = p2.y;
  let x3 = p3.x; let x4 = p4.x; let y3 = p3.y; let y4 = p4.y;

  let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (d == 0) { return null; }

  let tn = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
  let un = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
  let t = tn / d; let u = un / d;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1)}
  } 
  else { 
    return null; 
  }
}

function drawLine(p1, p2) {
  stroke(255);
  line(p1.x, p1.y, p2.x, p2.y);
}