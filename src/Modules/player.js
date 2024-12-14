import { Entity } from "./entity.js";
import { Sprite } from "./sprite.js";
import { Timer } from "./timer.js";

const HALF_ANALOGIC = 64;
const WALK_SPEED = 3.5;

const PLAYER_ANIMATIONS = [
  {
    name: "IDLE",
    spritesheetPath: "Player/sheet1.png",
    jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 412, widthPerImage: 54, heightPerImage: 82}],
    reverse: true
  },
  {
    name: "RUN",
    spritesheetPath: "Player/sheet3.png",
    jumpers: [
      { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3},
      { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3},
      { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 70, heightPerImage: 88, offsetX: -5, offsetY: -3},
    ],
    reverse: false
  },
  {
    name: "RUN_SHOOT_STRAIGHT",
    spritesheetPath: "Player/sheet11.png",
    jumpers: [
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88, offsetX: -5},
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88, offsetX: -5},
      { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88, offsetX: -5},
    ],
    reverse: false
  },
  {
    name: "RUN_SHOOT_DIAGONAL_UP",
    spritesheetPath: "Player/sheet4.png",
    jumpers: [
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88},
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88},
      { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88},
    ],
    reverse: false
  },
  {
    name: "DUCK",
    spritesheetPath: "Player/sheet12.png",
    jumpers: [
      { imagesLength: 5, imageOffsetX: 0, imageOffsetY: 128, widthPerImage:86, heightPerImage: 64, offsetX: -6, offsetY: 9},
    ],
    reverse: true
  },
  {
    name: "DUCK_TURN",
    spritesheetPath: "Player/sheet12.png",
    jumpers: [
      { imagesLength: 1, imageOffsetX: 0, imageOffsetY: 192, widthPerImage:86, heightPerImage: 64, offsetX: -6, offsetY: 9},
    ],
    reverse: false
  },
  {
    name: "DUCKING",
    spritesheetPath: "Player/sheet12.png",
    jumpers: [
      { imagesLength: 5, imageOffsetX: 0, imageOffsetY: 0, widthPerImage:86, heightPerImage: 64, offsetX: -6, offsetY: 9},
      { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 64, widthPerImage:86, heightPerImage: 64, offsetX: -6, offsetY: 9},
    ],
    reverse: false
  },
]

export class Player {
  constructor(x, y, w, h, angle) {
    this.entity = new Entity(x, y, w, h, angle);
  }
}

export class StandingPlayer extends Player {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);

    this.fps = 24;

    this.moveX = 0;
    this.flipX = false;
    this.flipY = false;

    this.isRunning = false;
    this.isDucking = false;
    this.isDashing = false;
    this.isJumping = false;
    this.isShooting = false;

    this.duckTurning = false; // when you are in duck and turn the direction, because will have a turn animation
    this.startingDucking = false; // if you are start ducking you will still have a different animation

    this.duckTurningTimer = new Timer();

    this.duckTurningTimer.pause();

    this.entity.setAnimations(["IDLE", "RUN", "RUN_SHOOT_STRAIGHT", "RUN_SHOOT_DIAGONAL_UP", "DUCK", "DUCK_TURN", "DUCKING"]);

    os.chdir("host:/src");

    PLAYER_ANIMATIONS.forEach(animation => {

      this.entity.index(
        this.entity[animation.name],
        
        new Sprite(
          animation.spritesheetPath,
          x, y,
          animation.jumpers,
          animation.reverse
        )
      )
    })
  }

  idle(PAD) {
    this.entity.currentAnimation = this.entity.IDLE;
  }

  duck(PAD) {
    if (this.duckTurningTimer.get() >= 75) {
      this.duckTurning = false;
      this.duckTurningTimer.pause();
      this.duckTurningTimer.reset();
    }

    this.entity.currentAnimation = this.duckTurning ? this.entity.DUCK_TURN : this.entity.DUCK;

    let newFlipX = PAD.btns & Pads.LEFT ? true : false;

    if (PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
      newFlipX = PAD.lx < -HALF_ANALOGIC ? true : false;
    }

    if (this.flipX != newFlipX) { // if the player change direction, it will execute the turning animation
      this.flipX = newFlipX;
      this.entity.currentAnimation = this.entity.DUCK_TURN;
      this.duckTurning = true;
      this.duckTurningTimer.resume();
    }
  }

  ducking(PAD) {
    this.entity.currentAnimation = this.entity.DUCKING;

    if (this.entity.isLastFrame()) { // if is the last frame change to ducking animation
      this.isDucking = true;
      this.startingDucking = false;
    }
  }

  run(PAD) {
    this.entity.currentAnimation = this.entity.RUN;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;

    if (PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
      this.flipX = PAD.lx < -HALF_ANALOGIC ? true : false;
    }

    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  runShootStraight(PAD) {
    this.entity.currentAnimation = this.entity.RUN_SHOOT_STRAIGHT;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  runShootDiagonalUp(PAD) {
    this.entity.currentAnimation = this.entity.RUN_SHOOT_DIAGONAL_UP;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  move(speed, camera) {
    const PAD = Pads.get();

    this.fps = 24; // default fps for most of the animations

    this.isRunning = false;
    this.isDashing = false;
    this.isJumping = false;
    this.isShooting = false;

    this.moveX = 0;

    if (PAD.btns & Pads.SQUARE) {
      this.isShooting = true;
    }

    if (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT || PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
      this.isRunning = true;
    }

    if (PAD.btns & Pads.DOWN || PAD.btns & PAD.ly > HALF_ANALOGIC) {
      if (!this.startingDucking && !this.isDucking) {
        this.startingDucking = true;
      }
    }
    else {
      this.startingDucking = false;
      this.isDucking = false;
    }

    if (this.startingDucking && !this.isDucking) {
      this.ducking(PAD);
    }
    else if (!this.startingDucking && this.isDucking) {
      this.duck(PAD);
    }
    else if ((PAD.btns & Pads.UP) && this.isRunning && this.isShooting) {
      this.runShootDiagonalUp(PAD);
    }
    else if (this.isRunning && this.isShooting) {
      this.runShootStraight(PAD);
    }
    else if (this.isRunning) {
      this.run(PAD);
    }
    else {
      this.idle(PAD);
    }

    this.entity.x += this.moveX;
    this.entity.animations[this.entity.currentAnimation].sprite.x = this.entity.x;
    this.entity.animations[this.entity.currentAnimation].sprite.flipX = this.flipX;

    this.entity.animate(this.entity.currentAnimation, this.fps, camera);
  }
}