class Sprite {
  //constructor arguments wrapped in one object to minimize confusion when putting in many arguments
  //this way the order of the arguments does not matter and they are not required as they are all just properties of the object being passed in
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image()
    this.image.src = imageSrc
  }
  //draw() is an arbitrary naming convention, can be named whatever we want
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw();
  }
}

class Fighter {
  //constructor arguments wrapped in one object to minimize confusion when putting in many arguments
  //this way the order of the arguments does not matter and they are not required as they are all just properties of the object being passed in
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }
  //draw() is an arbitrary naming convention, can be named whatever we want
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack boxes
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      //   line below from chatGPT to smooth sprites hitting bottom
      //   this.position.y = canvas.height - this.height;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
