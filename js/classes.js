class Sprite {
  //constructor arguments wrapped in one object to minimize confusion when putting in many arguments
  //this way the order of the arguments does not matter and they are not required as they are all just properties of the object being passed in
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.offset = offset;
  }
  //draw() is an arbitrary naming convention, can be named whatever we want
  draw() {
    c.drawImage(
      this.image,
      //next 4 lines are where cropping starts
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      //below are the actual stats of the image; x position, y position, image width, image height
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames()
  }
}

class Fighter extends Sprite {
  //constructor arguments wrapped in one object to minimize confusion when putting in many arguments
  //this way the order of the arguments does not matter and they are not required as they are all just properties of the object being passed in
  constructor({
    position,
    velocity,
    color = "red",

    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    //super() calls constructor of the parent
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
      //   framesCurrent,
      //   framesElapsed,
      //   framesHold
    });

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
    //if animation keeps bugging get rid of below and go back to 2:28 in vid
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
  }
  //draw() is an arbitrary naming convention, can be named whatever we want

  update() {
    this.draw();
    this.animateFrames()


    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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
