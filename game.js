console.log('Breno Flappy Bird')

// read image
const sprites = new Image()
sprites.src = 'img/sprites.png'

// define canvas
const canvas = document.querySelector('canvas')
context = canvas.getContext('2d')

// read Audio
const HIT = new Audio()
HIT.src = './efects/hit.wav'

// global element
const globals = {}

let frames = 0

function createFlappyBird() {
    const flappyBird = {
        spriteX: 0, spriteY: 0,
        weigth: 33, height: 24,
        x: 10, y: 50,

        // moves
        speed: 0, gravity: 0.25,
        jump_lenght: 4.6,

        // aspect
        currentFrame: 0,
        moves: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 56 },
            { spriteX: 0, spriteY: 26 }
        ],

        // 
        draw() {
            // select current frame
            this.updateFrame()
            // console.log(this.currentFrame)
            const { spriteX, spriteY } = this.moves[this.currentFrame]

            context.drawImage(
                sprites,
                spriteX, spriteY, // local where base image init
                this.weigth, this.height, // Image lenght
                this.x, this.y,
                this.weigth, this.height
            )
        },

        jump() {
            console.log('I need to jump')
            flappyBird.speed = -flappyBird.jump_lenght
        },

        update() {

            // add list
            // take care with this
            if (collide(this, globals.floor)) {
                console.log('Crashed')
                HIT.play()
                changeScreen(Screen.INIT)
                return
            }
            this.speed += this.gravity
            this.y += this.speed
        },

        updateFrame() {

            const frameInterval = 10

            // frame is implicit variable
            const isTimeToChange = frames % frameInterval === 0


            if (isTimeToChange) {
                // circle rotate logic
                const IncrementBase = 1
                const Increment = IncrementBase + this.currentFrame
                const RepeatBase = this.moves.length
                this.currentFrame = Increment % RepeatBase
            }
        }
    }

    return flappyBird
}

function createFloor() {

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
        },

        update() {
            const moveFloor = 1
            repeatWhen = this.height / 2
            movimentation = this.x - moveFloor

            this.x = movimentation % repeatWhen
        }
    }

    return floor
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
        init() {
            globals.flappyBird = createFlappyBird()
            globals.floor = createFloor()
        },
        draw() {
            background.draw()
            globals.floor.draw()
            globals.flappyBird.draw()
            getReady.draw()
        },
        update() {
            globals.floor.update()
        },
        click() {
            changeScreen(Screen.GAME)
        }
    },

    GAME: {
        draw() {
            background.draw()
            globals.floor.draw()
            globals.flappyBird.draw()
        },
        update() {
            globals.flappyBird.update()
            globals.floor.update()
        },
        click() {
            globals.flappyBird.jump()
        }
    }
}

let activateScreen = {}

function changeScreen(newScreen) {
    activateScreen = newScreen

    if (activateScreen.init) {
        activateScreen.init()
    }
}

function collide(flappyBird, floor) {
    const flappyBirdY = flappyBird.y + flappyBird.height
    const floorY = floor.y

    if (flappyBirdY >= floorY) {
        return true
    }

    return false
}

function loop() {

    activateScreen.draw()
    activateScreen.update()
    frames += 1
    requestAnimationFrame(loop)
}


window.addEventListener('click', function () {
    if (activateScreen.click) {
        activateScreen.click()
    }

})

document.addEventListener( 'keypress', (evt) =>{
    const KeyName = evt.key
    // alert(KeyName == ' ') space key

    if (KeyName === ' '){
        if (activateScreen.click) {
            activateScreen.click()
        }
    }
})

changeScreen(Screen.INIT)

loop()