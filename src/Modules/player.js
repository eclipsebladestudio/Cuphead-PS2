import { Entity } from "./entity.js"
import { Sprite } from "./sprite.js"

const halfAnalogic = 64

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

    this.entity.setAnimations(["IDLE", "RUN"]);

    os.chdir("host:/src");

    this.entity.index(this.entity.IDLE, new Sprite(
      "Player/sheet1.png",
      x,
      y,
      [{imagesLength: 5, imageOffsetX: 0, imageOffsetY: 412, widthPerImage: 54, heightPerImage: 82}],
      true),
    );

    this.entity.index(this.entity.RUN, new Sprite(
      "Player/sheet3.png",
      x,
      y,
      [{imagesLength: 7, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 70, heightPerImage: 88, offsetX : -5, offsetY: -2 },
       {imagesLength: 7, imageOffsetX: 0, imageOffsetY: 88, widthPerImage: 70, heightPerImage: 88, offsetX : -5, offsetY: -2 },
       {imagesLength: 2, imageOffsetX: 0, imageOffsetY: 176, widthPerImage: 70, heightPerImage: 88, offsetX : -5, offsetY: -2 }],
      false),
    );

  }

  idle(PAD) {

    this.entity.currentAnimation = this.entity.IDLE
  }

  run(PAD) {

    this.entity.currentAnimation = this.entity.RUN

    this.flipX = (PAD.btns & Pads.LEFT ? true : false) || PAD.lx < -64;

    this.moveX = this.entity.animations[this.entity.currentAnimation].sprite.flipX ? -3.5f : 3.5f;

  }

  move(speed, camera) {

    const PAD = Pads.get();

    this.isRunning = false;

    this.moveX = 0;

    if (PAD.btns & Pads.LEFT || PAD.btns & Pads.RIGHT || PAD.lx < -halfAnalogic || PAD.lx > halfAnalogic) { 
                
      this.isRunning = true;
      this.run(PAD);
    }
    else {

      this.idle(PAD)
    }

    this.entity.x += this.moveX

    this.entity.animations[this.entity.currentAnimation].sprite.x = this.entity.x

    this.entity.animations[this.entity.currentAnimation].sprite.flipX = this.flipX
   
    this.entity.animate(this.entity.currentAnimation, 24, camera);
  }
}
