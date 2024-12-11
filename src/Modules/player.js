import { Entity } from "./entity.js";
import { Sprite } from "./sprite.js";

const HALF_ANALOGIC = 64;
const WALK_SPEED = 3.5;

const PLAYER_ANIMATIONS = [
  {
    name: "IDLE",
    spritesheetPath: "Player/sheet1.png",
    jumpers: [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 412, widthPerImage: 54, heightPerImage: 82 }],
    reverse: true
  },
  {
    name: "RUN",
    spritesheetPath: "Player/sheet3.png",
    jumpers: [
      { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
      { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
      { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
    ],
    reverse: false
  },
  {
    name: "RUN_SHOOT_STRAIGHT",
    spritesheetPath: "Player/sheet11.png",
    jumpers: [
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
      { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
      { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
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
  }
]

export class Player {
  constructor(x, y, w, h, angle) {
    this.entity = new Entity(x, y, w, h, angle);
  }
}

export class StandingPlayer extends Player {
  constructor(x, y, w, h, angle) {
    super(x, y, w, h, angle);

    this.moveX = 0;
    this.flipX = false;
    this.flipY = false;

    this.entity.setAnimations(["IDLE", "RUN", "RUN_SHOOT_STRAIGHT", "RUN_SHOOT_DIAGONAL_UP"]);

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

  run(PAD) {
    this.entity.currentAnimation = this.entity.RUN;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  runShoot(PAD) {
    this.entity.currentAnimation = this.entity.RUN_SHOOT_STRAIGHT;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  shootDiagonalUp(PAD) {
    this.entity.currentAnimation = this.entity.RUN_SHOOT_DIAGONAL_UP;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -WALK_SPEED : WALK_SPEED;
  }

  move(speed, camera) {
    const PAD = Pads.get();

    this.isRunning = false;
    this.moveX = 0;


    if ((PAD.btns & Pads.UP) && (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT) && (PAD.btns & Pads.SQUARE)) {
      this.isRunning = true;    
      this.shootDiagonalUp(PAD);
    }

    else if ((PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT) && PAD.btns & Pads.SQUARE) {
      this.isRunning = true;
      this.runShoot(PAD);
    }

    else if (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT || PAD.lx < -HALF_ANALOGIC || PAD.lx > HALF_ANALOGIC) {
      this.isRunning = true;
      this.run(PAD);
    }

    else {
      this.idle(PAD);
    }

    this.entity.x += this.moveX;
    this.entity.animations[this.entity.currentAnimation].sprite.x = this.entity.x;
    this.entity.animations[this.entity.currentAnimation].sprite.flipX = this.flipX;

    this.entity.animate(this.entity.currentAnimation, 24, camera);
  }
}
