import {Timer} from "../../timer.js";
import {Bullet} from "../../bullet.js";

export default class PlayerWeaponSystem {
    constructor(shootDelay, shootSpeed) {
        this.bullets = [];
        this.shootDelay = new Timer();
        this.shootSpeed = shootSpeed;
        this.delay = shootDelay;
    }

    shootStraight(x, y, direction, randomX = 0, randomY = 0) {
        if (this.shootDelay.get() >= this.delay) {
            this.bullets.push(new Bullet(
                x + randomX,
                y + randomY,
                direction * this.shootSpeed,
                0,
                30,
                5,
                0,
                5
            ));
            this.shootDelay.reset();
            return true;
        }
        return false;
    }

    shootUp(x, y, randomX = 0, randomY = 0) {
        if (this.shootDelay.get() >= this.delay) {
            this.bullets.push(new Bullet(
                x + randomX,
                y + randomY,
                0,
                -this.shootSpeed,
                5,
                30,
                90,
                5
            ));
            this.shootDelay.reset();
            return true;
        }
        return false;
    }

    shootDiagonal(x, y, direction, randomX = 0, randomY = 0) {
        if (this.shootDelay.get() >= this.delay) {
            this.bullets.push(new Bullet(
                x + randomX,
                y + randomY,
                direction * this.shootSpeed,
                -this.shootSpeed,
                10,
                10,
                direction * 45,
                5
            ));
            this.shootDelay.reset();
            return true;
        }
        return false;
    }

    updateBullets(playerX, playerY) {
        this.bullets.forEach(bullet => bullet.update(playerX, playerY, []));
    }
}