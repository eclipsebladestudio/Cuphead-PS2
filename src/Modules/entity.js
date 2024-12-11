import { Timer } from './timer.js'
import { Sprite } from './sprite.js';

function isColliding(collider1, collider2) {

  return collider1.x <= collider2.x + collider2.w && collider1.x + collider1.w >= collider2.x && collider1.y <= collider2.y + collider2.h && collider1.y + collider1.h >= collider2.y;
}

export class Entity {

  flipX = false;
  flipY = false;

  hitBoxes = [];
  animations = [];

  frameSwapTimer = new Timer();

  currentAnimation;

  currentAnimationFrame;

  constructor(x, y, w, h, angle) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.angle = angle;

  }

  isColliding(collider) {

    return this.x <= collider.x + collider.w && this.x + this.w >= collider.x && this.y <= collider.y + collider.h && this.y + this.h >= collider.y;
  }

  setAnimations(animations) {

    animations.forEach(animationName => {
      
      this.animations.push({sprite: null});
      this.hitBoxes.push([]);
      this[animationName] = this.animations.length - 1;
    });

  }

  index(port, sprite, hitBox) {

    this.animations[port].sprite = sprite;
    this.hitBoxes[port].push(hitBox);
  }

  animate(animation, fps, camera) {

    fps = 1000 / fps;

    const isColliding = this.isColliding(this, { x: camera.x, y: camera.y, w: 640, h: 448});

    if (isColliding) {

      if (this.currentAnimation != animation) {

        this.frameSwapTimer.reset();

        this.animations[animation].sprite.update();

      }

      if (this.frameSwapTimer.get() >= fps) {

        this.frameSwapTimer.reset()

        this.animations[animation].sprite.update();
        
      }

      this.currentAnimationFrame = this.animations[animation].sprite;
      this.hitBox = this.hitBoxes[animation][this.currentFrame];
    }
  }

  draw(camera) {

    const isColliding = this.isColliding(this, { x: camera.x, y: camera.y, w: 640, h: 448});

    if (isColliding) {

      this.currentAnimationFrame.draw();
    }
  }
}
