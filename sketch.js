let seed;
let t = 0;
let tpos = 0;
let numberBelts = 1
let dotsBelts = 500

function setup() {
  createCanvas(900, 900)
  colorMode(HSB)
  seed = random(1000)
  numberBelts = int(random(1, 6))
  dotsBelts /= numberBelts
}

function draw() {
  background(0);
  fill(255,255,255);
  randomSeed(seed)
  strokeWeight(1)
  for (let i = 0; i < 500; i++) {
    let [x,y] = [];
    do {
      [x,y] = [random(900), random(900)];
    } while(dist(width/2, height/2, x, y) < 110);
    stroke(random(360), random(0, 20), random(60, 100))
    point(x, y)
  }
  
  strokeWeight(2)
  
  //planet
  for (let i = 0; i < 999; i++) {
    let a = random(TWO_PI)
    let y = random(-1, 1)
    let r = sqrt(1-y*y)
    let c = noise(y) * 360
    a += t/8
    let z = sin(a)
    stroke(c, 100, 100)
    if (z>0)
      point(cos(a)*100*r + width/2, y*100+z*r*5 + height/2)
  }

  // belt
  if(random() < .5) {
    for (let j = 0; j < numberBelts; j++) {
      const beltColor = color(random(360), random(20, 50), random(30, 70))
      stroke(beltColor)

      const stepX = 60/numberBelts;
      const stepY = 10/numberBelts;

      for (let i = 0; i < dotsBelts; i++) {
        let rx = random(-30 + stepX * j,-30 + stepX * j + stepX)
        let ry = random(-5 + stepY * j,-5 + stepY * j + stepY)
        let a = random(TWO_PI)
        a += t/8;
        let xpos = cos(a) * (150 + rx) + width/2
        let ypos = sin(a) * (30 + ry)  + height/2
        if (ypos > (height/2) || dist(width/2,height/2, xpos , ypos) > 100)
          point(xpos, ypos)
      }
    }
  }

  // moons
  for (let j = 0; j < int(random(0, 4)); j++) {
    let startA = random(TWO_PI)
    let yoff = random(-75,75)
    let size = random(10,30)
    stroke(color(random(500), random(70, 100), random(40,70)))
    for (let i = 0; i < 399; i++) {
      let [a,y] = [random(TWO_PI), random(-1, 1)];
      let r = sqrt(1-y*y);
      a += t/4;
      let z = sin(a);
      let zpos = sin(tpos+startA)
      const xpos = cos(a)*size*r + cos(tpos+startA)*250 + width/2
      const ypos = y*size+z*r*5 + (height/2 +yoff) + zpos * 25
      if (z>0 && (zpos > 0 || dist(width/2,height/2, xpos , ypos) > 100))
        point(xpos, ypos)
    }
  }

  t += 0.1;
  tpos += 0.03;
}

function keyPressed(key) {
  if(key.keyCode === 80)
    save()
}
