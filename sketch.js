let car;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  car = new Car();
}

function draw() {
  background(220);

  if (!gameOver) {
    car.display();
    car.move();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].display();
      obstacles[i].fall();

      if (obstacles[i].hits(car)) {
        gameOver = true;
      }

      if (obstacles[i].offScreen()) {
        obstacles.splice(i, 1);
        score++;
      }
    }
  } else {
    textAlign(CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("Game Over!", width / 2, height / 2);
    textSize(20);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
  }
}

class Car {
  constructor() {
    this.width = 50;
    this.height = 20;
    this.position = createVector(width / 2, height - 40);
  }

  display() {
    fill(0);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  move() {
    this.position.x = mouseX;
    this.position.x = constrain(this.position.x, this.width / 2, width - this.width / 2);
  }
}

class Obstacle {
  constructor() {
    this.width = random(20, 60);
    this.height = 20;
    this.position = createVector(random(width), 0 - this.height);
    this.speed = random(1, 3);
  }

  display() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.width, this.height);
  }

  fall() {
    this.position.y += this.speed;
  }

  offScreen() {
    return this.position.y > height;
  }

  hits(car) {
    if (
      this.position.y + this.height >= car.position.y - car.height / 2 &&
      this.position.y <= car.position.y + car.height / 2 &&
      this.position.x + this.width >= car.position.x - car.width / 2 &&
      this.position.x <= car.position.x + car.width / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
