class Powerup {
  constructor(x, y)
  this.pos = createVector(x, y);
  this.size = 16;
}

  draw(xOffset, yOffset) {
    image(ground_image, this.pos.x - xOffset, this.pos.y - yOffset, this.size, this.size);
  }
}