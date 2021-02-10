console.log('Breno Flappy Bird')

const sprites = new Image()

sprites.src = 'img/sprites.png'

const canvas = document.querySelector('canvas')

context = canvas.getContext('2d')

const flappyBird = {
    spriteX: 0, spriteY: 0,
    weigth: 33, height: 24,
    x: 10, y: 50,
    speed:0, gravity: 0.25,


    draw() {
        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            this.x, this.y,
            this.weigth, this.height
        )
    },

    update(){
        this.speed += this.gravity
        this.y += this.speed
    }
}

const floor = {
    spriteX: 0, spriteY: 610,
    weigth: 224, height: 112,
    x: 0, y: canvas.height - 112,

    draw() {
        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            this.x, this.y,
            this.weigth, this.height
        )

        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            (this.x + this.weigth), this.y,
            this.weigth, this.height
        )

    }
}

const background = {

    // props
    spriteX: 390, spriteY: 0,
    weigth: 275, height: 204,
    x: 0, y: canvas.height - 204,

    draw() {

        // background color
        context.fillStyle='#a7c5ce'
        context.fillRect(0,0, canvas.width, canvas.height)


        // background image
        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            this.x, this.y,
            this.weigth, this.height
        )

        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            (this.x + this.weigth), this.y,
            this.weigth, this.height
        )

    }
}

function loop() {
    flappyBird.update()
    
    background.draw()
    floor.draw()
    flappyBird.draw()


    requestAnimationFrame(loop)
}

loop()