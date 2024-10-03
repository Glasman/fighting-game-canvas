const canvas = document.querySelector("canvas");

//function that you use to get access to the canvas tags 2D drawing functions
//c just stands for context
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//canvas context is what's used to draw shapes on the screen, and once we have the canvas context we can start using the canvas api
c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor(position) {
    this.position = position;
  }
  //draw() is an arbitrary naming convention, can be named whatever we want
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  x: 0,
  y: 0,
});

player.draw();

const enemy = new Sprite({
  x: 400,
  y: 100,
});

enemy.draw();
