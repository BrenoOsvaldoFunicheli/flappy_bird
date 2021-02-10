console.log('Breno Flappy Bird')

const sprites = new Image()

sprites.src = 'img/sprites.png'

const canvas = document.querySelector('canvas')

context = canvas.getContext('2d')

const flappyBird = {
    spriteX: 0, spriteY: 0,
    weigth: 33, height: 24,
    x: 10, y: 50,
    speed: 0, gravity: 0.25,


    draw() {
        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            this.x, this.y,
            this.weigth, this.height
        )
    },

    update() {
        this.speed += this.gravity
        this.y += this.speed
    }
}

// floor object
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

// background object
const background = {

    // props
    spriteX: 390, spriteY: 0,
    weigth: 275, height: 204,
    x: 0, y: canvas.height - 204,

    draw() {

        // background color
        context.fillStyle = '#a7c5ce'
        context.fillRect(0, 0, canvas.width, canvas.height)


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

const getReady = {
    spriteX: 134, spriteY: 0,
    weigth: 174, height: 152,
    x: (canvas.width / 2) - (174 / 2), y: 50,
    speed: 0, gravity: 0.25,


    draw() {
        context.drawImage(
            sprites,
            this.spriteX, this.spriteY, // local where base image init
            this.weigth, this.height, // Image lenght
            this.x, this.y,
            this.weigth, this.height
        )
    },
}

const Screen = {
    INIT: {
        draw() {
            background.draw()
            floor.draw()
            flappyBird.draw()
            getReady.draw()
        },
        update() {

        },
        click(){
            changeScreen(Screen.GAME)
        }
    },

    GAME: {
        draw() {
            background.draw()
            floor.draw()
            flappyBird.draw()
        },
        update() {
            flappyBird.update()
        },
        click(){
            changeScreen(Screen.INIT)
        }
    }
}

let activateScreen = {}

function changeScreen(newScreen) {
    activateScreen = newScreen
}

function loop() {

    activateScreen.draw()
    activateScreen.update()

    requestAnimationFrame(loop)
}


window.addEventListener('click', function(){
    if(activateScreen.click){
        activateScreen.click()
    }

})

changeScreen(Screen.INIT)

loop()