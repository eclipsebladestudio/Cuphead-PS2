import { Sprite } from "source/assets/scripts/sprite.js";

export class ElderKettle {
  constructor() {
    this.spriteTalkA = new Sprite(
      "source/assets/scenes/elder_kettle/elder/talk.png", 
      0, 
      0, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 5, 
          widthPerImage: 86, 
          heightPerImage: 137, 
        },
      ],
      true
    );

    this.spriteTalkB = new Sprite(
      "source/assets/scenes/elder_kettle/elder/talk.png", 
      0, 
      150, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 137, 
          imagesLength: 5, 
          widthPerImage: 86, 
          heightPerImage: 137,
        },
      ],
      true 
    );

    this.spriteTrans = new Sprite(
      "source/assets/scenes/elder_kettle/elder/talk.png", 
      0, 
      300, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 274, 
          imagesLength: 5, 
          widthPerImage: 86, 
          heightPerImage: 137,
        },
      ],
      true 
    );

    this.spriteIdle = new Sprite(
      "source/assets/scenes/elder_kettle/elder/idle.png", 
      0, 
      450, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 4, 
          widthPerImage: 87, 
          heightPerImage: 138, 
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 137, 
          imagesLength: 3, 
          widthPerImage: 87, 
          heightPerImage: 138,
        },
      ],
      true
    );

    this.spritePot = new Sprite(
      "source/assets/scenes/elder_kettle/elder/pot.png", 
      0, 
      600, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 4, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 140, 
          imagesLength: 4, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 280, 
          imagesLength: 4, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 420, 
          imagesLength: 2, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
      ],
      false
    );

    this.spriteOut = new Sprite(
      "source/assets/scenes/elder_kettle/elder/PotHand.png", 
      0, 
      750, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 3, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 140, 
          imagesLength: 3, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
      ],
      true
    );

    this.spriteLoopHand = new Sprite(
      "source/assets/scenes/elder_kettle/elder/PotHand.png", 
      0, 
      900, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 280, 
          imagesLength: 3, 
          widthPerImage: 120, 
          heightPerImage: 140,
        },
      ],
      true
    );

    this.spriteEffectDisappear = new Sprite(
      "source/assets/scenes/elder_kettle/elder/effectDisappear.png", 
      0, 
      1050, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 7, 
          widthPerImage: 43, 
          heightPerImage: 103,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 103, 
          imagesLength: 7, 
          widthPerImage: 43, 
          heightPerImage: 103,
        },
      ],
      true
    );

    this.spriteEffectPuff = new Sprite(
      "source/assets/scenes/elder_kettle/elder/effectpuff.png", 
      0, 
      1200, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 4, 
          widthPerImage: 86, 
          heightPerImage: 86,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 86, 
          imagesLength: 4, 
          widthPerImage: 86, 
          heightPerImage: 86,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 172, 
          imagesLength: 4, 
          widthPerImage: 86, 
          heightPerImage: 86,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 258, 
          imagesLength: 4, 
          widthPerImage: 86, 
          heightPerImage: 86,
        },
      ],
      false
    );

    this.spritePotEffect = new Sprite(
      "source/assets/scenes/elder_kettle/elder/potEffect.png", 
      0, 
      1200, 
      [
        {
          imageOffsetX: 0, 
          imageOffsetY: 0, 
          imagesLength: 5, 
          widthPerImage: 100, 
          heightPerImage: 110,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 110, 
          imagesLength: 5, 
          widthPerImage: 100, 
          heightPerImage: 110,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 220, 
          imagesLength: 5, 
          widthPerImage: 100, 
          heightPerImage: 110,
        },
        {
          imageOffsetX: 0, 
          imageOffsetY: 330, 
          imagesLength: 5, 
          widthPerImage: 100, 
          heightPerImage: 110,
        },
      ],
      false
    );

    this.frameSpeed = 3;  
    this.frameCounter = 0; 
  }

  update() {
    this.frameCounter++;

    if (this.frameCounter >= this.frameSpeed) {
      this.frameCounter = 0;

      this.spriteTalkA.update();
      this.spriteTalkB.update();
      this.spriteTrans.update();
      this.spriteIdle.update(); 
      this.spritePot.update(); 
      this.spriteOut.update(); 
      this.spriteLoopHand.update();
      this.spriteEffectDisappear.update();
      this.spriteEffectPuff.update();
      this.spritePotEffect.update();
    }
  }

  draw(x, y) {
    
    this.spriteIdle.x = x;  
    this.spriteIdle.y = y;
    this.spriteIdle.draw();  

   
  }

  free() {
    this.spriteTalkA.free();
    this.spriteTalkB.free();
    this.spriteTrans.free();
    this.spriteIdle.free();
    this.spritePot.free();
    this.spriteOut.free();
    this.spriteLoopHand.free();
    this.spriteEffectDisappear.free();
    this.spriteEffectPuff.free();
    this.spritePotEffect.free();
  }
}
