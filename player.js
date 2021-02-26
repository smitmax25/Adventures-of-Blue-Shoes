class Player {
  constructor() {
    this.pos = createVector(200, 200);
    this.velocity = createVector(0, 0);
    this.jumpVelocity = -9;
    this.gravity = 0.4;
    this.size = 50;
    this.groundState;
    this.lastVelocity = createVector(200, 200);;
  }

  // Processes current inputs and updates the position of the player
  update() {
      this.processInput();
      this.updateGravity();
      //console.log(this.getBlockType(0, this.size));
  }

  // Retrieves the material identified in the grid (Air or Ground)
  // Offset is a value subtracted from the current position
  // Ex: an offY of 50 would look for the block just below the player
  getBlockType(offX = 0, offY = 0) {
    var z = this.getLoc(this.pos.x + offX, this.pos.y + offY);
    if (map1.blocks[z[1]] != null &&  map1.blocks[z[1]][z[0]] != null){
      return map1.blocks[z[1]][z[0]].constructor.name;
    }
    else {
      return "Ground";
    }
  }

  // Gets the location of the character in terms of a grid position, [x, y] on the map
  // floor rounds down to the nearest integer
  getLoc(x = this.pos.x, y = this.pos.y) {
    var location = [floor((x + map1.offset) / 50), floor(y / 50)];
    return location;
  }

  // Checks if sprite is on the ground by getting the BlockType 
  // bottom means there's ground below, top means there's ground above
  onGround() {
    // checking bottom left
    if (this.getBlockType(0, this.size) == "Ground") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking bottom right
    if (this.getBlockType(this.size - 1, this.size) == "Ground") {
      this.pos.y = this.getLoc()[1] * 50
      return "bottom";
    }
    // checking top left
    if (this.getBlockType() == "Ground") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    // checking top right
    if (this.getBlockType(this.size - 1, 0) == "Ground") {
      this.pos.y = this.getLoc()[1] * 50 + 50
      return "top";
    }
    //console.log(this.getBlockType(0, -3));
    return false;
  }

  isFalling() {
    if (this.onGround() != "bottom")
      return true;
    return false;
  }

  updateGravity() {
  
    // Update velocity
    this.velocity.add(0, this.gravity);
    // Update position
    this.pos.add(this.velocity);
    // Prevent clipping and check position
    this.groundState = this.onGround();

    if (this.groundState == "top") {
        this.velocity.y = this.gravity;
        this.pos.add(this.velocity);
    }

    if (this.groundState == "bottom") {
      this.velocity.y = 0;
    }
  }

  jump() {
    if (!this.isFalling()) {
      this.velocity.y = this.jumpVelocity;
    }
  }

  processInput() {
    if (keyIsDown(87)) {
      console.log(this.groundState);
    }
    if(keyIsDown(65)) {
      console.log(this.velocity.toString());
    }
    if(keyIsDown(68)) {
      console.log(this.pos.toString());
    }
    if (keyIsDown(LEFT_ARROW)) {
      if (this.getBlockType(-1, 25) != "Ground") {
        if (this.pos.x < width / 4) {
          this.pos.x -= 5;
        } else {
          map1.offset -= 5
        }
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.getBlockType(this.size, 25) != "Ground") {
        if (this.pos.x < width / 2) {
          this.pos.x += 5;
        } else {
          map1.offset += 5
        }
      }
    }
    if (keyIsDown(UP_ARROW)) {
      this.jump();
    }
  }
  
  draw() {
    image(player_image, this.pos.x, this.pos.y, this.size, this.size);
  }
}