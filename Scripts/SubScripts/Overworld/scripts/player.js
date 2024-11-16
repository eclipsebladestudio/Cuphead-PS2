import BoundingBox from './boundingbox.js';

class Player {
    constructor() {
        this.playerX = 223;
        this.playerY = 242;
        this.playerSize = 30; 

        this.playerSpeed = 1.5;

        this.cameraX = 0;
        this.cameraY = 0;

        this.pad = Pads.get();
        
        

        this.playerUpWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Up', 12);
        this.playerLeftWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Left Walk', 11);
        this.playerRightWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Right Walk', 11);
        this.playerDownWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Down Walk', 13);
        this.playerDiagonalUpRightWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal UP', 10);
        this.playerDiagonalUpLeftWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Up Left', 10);
        this.playerDiagonalDownRightWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Down', 10);
        this.playerDiagonalDownLeftWalkImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Down Left', 9);

        this.playerUpIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Up/Idle', 6);
        this.playerLeftIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Left Walk/Idle', 4);
        this.playerRightIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Right Walk/Idle', 4);
        this.playerDownIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Down Walk/Idle', 8);
        this.playerDiagonalUpRightIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal UP/Idle', 4);
        this.playerDiagonalUpLeftIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Up Left/Idle', 4);
        this.playerDiagonalDownRightIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Down/Idle', 4);
        this.playerDiagonalDownLeftIdleImages = this.loadImages('Assets/Textures/Overworld/Player/Diagonal Down Left/Idle', 4);

        this.currentWalkFrame = 0;
        this.walkAnimationSpeed = 50;
        this.walkLastFrameTime = Date.now();
        this.lastDirection = 'down';
        this.idleAnimationSpeed = 100;
        this.idleFrameIndex = 0;
        this.idleLastFrameTime = Date.now();
        this.boundingBoxes = new BoundingBox().getBoundingBoxes();

        this.imageMap = {
            'diagonalUpRight': { walk: this.playerDiagonalUpRightWalkImages, idle: this.playerDiagonalUpRightIdleImages },
            'diagonalUpLeft': { walk: this.playerDiagonalUpLeftWalkImages, idle: this.playerDiagonalUpLeftIdleImages },
            'diagonalDownRight': { walk: this.playerDiagonalDownRightWalkImages, idle: this.playerDiagonalDownRightIdleImages },
            'diagonalDownLeft': { walk: this.playerDiagonalDownLeftWalkImages, idle: this.playerDiagonalDownLeftIdleImages },
            'up': { walk: this.playerUpWalkImages, idle: this.playerUpIdleImages },
            'left': { walk: this.playerLeftWalkImages, idle: this.playerLeftIdleImages },
            'right': { walk: this.playerRightWalkImages, idle: this.playerRightIdleImages },
            'down': { walk: this.playerDownWalkImages, idle: this.playerDownIdleImages },
        };
    }

    loadImages(path, count) {
        let images = [];
        for (let i = 1; i <= count; i++) {
            images.push(new Image(`${path}/${i}.png`));
        }
        return images;
    }

    update() {
        this.pad.update();

        let nextX = this.playerX;
        let nextY = this.playerY;
        

        if (this.pad.btns & Pads.RIGHT) {
            nextX += this.playerSpeed;
        } else if (this.pad.btns & Pads.LEFT) {
            nextX -= this.playerSpeed;
        }

        if (this.pad.btns & Pads.DOWN) {
            nextY += this.playerSpeed;
        } else if (this.pad.btns & Pads.UP) {
            nextY -= this.playerSpeed;
        }


        if (!this.checkCollision(nextX, nextY)) {
            this.playerX = nextX;
            this.playerY = nextY;
            this.cameraX = this.playerX - 640 / 2;
            this.cameraY = this.playerY - 480 / 2;
        }


        if ((this.pad.btns & Pads.SQUARE) && !(this.pad.old_btns & Pads.SQUARE)) {
            this.drawBoundingBoxes = !this.drawBoundingBoxes;
        }


        this.updatePlayerAnimation();
    }

    movePlayer(dx, dy) {
        const nextX = this.playerX + dx;
        const nextY = this.playerY + dy;

        if (!this.checkCollision(nextX, nextY)) {
            this.playerX = nextX;
            this.playerY = nextY;
            this.cameraX = this.playerX - this.screenWidth / 2;
            this.cameraY = this.playerY - this.screenHeight / 2;
        }
    }

    checkCollision(nextX, nextY) {
       
        for (let box of this.boundingBoxes) {
            if (
                nextX < box.x + box.width &&
                nextX + this.playerSize > box.x &&
                nextY < box.y + box.height &&
                nextY + this.playerSize > box.y
            ) {
                return true;
            }
        }
        return false;
    }

    updatePlayerAnimation() {
        const now = Date.now();
        if (now - this.walkLastFrameTime > this.walkAnimationSpeed) {
            if (this.pad.btns & Pads.RIGHT && this.pad.btns & Pads.UP) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerDiagonalUpRightWalkImages.length;
                this.lastDirection = 'diagonalUpRight';
            } else if (this.pad.btns & Pads.LEFT && this.pad.btns & Pads.UP) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerDiagonalUpLeftWalkImages.length;
                this.lastDirection = 'diagonalUpLeft';
            } else if (this.pad.btns & Pads.RIGHT && this.pad.btns & Pads.DOWN) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerDiagonalDownRightWalkImages.length;
                this.lastDirection = 'diagonalDownRight';
            } else if (this.pad.btns & Pads.LEFT && this.pad.btns & Pads.DOWN) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerDiagonalDownLeftWalkImages.length;
                this.lastDirection = 'diagonalDownLeft';
            } else if (this.pad.btns & Pads.RIGHT) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerRightWalkImages.length;
                this.lastDirection = 'right';
            } else if (this.pad.btns & Pads.LEFT) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerLeftWalkImages.length;
                this.lastDirection = 'left';
            } else if (this.pad.btns & Pads.DOWN) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerDownWalkImages.length;
                this.lastDirection = 'down';
            } else if (this.pad.btns & Pads.UP) {
                this.currentWalkFrame = (this.currentWalkFrame + 1) % this.playerUpWalkImages.length;
                this.lastDirection = 'up';
            } else {
                this.updateIdleAnimation();
            }
            this.walkLastFrameTime = now;
        }
    }

    updateIdleAnimation() {
        const now = Date.now();
        if (now - this.idleLastFrameTime > this.idleAnimationSpeed) {
            this.idleFrameIndex = (this.idleFrameIndex + 1) % this.imageMap[this.lastDirection].idle.length;
            this.idleLastFrameTime = now;
        }
    }

    draw() {
        const direction = this.imageMap[this.lastDirection];
        const isMoving = this.pad.btns & (Pads.RIGHT | Pads.LEFT | Pads.UP | Pads.DOWN);
        const images = isMoving ? direction.walk : direction.idle;
        const frameIndex = isMoving ? this.currentWalkFrame : this.idleFrameIndex;

        if (images && images[frameIndex]) {
            images[frameIndex].draw(this.playerX - this.cameraX, this.playerY - this.cameraY);
        }

        if (this.drawBoundingBoxes) {
            this.boundingBoxes.forEach(box => {
                Draw.rect(box.x - this.cameraX, box.y - this.cameraY, box.width, box.height, Color.new(255, 0, 0, 64));
            });
        }

    }

    getCameraPosition() {
        return { x: this.cameraX, y: this.cameraY };
    }
}

export default Player;
