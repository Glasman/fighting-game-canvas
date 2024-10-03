const canvas = document.querySelector('canvas')

//function that you use to get access to the canvas tags 2D drawing functions
//c just stands for context
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

//canvas context is what's used to draw shapes on the screen, and once we have the canvas context we can start using the canvas api
c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor(position) {
        this.position = position
    }
}

const player = new Sprite({
    x:0,
    y:0
})

console.log(player)