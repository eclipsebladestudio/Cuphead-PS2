
import { getConfig } from "source/assets/scripts/config.js"; 
import { HALF_ANALOGIC } from "../constants/general.js";

export default class PlayerInputHandler {
    constructor(playerId = 1) {
        this.pad = null;
        this.config = this.loadControlConfig(playerId);
    }

    loadControlConfig(playerId) {
        const section = "Gamepad";
        const prefix = `p${playerId}_`;

        const get = (key, def = null) => getConfig(section, prefix + key, def);

        return {
            btn_jump: get("btn_jump"),
            btn_shoot: get("btn_shoot"),
            btn_dash: get("btn_dash"),
            btn_ex: get("btn_ex"),
            btn_lock: get("btn_lock"),
            btn_wpn: get("btn_wpn"),
            btn_pause: get("btn_pause"),
            btn_up: get("btn_up"),
            btn_down: get("btn_down"),
            btn_left: get("btn_left"),
            btn_right: get("btn_right"),
            axis_x: get("axis_x", "lx"),
            axis_y: get("axis_y", "ly"),
            axis_x_invert: get("axis_x_invert", false),
            axis_y_invert: get("axis_y_invert", false),
        };
    }

    setPad(pad) {
        this.pad = pad;
    }

    update() {
        if (!this.pad) return;
    
        const axisX = this.config.axis_x || "lx";
        const axisY = this.config.axis_y || "ly";
    
        this.pad[axisX] = Pads.getAxis(this.pad.port, axisX);
        this.pad[axisY] = Pads.getAxis(this.pad.port, axisY);
    }
    

    isButtonPressed(configKey) {
        const btn = this.config[configKey];
        return btn && this.pad.btns & Pads[btn];
    }

    isMovingLeft() {
        const axis = this.config.axis_x || "lx";
        const value = this.config.axis_x_invert ? -this.pad[axis] : this.pad[axis];
        return (this.isButtonPressed("btn_left")) || (value < -HALF_ANALOGIC);
    }

    isMovingRight() {
        const axis = this.config.axis_x || "lx";
        const value = this.config.axis_x_invert ? -this.pad[axis] : this.pad[axis];
        return (this.isButtonPressed("btn_right")) || (value > HALF_ANALOGIC);
    }

    isDucking() {
        const axis = this.config.axis_y || "ly";
        const value = this.config.axis_y_invert ? -this.pad[axis] : this.pad[axis];
        return this.isButtonPressed("btn_down") || (value > HALF_ANALOGIC);
    }

    isAimingUp() {
        const axis = this.config.axis_y || "ly";
        const value = this.config.axis_y_invert ? -this.pad[axis] : this.pad[axis];
        return this.isButtonPressed("btn_up") || (value < -HALF_ANALOGIC);
    }

    isShooting() {
        return this.isButtonPressed("btn_shoot");
    }

    dash() {
        return this.isButtonPressed("btn_dash");
    }

    jump() {
        return this.isButtonPressed("btn_jump");
    }

    pause() {
        return this.isButtonPressed("btn_pause");
    }

    lock() {
        return this.isButtonPressed("btn_lock");
    }

    weaponSwitch() {
        return this.isButtonPressed("btn_wpn");
    }

    exAttack() {
        return this.isButtonPressed("btn_ex");
    }
}
