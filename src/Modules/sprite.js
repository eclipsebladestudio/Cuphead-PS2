import { Timer } from "./timer.js";

let spritesheets = {};

export class Sprite {

  spritesheet;

  frames = 0;
  currentFrame = 1;

  reverse = false;
  inReverse = false;

  images = [];

  constructor(spritesheetPath, x, y, jumpers, reverse) {

    this.x = x;
    this.y = y;

    this.reverse = reverse;

    if (!spritesheets[spritesheetPath]) {

      spritesheets[spritesheetPath] = new Image(spritesheetPath);      
    }

    this.spritesheet = spritesheets[spritesheetPath];

    jumpers.forEach(jumper => {

      this.frames += jumper.imagesLength;

      for (let i = 0; i < jumper.imagesLength; i++) {

        this.images.push({

          x: jumper.imageOffsetX + (i * jumper.widthPerImage),
          y: jumper.imageOffsetY,

          offsetX: jumper.offsetY == undefined ? 0 : jumper.offsetX,
          offsetY: jumper.offsetY == undefined ? 0 : jumper.offsetY,

          imagesLength: jumper.imagesLength,

          widthPerImage: jumper.widthPerImage,
          heightPerImage: jumper.heightPerImage,

          });
        }
    })
  }

  update() {

    this.currentFrame += this.inReverse ? -1 : 1;
        
    if (this.currentFrame > this.frames) {

        if (!this.reverse) {

            this.currentFrame = 1;
        }
        else {

          this.inReverse = true;
          this.currentFrame = this.frames;
        }

    }
    else if (this.currentFrame < 1) {

        this.inReverse = false;
        this.currentFrame++;
    }
        
  }

  draw() {

    const frame = this.images[this.currentFrame - 1];

    this.spritesheet.width = (frame.widthPerImage * frame.imagesLength) / frame.imagesLength;
    this.spritesheet.height = (frame.heightPerImage * frame.imagesLength) / frame.imagesLength;

    this.spritesheet.startx = frame.x;
    this.spritesheet.endx = frame.x + frame.widthPerImage;

    this.spritesheet.starty = frame.y;
    this.spritesheet.endy = frame.y + frame.heightPerImage;

    this.spritesheet.draw(this.x + frame.offsetX, this.y + frame.offsetY);

  }

  free() {

    this.spritesheet = null;
  }
}

export function freeSpritesheets() {
    
  std.gc();
}
