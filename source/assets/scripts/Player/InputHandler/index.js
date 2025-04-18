import {HALF_ANALOGIC} from "../constants/general.js";

export default class PlayerInputHandler {
    constructor() {
        this.pad = null;
    }

    setPad(pad) {
        this.pad = pad;
    }

    isMovingLeft() {
        return (this.pad.btns & Pads.LEFT) || (this.pad.lx < -HALF_ANALOGIC);
    }

    isMovingRight(){
        return (this.pad.btns & Pads.RIGHT) || (this.pad.lx > HALF_ANALOGIC);
    }

    isShooting(){
        return this.pad.btns & Pads.SQUARE
    }

    isDucking(){
        return this.pad.btns & Pads.DOWN || this.pad.ly > HALF_ANALOGIC;
    }

    isAimingUp(){
        return (this.pad.btns & Pads.UP) || (this.pad.ly < -HALF_ANALOGIC)
    }

    dash(){
        return this.pad.btns & Pads.L1
    }

    jump() {
        return this.pad.btns & Pads.CROSS
    }

}