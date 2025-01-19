const HALF_SCREEN_WIDTH = 320
const HALF_SCREEN_HEIGHT = 224

const WEAPON_SHOOT_FRAMES_PATH = "host:/src/Player/Weapon Shoot"

let shootAnimation = {
    [-45]: [], [0]: [], [45]: [], [90]: []
}

function degreesToRadians(angle) {

    return angle * (Math.PI / 180)
}

System.listDir(WEAPON_SHOOT_FRAMES_PATH).forEach(file => {

    shootAnimation[0].push(new Image(WEAPON_SHOOT_FRAMES_PATH + "/" + file.name, RAM))
    shootAnimation[45].push(new Image(WEAPON_SHOOT_FRAMES_PATH + "/" + file.name, RAM))
    shootAnimation[90].push(new Image(WEAPON_SHOOT_FRAMES_PATH + "/" + file.name, RAM))
    shootAnimation[-45].push(new Image(WEAPON_SHOOT_FRAMES_PATH + "/" + file.name, RAM))

    shootAnimation[45][shootAnimation[45].length - 1].angle = degreesToRadians(-45)
    shootAnimation[90][shootAnimation[90].length - 1].angle = degreesToRadians(-90)
    shootAnimation[-45][shootAnimation[-45].length - 1].angle = degreesToRadians(45)

})

export class Bullet {

    frame = 0

    active = true
    delay = Timer.new()

    constructor(x, y, sx, sy, w, h, angle, damage) {

        this.x = x
        this.y = y

        this.w = w
        this.h = h

        this.sx = sx
        this.sy = sy

        this.angle = angle

        this.damage = damage
    }

    checkCollision(object) {

        if (this.active == true) {

            if (this.x + this.y >= object.x && this.x <= object.x + object.w && this.y + this.h >= object.y && this.y <= object.y + object.h) {

                object.lastHealth = object.health
                object.health -= this.damage
                this.active = false
            }
        }
    }

    update(playerX, playerY, entitys) {

        if (this.active == true) {

            this.x += this.sx
            this.y += this.sy

            if (this.x <= playerX - HALF_SCREEN_WIDTH && this.x >= playerX + HALF_SCREEN_WIDTH || this.y <= playerY - HALF_SCREEN_HEIGHT && this.y >= playerY + HALF_SCREEN_HEIGHT) {
                this.active = false
                return
            }

            entitys.forEach(entity => {

                if (entity.active && this.x >= entity.x && this.x <= entity.x + entity.w && this.y >= entity.y && this.y <= entity.y + entity.h) {

                    this.active = false
                    entity.stages[entity.currentStage].health -= 5
                }
            })

            if (Timer.getTime(this.delay >= 200)) {

                this.frame++
                if (this.frame > 4) this.frame = 0
            }

            if (this.sx < 0 && shootAnimation[this.angle][this.frame].width > 0) {
                shootAnimation[this.angle][this.frame].width = - shootAnimation[this.angle][this.frame].width 
            }
            else if (this.sx > 0 && shootAnimation[this.angle][this.frame].width < 0) {
                shootAnimation[this.angle][this.frame].width = - shootAnimation[this.angle][this.frame].width 
            }

            shootAnimation[this.angle][this.frame].draw(shootAnimation[this.angle][this.frame].width > 0 ? this.x - this.w : (this.x + this.w) - shootAnimation[this.angle][this.frame].width / 2, this.y - 10)
        }
    }
}