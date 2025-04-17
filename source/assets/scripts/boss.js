class Stage {
    constructor(health) {
        this.health = health
        this.isDead = false
        this.animations = {}
        this.currentFrame = 0
        this.currentAnim = null
        this.lastHealth = health
        this.lastFrameTime = Date.now()
    }

    newAnimation(animName, path, fps, onFinish, offsetX, offsetY, reverse = false) {
        let animations = []

        System.listDir(path)
            .sort((a, b) => {
               
                const numA = parseInt(a.name.match(/\d+/))
                const numB = parseInt(b.name.match(/\d+/))
                return numA - numB
            })
            .forEach(file => {
                animations.push(new Image(path + "/" + file.name, RAM))
            })

        this.animations[animName] = {
            fps: 1000 / fps,
            onFinish: onFinish,
            animations: animations,
            offsetX: offsetX ?? 0,
            offsetY: offsetY ?? 0,
            reverse: reverse,
            forward: true
        }
    }

    setAnimation(animName) {

        if (this.currentAnim !== animName) {
            
            this.currentFrame = 0
            this.lastFrameTime = Date.now()
            this.currentAnim = animName
        }
    }

    freeAnimation(animName, shouldFree = false) {
        if (!shouldFree) return; 

        if (this.animations[animName]) {
            this.animations[animName].animations.forEach((_, index, arr) => {
                arr[index] = null
            })
            this.animations[animName] = null
        }

        std.gc()
    }

    update(x, y) {
        const anim = this.animations[this.currentAnim]
        const now = Date.now()

        if (now - this.lastFrameTime >= anim.fps) {
            this.lastFrameTime = now

            if (anim.reverse) {
                if (anim.forward) {
                    this.currentFrame++
                    if (this.currentFrame >= anim.animations.length - 1) {
                        anim.forward = false
                    }
                } else {
                    this.currentFrame--
                    if (this.currentFrame <= 0) {
                        anim.forward = true
                        if (anim.onFinish) anim.onFinish()
                    }
                }
            } else {
                this.currentFrame++
                if (this.currentFrame >= anim.animations.length) {
                    this.currentFrame = 0
                    if (anim.onFinish) anim.onFinish()
                }
            }
        }

        anim.animations[this.currentFrame].draw(x, y)

        if (this.onUpdate) this.onUpdate()
        if (this.health <= 0 && this.onDead) this.onDead()
    }
}

export class Boss {
    stages = []
    flipX = false
    active = true
    currentStage = 0

    constructor(health, x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.health = health
    }

    newStage(health) {
        this.stages.push(new Stage(health))
        return this.stages.length - 1
    }

    setStage(index) {
        this.currentStage = index
    }

    getCurrentAnim() {
        return this.stages[this.currentStage].currentAnim
    }

    draw() {
        if (this.active) {
            const stage = this.stages[this.currentStage]
            const anim = stage.animations[stage.currentAnim]
            const currentFrame = anim.animations[stage.currentFrame]

            if (stage.health !== stage.lastHealth) {
                stage.lastHealth = stage.health
                currentFrame.color = Color.new(255, 255, 255)
            } else {
                currentFrame.color = Color.new(128, 128, 128, 128)
            }

            currentFrame.width = this.flipX ? -Math.abs(currentFrame.width) : Math.abs(currentFrame.width)

            stage.update(this.flipX ? this.x - Math.abs(anim.offsetX) - currentFrame.width : this.x + anim.offsetX, this.y + anim.offsetY)

            let ram_usage = System.getMemoryStats()
            console.log("Using Ram " + (ram_usage.used / 1048576).toFixed(2) + "MB/32MB")
        }
    }

    free() {
        this.stages.forEach(stage => {
            if (stage.animations) {
                for (let animName in stage.animations) {
                    if (stage.animations[animName] && stage.animations[animName].animations) {
                        stage.animations[animName].animations.forEach((animation, index) => {
                            stage.animations[animName].animations[index] = null
                        })
                    }
                    stage.animations[animName] = null
                }
            }
        })
        std.gc()
    }
}
