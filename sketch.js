let seed;
let t = 0;
let tpos = 0;

function setup() {
  createCanvas(900, 900)
  colorMode(HSB, 500, 100, 100)
  seed = random(1000)
}

function draw() {
  background(0);
  fill(255,255,255);
  randomSeed(seed)
  for (let i = 0; i < 500; i++) {
    let [x,y] = [];
    do {
      [x,y] = [random(900), random(900)];
    } while(dist(width/2, height/2, x, y) < 110);
    stroke(255, random(100), random(100))
    point(x, y)
  }
  
  //planet
  for (let i = 0; i < 999; i++) {
    let [a,y] = [random(TWO_PI), random(-1, 1)];
    let r = sqrt(1-y*y);
    let c = noise(y) * 500;
    a += t/8;
    let z = sin(a);
    stroke(c, 100, 100)
    if (z>0)
      point(cos(a)*100*r + width/2, y*100+z*r*5 + height/2)
  }

  // belt
  for (let i = 0; i < 500; i++) {
    let a = random(TWO_PI)
    stroke(map(noise(a), 0, 1, 300, 400), random(20, 50), random(30, 70))
    let rx = random(-20,20)
    let ry = random(-5,5)
    a += t/8;
    let xpos = cos(a) * (150 + rx) + width/2
    let ypos = sin(a) * (30 + ry)  + height/2
    if (ypos > (height/2) || dist(width/2,height/2, xpos , ypos) > 100)
      point(xpos, ypos)
  }

  // moons
  for (let j = 0; j < int(random(0, 4)); j++) {
    let startA = random(TWO_PI)
    let yoff = random(-75,75)
    let size = random(10,30)
    let color = [random(500), random(100), random(100)]
    for (let i = 0; i < 399; i++) {
      let [a,y] = [random(TWO_PI), random(-1, 1)];
      let r = sqrt(1-y*y);
      a += t/4;
      let z = sin(a);
      let zpos = sin(tpos+startA)
      stroke(...color)
      const xpos = cos(a)*size*r + cos(tpos+startA)*200 + width/2
      const ypos = y*size+z*r*5 + (height/2 +yoff) + zpos * 20
      if (z>0 && (zpos > 0 || dist(width/2,height/2, xpos , ypos) > 100))
        point(xpos, ypos)
    }
  }

  t += 0.1;
  tpos += 0.03;
}

function keyPressed(key) {
  console.log(key)
  if(key.keyCode === 80)
    save()
}
