import { Entity } from "./entity.js";
import { Sprite } from "./sprite.js";

const halfAnalogic = 64;

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

    this.entity.setAnimations(["IDLE", "RUN", "RUN_SHOOT", "SHOOT_DIAGONAL_UP"]);

    os.chdir("host:/src");

    this.entity.index(
      this.entity.IDLE,
      new Sprite(
        "Player/sheet1.png",
        x,
        y,
        [{ imagesLength: 5, imageOffsetX: 0, imageOffsetY: 412, widthPerImage: 54, heightPerImage: 82 }],
        true
      )
    );

    this.entity.index(
      this.entity.RUN,
      new Sprite(
        "Player/sheet3.png",
        x,
        y,
        [
          { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
          { imagesLength: 7, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
          { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 70, heightPerImage: 88, offsetX: -5 },
        ],
        false
      )
    );

    this.entity.index(
      this.entity.RUN_SHOOT,
      new Sprite(
        "Player/sheet11.png",
        x,
        y,
        [
          { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
          { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
          { imagesLength: 4, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88, offsetX: -5 },
        ],
        false
      )
    );
    
    this.entity.index(
      this.entity.SHOOT_DIAGONAL_UP,
      new Sprite(
        "Player/sheet4.png",
        x,
        y,
        [
          { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 76, heightPerImage: 88},
          { imagesLength: 6, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 76, heightPerImage: 88},
          { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 76, heightPerImage: 88},
        ],
        false
      )
    );
  }

  idle(PAD) {
    this.entity.currentAnimation = this.entity.IDLE;
  }

  run(PAD) {
    this.entity.currentAnimation = this.entity.RUN;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -3.5 : 3.5;
  }

  runShoot(PAD) {
    this.entity.currentAnimation = this.entity.RUN_SHOOT;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -3.5 : 3.5;
  }

  shootDiagonalUp(PAD) {
    this.entity.currentAnimation = this.entity.SHOOT_DIAGONAL_UP;
    this.flipX = PAD.btns & Pads.LEFT ? true : false;
    this.moveX = this.flipX ? -3.5 : 3.5;
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

    else if (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT || PAD.lx < -halfAnalogic || PAD.lx > halfAnalogic) {
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
