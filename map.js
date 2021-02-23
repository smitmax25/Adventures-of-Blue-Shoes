class Map {
  constructor(b) {

    this.blocks = b;
    this.offset = 0
    this.enemyList = [];
    this.itemList = [];

    // Based on the level and its values (0 or 1), identify it as an Air piece or a Ground piece
    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        if (this.blocks[row][col] == 0) {
          this.blocks[row][col] = new Air(col * 50, row * 50);
        }
        if (this.blocks[row][col] == 1) {
          this.blocks[row][col] = new Ground(col * 50, row * 50);
        }
      }
    }
  }

  // Draws each picture for each grid block on the screen
  draw() {
    for (var row = 0; row < this.blocks.length; row++) {
      for (var col = 0; col < this.blocks[row].length; col++) {
        if (typeof this.blocks[row][col] == 'object' && 
            this.blocks[row][col] !== null && 
            this.blocks[row][col] != 0) {
          this.blocks[row][col].draw(this.offset, 0);
        }
      }
    }
  }
}