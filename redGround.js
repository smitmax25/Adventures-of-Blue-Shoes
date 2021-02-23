class Ground {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 50;
  }

 draw(xOffset, yOffset) {
    image(redGround_image, this.pos.x - xOffset, this.pos.y - yOffset, this.size, this.size);
  }
}