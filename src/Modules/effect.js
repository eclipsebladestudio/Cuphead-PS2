import { Sprite } from "./sprite.js";
import { Timer } from "./timer.js";

export class Effect {

  constructor(sprite, fps) {

    this.active = true;
    this.sprite = sprite;
    this.fps = 1000 / fps;
    this.timer = new Timer();
    this.x = 0;
    this.y = 0;
  }

  update() {

    if (!this.active) {
      return;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    if (this.timer.get() >= this.fps) {
      this.sprite.update();
      this.timer.reset();
    }

    if (this.onUpdate != undefined) {
      this.onUpdate();
    } 
  }

  draw() {

    if (!this.active) {
      return;
    }

    this.sprite.draw();
   }
}