import { HALF_ANALOGIC } from "../constants/general.js";
import PlayerControls from "../PlayerControls/index.js";

export default class PlayerInputHandler {
    constructor(playerId = 1) {
        this.pad = null;
        this.playerControls = new PlayerControls(playerId);

        this.buttonMap = {
            "CROSS": Pads.CROSS,
            "SQUARE": Pads.SQUARE,
            "CIRCLE": Pads.CIRCLE,
            "TRIANGLE": Pads.TRIANGLE,
            "L1": Pads.L1,
            "L2": Pads.L2,
            "R1": Pads.R1,
            "R2": Pads.R2,
            "START": Pads.START,
            "SELECT": Pads.SELECT,
            "UP": Pads.UP,
            "DOWN": Pads.DOWN,
            "LEFT": Pads.LEFT,
            "RIGHT": Pads.RIGHT,
            "L3": Pads.L3,
            "R3": Pads.R3
        };
    }

    setPad(pad) {
        this.pad = pad;
    }

    update() {
        if (!this.pad) return;

        const axisX = this.playerControls.getAxisX() || "lx";
        const axisY = this.playerControls.getAxisY() || "ly";

        this.pad[axisX] = Pads.getAxis(this.pad.port, axisX);
        this.pad[axisY] = Pads.getAxis(this.pad.port, axisY);
    }

    isButtonPressed(configKey) {
        let btnName;

        switch(configKey) {
            case "btn_jump":
                btnName = this.playerControls.getJumpButton();
                break;
            case "btn_shoot":
                btnName = this.playerControls.getShootButton();
                break;
            case "btn_dash":
                btnName = this.playerControls.getDashButton();
                break;
            case "btn_ex":
                btnName = this.playerControls.getExButton();
                break;
            case "btn_lock":
                btnName = this.playerControls.getLockButton();
                break;
            case "btn_wpn":
                btnName = this.playerControls.getWpnButton();
                break;
            case "btn_pause":
                btnName = this.playerControls.getPauseButton();
                break;
            case "btn_up":
                btnName = this.playerControls.getUpButton();
                break;
            case "btn_down":
                btnName = this.playerControls.getDownButton();
                break;
            case "btn_left":
                btnName = this.playerControls.getLeftButton();
                break;
            case "btn_right":
                btnName = this.playerControls.getRightButton();
                break;
            default:
                return false;
        }

        if (!btnName || btnName === "NaN") return false;

        const buttonConstant = this.buttonMap[btnName];
        return buttonConstant !== undefined && (this.pad.btns & buttonConstant);
    }

    isMovingLeft() {
        const axis = this.playerControls.getAxisX() || "lx";
        const value = this.playerControls.getAxisXInvert() ? -this.pad[axis] : this.pad[axis];
        return (this.isButtonPressed("btn_left")) || (value < -HALF_ANALOGIC);
    }

    isMovingRight() {
        const axis = this.playerControls.getAxisX() || "lx";
        const value = this.playerControls.getAxisXInvert() ? -this.pad[axis] : this.pad[axis];
        return (this.isButtonPressed("btn_right")) || (value > HALF_ANALOGIC);
    }

    isDucking() {
        const axis = this.playerControls.getAxisY() || "ly";
        const value = this.playerControls.getAxisYInvert() ? -this.pad[axis] : this.pad[axis];
        return this.isButtonPressed("btn_down") || (value > HALF_ANALOGIC);
    }

    isAimingUp() {
        const axis = this.playerControls.getAxisY() || "ly";
        const value = this.playerControls.getAxisYInvert() ? -this.pad[axis] : this.pad[axis];
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