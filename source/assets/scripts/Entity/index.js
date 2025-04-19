import { Timer } from '../timer.js';

export class Entity {
    constructor(x, y, w, h, angle) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.flipX = false;
        this.flipY = false;
        this.hitBoxes = [];
        this.animations = [];
        this.frameSwapTimer = new Timer();
        this.currentAnimation = null;
        this.currentAnimationFrame = null;
    }

    isColliding(collider) {
        return (
            this.x <= collider.x + collider.w &&
            this.x + this.w >= collider.x &&
            this.y <= collider.y + collider.h &&
            this.y + this.h >= collider.y
        );
    }

    setAnimations(animations) {
        animations.forEach(animationName => {
            this.animations.push({ sprite: null });
            this.hitBoxes.push([]);
            this[animationName] = this.animations.length - 1;
        });
    }

    index(port, sprite, hitBox) {
        this.animations[port].sprite = sprite;
        this.hitBoxes[port].push(hitBox);
    }

    animate(animation, fps, camera) {
        const frameDuration = 1000 / fps;
        const isVisible = this.isColliding({
            x: camera.x,
            y: camera.y,
            w: 640,
            h: 448
        });

        if (!isVisible) return;

        if (this.currentAnimation !== animation) {
            this.frameSwapTimer.reset();
            this.animations[animation].sprite.update();
        }

        if (this.frameSwapTimer.get() >= frameDuration) {
            this.frameSwapTimer.reset();
            this.animations[animation].sprite.update();
        }

        this.currentAnimationFrame = this.animations[animation].sprite;
    }

    isLastFrame() {
        return this.currentAnimationFrame?.inLastFrame ?? false;
    }

    draw(camera) {
        const isVisible = this.isColliding({
            x: camera.x,
            y: camera.y,
            w: 640,
            h: 448
        });

        if (isVisible) {
            this.currentAnimationFrame.draw();
        }
    }
}