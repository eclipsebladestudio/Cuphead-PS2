import { Entity } from "./entity.js";
import { Effect } from "./effect.js";
import { Sprite } from "./sprite.js";
import { Bullet } from "./bullet.js";
import { Timer } from "./timer.js";

const HALF_ANALOGIC = 64;
const RUN_SPEED = 4;
const DASH_SPEED = 11;
const SHOOT_DELAY = 125;
const SHOOT_SPEED = 20;
const DUST_EFFECT_SPEED = 0.5;

console.log("test2231")
const PLAYER_ANIMATIONS = [
  { name: "INTRO", spritesheetPath: "source/assets/player/intro.png", jumpers: [{ imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 78, heightPerImage: 84, }, { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 84, widthPerImage: 78, heightPerImage: 84 }, { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 168, widthPerImage: 78, heightPerImage: 84 }, { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 252, widthPerImage: 78, heightPerImage: 84 }, { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 336, widthPerImage: 78, heightPerImage: 84 }], reverse: false },
  { name: "JUMP", spritesheetPath: "source/assets/player/sheet12.png", jumpers: [{ imagesLength: 7, imageOffsetX: 0, imageOffsetY: 390, widthPerImage: 45, heightPerImage: 50, offsetX: 0, offsetY: 0 },], reverse: false },
  { name: "IDLE", spritesheetPath: "source/assets/player/sheet1.png", jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 412, widthPerImage: 54, heightPerImage: 82 }], reverse: true },
  { name: "RUN", spritesheetPath: "source/assets/player/sheet3.png", jumpers: [{ imagesLength: 7, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3 }, { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3 }, { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3 },], reverse: false },
  { name: "RUN_SHOOT_STRAIGHT", spritesheetPath: "source/assets/player/sheet11.png", jumpers: [{ imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88, offsetX: -5, offsetY: -4 }, { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88, offsetX: -5, offsetY: -4 }, { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88, offsetX: -5, offsetY: -4 },], reverse: false },
  { name: "RUN_SHOOT_DIAGONAL_UP", spritesheetPath: "source/assets/player/sheet4.png", jumpers: [{ imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88, offsetY: -4, offsetX: -5 }, { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88, offsetX: -5, offsetY: -4 }, { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88, offsetX: -5, offsetY: -4 },], reverse: false },
  { name: "DUCK", spritesheetPath: "source/assets/player/sheet12.png", jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 128, widthPerImage: 86, heightPerImage: 64, offsetX: -6, offsetY: 9 },], reverse: true },
  { name: "DUCK_TURN", spritesheetPath: "source/assets/player/sheet12.png", jumpers: [{ imagesLength: 1, imageOffsetX: 0, imageOffsetY: 192, widthPerImage: 86, heightPerImage: 64, offsetX: -6, offsetY: 9 },], reverse: false },
  { name: "DUCK_SHOOT", spritesheetPath: "source/assets/player/sheet12.png", jumpers: [{ imagesLength: 3, imageOffsetX: 0, imageOffsetY: 256, widthPerImage: 90, heightPerImage: 64, offsetX: -6, offsetY: 9 }], reverse: false },
  { name: "DUCKING", spritesheetPath: "source/assets/player/sheet12.png", jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 86, heightPerImage: 64, offsetX: -6, offsetY: 9 }, { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 64, widthPerImage: 86, heightPerImage: 64, offsetX: -6, offsetY: 9 },], reverse: false },
  { name: "START_DASH_GROUND", spritesheetPath: "source/assets/player/sheet5.png", jumpers: [{ imagesLength: 2, imageOffsetX: 0, imageOffsetY: 210, widthPerImage: 168, heightPerImage: 74, offsetX: -20 }], reverse: false },
  { name: "DASH_GROUND", spritesheetPath: "source/assets/player/sheet5.png", jumpers: [{ imagesLength: 1, imageOffsetX: 336, imageOffsetY: 210, widthPerImage: 168, heightPerImage: 74, offsetX: -20 }, { imagesLength: 3, imageOffsetX: 0, imageOffsetY: 280, widthPerImage: 168, heightPerImage: 74, offsetX: -20 }, { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 350, widthPerImage: 168, heightPerImage: 74, offsetX: -20 }], reverse: false },
  { name: "IDLE_SHOOT_STRAIGHT", spritesheetPath: "source/assets/player/sheet1.png", jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 242, widthPerImage: 68, heightPerImage: 82 }], reverse: true },
  { name: "IDLE_SHOOT_UP", spritesheetPath: "source/assets/player/sheet1.png", jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 324, widthPerImage: 54, heightPerImage: 88, offsetX: -2, offsetY: -3 }], reverse: true },
  { name: "SPECIAL_GROUND_STRAIGHT", spritesheetPath: "source/assets/player/sheet6.png", jumpers: [{ imagesLength: 4, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 93, heightPerImage: 76, offsetX: -6 }, { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 76, widthPerImage: 94, heightPerImage: 78, offsetX: -6 }, { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 159, widthPerImage: 94, heightPerImage: 82, offsetX: -6 }, { imagesLength: 1, imageOffsetX: 0, imageOffsetY: 241, widthPerImage: 70, heightPerImage: 82, offsetX: -6 }], reverse: false }
]

console.log("test21232")

export class Player {
  constructor(x, y, w, h, angle) {
    this.entity = new Entity(x, y, w, h, angle);
  }
}

export class StandingPlayer extends Player {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);

    this.fps = 24;

    this.flipX = false;
    this.flipY = false;

    this.position = {
      x: 0,
      y: 0,
    };

    this.physics = {
      gravity: 0.5,
      jumpStrength: -10,
      maxVelocityY: 10
    };

    this.velocity = {
      x: 0,
      y: 0
    };

    this.constraints = {
      minX: null,
      maxX: null,
      maxY: y,
      minY: y - 100 
    };

    this.state = {
      isJumping: false,
      isGrounded: true,
      isRunning: false,
      isDucking: false,
      isDashing: false,
      isShooting: false,
      isUsingSpecial: false,
      affectedByGravity: true
    };

    this.bullets = [];
    this.shootDelay = new Timer();

    this.dashDelay = new Timer();
    this.dashReloadTime = new Timer();
    this.startingDash = false;

    this.duckTurning = false;
    this.startingDucking = false;

    this.duckTurningTimer = new Timer();

    this.duckTurningTimer.pause();

    this.introTimer = new Timer();
    this.introFinished = false;

    this.entity.setAnimations(["INTRO", "JUMP", "IDLE", "IDLE_SHOOT_STRAIGHT", "IDLE_SHOOT_UP", "RUN", "RUN_SHOOT_STRAIGHT", "RUN_SHOOT_DIAGONAL_UP", "START_DASH_GROUND", "DASH_GROUND", "DUCK", "DUCK_TURN", "DUCK_SHOOT", "DUCKING", "SPECIAL_GROUND_STRAIGHT"]);


    this.runDustEffects = [
      new Effect(new Sprite("source/assets/player/dust_effect.png", 0, 0, [{ imagesLength: 9, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 56, heightPerImage: 50 }, { imagesLength: 5, imageOffsetX: 0, imageOffsetY: 51, widthPerImage: 56, heightPerImage: 52 }], false), 24),
      new Effect(new Sprite("source/assets/player/dust_effect.png", 0, 0, [{ imagesLength: 9, imageOffsetX: 0, imageOffsetY: 103, widthPerImage: 56, heightPerImage: 50 }, { imagesLength: 5, imageOffsetX: 0, imageOffsetY: 154, widthPerImage: 56, heightPerImage: 52 }], false), 24),
      new Effect(new Sprite("source/assets/player/dust_effect.png", 0, 0, [{ imagesLength: 9, imageOffsetX: 0, imageOffsetY: 206, widthPerImage: 56, heightPerImage: 50 }, { imagesLength: 5, imageOffsetX: 0, imageOffsetY: 256, widthPerImage: 56, heightPerImage: 52 }], false), 24),
    ];

    this.currentRunDustEffectIndex = -1;

    this.runDustEffectTimer = new Timer();

    this.runDustEffects.forEach(effect => {
      effect.onUpdate = function () {
        effect.y -= DUST_EFFECT_SPEED;
      }
    })

    this.fingerEffect = new Effect(new Sprite("source/assets/player/Finger/finger.png", 0, 0, [{ imagesLength: 2, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 53, heightPerImage: 50 }, { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 42, widthPerImage: 53, heightPerImage: 50 }], false), 24);
    PLAYER_ANIMATIONS.forEach(animation => this.entity.index(this.entity[animation.name], new Sprite(animation.spritesheetPath, x, y, animation.jumpers, animation.reverse)));
  }

  getPlayerFlipX(PAD) {
    let flipX = PAD.btns & Pads.LEFT ? true : false;

    if (PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
      flipX = PAD.lx < -HALF_ANALOGIC ? true : false;
    }

    return flipX;
  }

  idle(PAD) {

    if (!this.state.isShooting) {
      this.entity.currentAnimation = this.entity.IDLE;
      return;
    }

    if (this.shootDelay.get() >= SHOOT_DELAY) {
      const randomX = Math.round(Math.random() * 10)
      const randomY = Math.round(Math.random() * 15)

      if (PAD.btns & Pads.UP || PAD.ly < -HALF_ANALOGIC) {
        this.entity.currentAnimation = this.entity.IDLE_SHOOT_UP;
        this.bullets.push(new Bullet(this.entity.x + (this.flipX ? -30 : 7) + randomX, this.entity.y + randomY, 0, -SHOOT_SPEED, 5, 30, 90, 5));

        this.shootDelay.reset();

        if (this.state.isShooting) {
          this.fingerEffect.x = this.entity.x + (this.flipX ? -18 : 14)
          this.fingerEffect.y = this.entity.y - 25
        }
        return
      }

      this.entity.currentAnimation = this.entity.IDLE_SHOOT_STRAIGHT;
      this.bullets.push(new Bullet(this.entity.x + (this.flipX ? -30 : 70) + randomX, this.entity.y + 35 + randomY, this.flipX ? -SHOOT_SPEED : SHOOT_SPEED, 0, 30, 5, 0, 5));
      this.fingerEffect.x = this.entity.x + (this.flipX ? -20 : 33)
      this.fingerEffect.y = this.entity.y + 17
      this.shootDelay.reset();
    }
  }

  dash(PAD) {

    if (this.dashDelay.get() > 350) {
      this.state.isDashing = false;
      return
    }

    this.position.x = this.flipX ? -DASH_SPEED : DASH_SPEED;

    if (this.entity.isLastFrame() && this.startingDash) {
      this.startingDash = false;
    }

    if (this.startingDash) {
      this.entity.currentAnimation = this.entity.START_DASH_GROUND;
      return;
    }

    this.entity.currentAnimation = this.entity.DASH_GROUND;
  }

  duck(PAD) {
    if (this.duckTurningTimer.get() >= 75) {
      this.duckTurning = false;
      this.duckTurningTimer.pause();
      this.duckTurningTimer.reset();
    }

    this.entity.currentAnimation = this.duckTurning ? this.entity.DUCK_TURN : this.entity.DUCK;

    let newFlipX = this.getPlayerFlipX(PAD);

    if (this.flipX != newFlipX) {
      this.flipX = newFlipX;
      this.entity.currentAnimation = this.entity.DUCK_TURN;
      this.duckTurning = true;
      this.duckTurningTimer.resume();
      return;
    }

    if (this.state.isShooting) {

      this.entity.currentAnimation = this.entity.DUCK_SHOOT;

      if (this.shootDelay.get() >= SHOOT_DELAY) {
        const randomX = Math.round(Math.random() * 10)
        const randomY = Math.round(Math.random() * 15)

        this.bullets.push(new Bullet(this.entity.x + (this.flipX ? -30 : 70) + randomX, this.entity.y + 50 + randomY, this.flipX ? -SHOOT_SPEED : SHOOT_SPEED, 0, 30, 5, 0, 5));
        this.fingerEffect.x = this.entity.x + (this.flipX ? -30 : 46)
        this.fingerEffect.y = this.entity.y + 31
        this.shootDelay.reset();
      }
    }
  }

  ducking(PAD) {
    this.entity.currentAnimation = this.entity.DUCKING;

    if (this.entity.isLastFrame()) {
      this.state.isDucking = true;
      this.startingDucking = false;
    }
  }

  applyGravity(deltaTime) {
    if (this.velocity.y < this.physics.maxVelocityY) {
      this.velocity.y += this.physics.gravity * deltaTime;
    }
  }

  jump(multiplier = 1) {
    if (this.state.isGrounded && !this.state.isJumping) {
      this.velocity.y = this.physics.jumpStrength * multiplier;
      this.state.isJumping = true;
      this.state.isGrounded = false;
      
      return true;
    }
    
    return false;
  }

  run(PAD) {
    this.entity.currentAnimation = this.state.isShooting ? this.entity.RUN_SHOOT_STRAIGHT : this.entity.RUN;
  
    if (this.runDustEffectTimer.get() >= 250) {
      this.currentRunDustEffectIndex++;
  
      if (this.currentRunDustEffectIndex > 2) {
        this.currentRunDustEffectIndex = 0;
      }
  
      this.runDustEffects[this.currentRunDustEffectIndex].active = true;
      this.runDustEffects[this.currentRunDustEffectIndex].x = this.entity.x;
      this.runDustEffects[this.currentRunDustEffectIndex].y = this.entity.y + 41;
      this.runDustEffectTimer.reset();
    }
  
    if (!this.state.isShooting) {
      return;
    }
  
    const isShootingDiagonalUp = (PAD.btns & Pads.UP) || (PAD.ly < -HALF_ANALOGIC);
  
    if (this.shootDelay.get() >= SHOOT_DELAY) {
      const randomX = Math.round(Math.random() * 10);
      const randomY = Math.round(Math.random() * 15);
  
      if (isShootingDiagonalUp) {
        this.bullets.push(new Bullet(this.entity.x + (this.flipX ? -30 : 88) + randomX, this.entity.y + 6 + randomY, this.flipX ? -SHOOT_SPEED : SHOOT_SPEED, -SHOOT_SPEED, 10, 10, this.flipX ? -45 : 45, 5));
      } else {
        this.bullets.push(new Bullet(this.entity.x + (this.flipX ? -30 : 70) + randomX, this.entity.y + 35 + randomY, this.flipX ? -SHOOT_SPEED : SHOOT_SPEED, 0, 30, 5, 0, 5));
      }
  
      this.shootDelay.reset();
    }
  
    if (isShootingDiagonalUp) {
      this.entity.currentAnimation = this.entity.RUN_SHOOT_DIAGONAL_UP;
      this.fingerEffect.x = this.entity.x + (this.flipX ? -28 : 35);
      this.fingerEffect.y = this.entity.y - 2;
      return;
    }
  
    this.fingerEffect.x = this.entity.x + (this.flipX ? -27 : 34);
    this.fingerEffect.y = this.entity.y + 17;
  }

  energyBeamSpecial(PAD) {
    this.entity.currentAnimation = this.entity.SPECIAL_GROUND_STRAIGHT

    if (this.entity.isLastFrame()) {
      this.state.isUsingSpecial = false
    }
  }

  updateBullets() {
    this.bullets.forEach(bullet => bullet.update(this.entity.x, this.entity.y, []));

  }

  updateEffects() {
    this.runDustEffects.forEach(effect => {
      effect.update();
      effect.draw();
      if (effect.sprite.inLastFrame) {
        effect.active = false;
      }
    })
  }

  updateIntro() {
    if (this.entity.isLastFrame()) {
      this.introFinished = true;
    }
  }

  isGrounded(){
    return this.entity.y >= this.constraints.maxY
  }

  update(speed, camera, deltaTime = 1) {
    const PAD = Pads.get();
    this.fps = 24;
  
    if (this.state.affectedByGravity) {
      this.applyGravity(deltaTime);
      this.entity.y += this.velocity.y;
    }
  
    if (this.isGrounded()) {
      this.entity.y = this.constraints.maxY;
      this.velocity.y = 0;
      this.state.isGrounded = true;
      this.state.isJumping = false;
    }
  
    this.state.isRunning = false;
    this.state.isShooting = false;
    this.position.x = 0;
  
    if (this.state.isUsingSpecial) {
      this.energyBeamSpecial(PAD);
    } else if (this.introFinished) {

      if (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT || PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
        this.state.isRunning = true;
        this.flipX = this.getPlayerFlipX(PAD);
        this.position.x = this.flipX ? -RUN_SPEED : RUN_SPEED;
      }
  
      if (PAD.btns & Pads.SQUARE) {
        this.state.isShooting = true;
      }
  
      if ((PAD.btns & Pads.CROSS ) && this.state.isGrounded) {
        this.jump();
      }
  
      if (PAD.btns & Pads.L1 && !this.state.isDashing && this.dashReloadTime.get() >= 500) {
        this.state.isDashing = true;
        this.startingDash = true;
        this.dashDelay.reset();
        this.dashReloadTime.reset();
      }
  
      if (this.state.isJumping && !this.state.isGrounded) {
        this.entity.currentAnimation = this.entity.JUMP;
      } else if (this.state.isDashing) {
        this.dash(PAD);
      } else {
        if (PAD.btns & Pads.DOWN || PAD.ly > HALF_ANALOGIC) {
          if (!this.startingDucking && !this.state.isDucking) {
            this.startingDucking = true;
          }
        } else {
          this.startingDucking = false;
          this.state.isDucking = false;
        }
  
        if (this.startingDucking && !this.state.isDucking) {
          this.ducking(PAD);
        } else if (!this.startingDucking && this.state.isDucking) {
          this.duck(PAD);
        } else if (this.state.isRunning) {
          this.run(PAD);
        } else {
          this.idle(PAD);
        }
      }
    } else {
      this.entity.currentAnimation = this.entity.INTRO;
      this.position.x = 0;
      this.velocity.y = 0;
    }
  
    this.entity.x += this.position.x;
    this.entity.animations[this.entity.currentAnimation].sprite.x = this.entity.x;
    this.entity.animations[this.entity.currentAnimation].sprite.y = this.entity.y;
    this.entity.animations[this.entity.currentAnimation].sprite.flipX = this.flipX;
  
    camera.y = this.entity.y - 224;
  
    this.entity.animate(this.entity.currentAnimation, this.fps, camera);
  
    if (this.entity.currentAnimation == this.entity.INTRO) {
      this.updateIntro();
    }
  
    if (this.state.isShooting) {
      this.fingerEffect.update();
      this.fingerEffect.draw();
    }
  
    this.updateBullets();
    this.updateEffects();
  }

  draw(camera) {
    this.entity.draw(camera);
  }
}