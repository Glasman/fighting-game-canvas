const canvas = document.querySelector("canvas");

//function that you use to get access to the canvas tags 2D drawing functions
//c just stands for context
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//canvas context is what's used to draw shapes on the screen, and once we have the canvas context we can start using the canvas api
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  //constructor arguments wrapped in one object to minimize confusion when putting in many arguments
  //this way the order of the arguments does not matter and they are not required as they are all just properties of the object being passed in
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }
  //draw() is an arbitrary naming convention, can be named whatever we want
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    //   line below from chatGPT to smooth sprites hitting bottom
    //    this.position.y = canvas.height - this.height; 
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

//arbitrary naming convention, can be named whatever we want
function animate() {
  //The window.requestAnimationFrame() method tells the browser you wish to perform an animation.
  //It requests the browser to call a user-supplied callback function before the next repaint.
  //in this instance animate() calls requestAnimationFrame which calls animate(), looping it as long as we need
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();
