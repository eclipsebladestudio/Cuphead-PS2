import {
    DASH_DURATION,
    DASH_RELOAD_DURATION,
    DASH_SPEED,
    DASH_TURN_DURATION,
    DUST_EFFECT_INTERVAL,
    RUN_SPEED
} from "../constants/general.js";

export default class PlayerMovementController {
    constructor() {

    }

    update(player, deltaTime) {
        if (!player.stateManager.isIntroFinished) {
            this.executeIntro(player);
            return;
        }

        this.resetPosition(player);
        this.handleStateTransition(player, deltaTime);
    }

    resetPosition(player) {
        player.position.x = 0;
    }

    handleStateTransition(player, deltaTime) {
        const input = player.inputHandler;
        const state = player.stateManager;
        const { isUsingSpecial, isIntroFinished, isDashing } = state;

        if (isUsingSpecial) {
            this.executeSpecialMove(player);
            return;
        }

        if (!isIntroFinished) {
            this.executeIntro(player);
            return;
        }

        if (this.tryStartJump(player, input)) {
            return;
        }

        if (this.tryStartDash(player, input)) {
            return;
        }

        if (state.isJumping && !state.isGrounded) {
            this.applyHorizontalMovement(player, deltaTime);
            player.currentAnimation = this.setAnimation(player, state, input);
            return;
        }

        if (isDashing) {
            this.executeDash(player, deltaTime);
            return;
        }

        if (input.isDucking()) {
            this.handleDucking(player, deltaTime);
            return;
        }

        if (state.isRunning) {
            this.executeRun(player, deltaTime);
            return;
        }

        this.executeIdle(player);
        player.currentAnimation = this.setAnimation(player, state, input);
    }

    setAnimation(player, state, input) {
        const { isJumping, isDashing, isDucking, isShooting, isRunning } = state;

        if (!state.isIntroFinished) return player.INTRO;

        if (state.isUsingSpecial) return player.SPECIAL_GROUND_STRAIGHT;

        if (isJumping && !state.isGrounded) return player.JUMP;

        if (isDashing) {
            return player.startingDash ? player.START_DASH_GROUND : player.DASH_GROUND;
        }

        if (isDucking) {
            if (isShooting) {
                return player.DUCK_SHOOT;
            }
            if (player.duckTurning) return player.DUCK_TURN;
            return player.startingDucking ? player.DUCKING : player.DUCK;
        }

        if (isRunning) {
            if (isShooting) {
                return input.isAimingUp() ? player.RUN_SHOOT_DIAGONAL_UP : player.RUN_SHOOT_STRAIGHT;
            }
            return player.RUN;
        }

        if (isShooting) {
            return input.isAimingUp() ? player.IDLE_SHOOT_UP : player.IDLE_SHOOT_STRAIGHT;
        }

        return player.IDLE;
    }


    tryStartJump(player, input) {
        if (input.jump() && player.stateManager.isGrounded && !player.stateManager.isDucking) {
            player.physics.jump(player);
            player.stateManager.setJumping(true);
            return true;
        }
        return false;
    }

    tryStartDash(player, input) {
        if (input.dash() && player.stateManager.canDash() && player.dashReloadTime.get() >= DASH_RELOAD_DURATION) {
            player.stateManager.setDashing(true);
            player.startingDash = true;
            player.dashDelay.reset();
            player.dashReloadTime.reset();
            return true;
        }
        return false;
    }

    executeIntro(player) {
        player.velocity.y = 0;
        if (player.isLastFrame()) {
            player.stateManager.isIntroFinished = true;
        }
    }


    executeDash(player, deltaTime) {
        const dashProgress = player.dashDelay.get() / DASH_DURATION;
        if (dashProgress > 1) {
            player.stateManager.setDashing(false, player);
            return;
        }

        player.position.x = (player.flipX ? -DASH_SPEED : DASH_SPEED) * deltaTime;

        if (player.isLastFrame() && player.startingDash) {
            player.startingDash = false;
        }

        player.currentAnimation = this.setAnimation(player, player.stateManager, player.inputHandler);
    }

    handleDucking(player, deltaTime) {
        if (!player.startingDucking && !player.stateManager.isDucking) {
            player.startingDucking = true;
            player.stateManager.setDucking(true);
        }

        if (player.startingDucking && player.isLastFrame()) {
            player.startingDucking = false;
        }

        this.handleDuckTurn(player, deltaTime);
        this.handleDuckShooting(player);

        player.currentAnimation = this.setAnimation(player, player.stateManager, player.inputHandler);
    }

    handleDuckTurn(player) {
        if (player.duckTurningTimer.get() >= DASH_TURN_DURATION) {
            player.duckTurning = false;
            player.duckTurningTimer.pause();
            player.duckTurningTimer.reset();
        }

        const newFlipX = player.getPlayerFlipX();
        if (player.flipX !== newFlipX) {
            player.flipX = newFlipX;
            player.duckTurning = true;
            player.duckTurningTimer.resume();
        }
    }

    handleDuckShooting(player) {
        if (!player.stateManager.isShooting) return;
        const bulletX = player.x + (player.flipX ? -30 : 70);
        const bulletY = player.y + 50;
        const direction = player.flipX ? -1 : 1;
        this.shootWithEffect(player, bulletX, bulletY, direction, player.DUCK_SHOOT, 30, 31);
    }

    executeRun(player, deltaTime) {
        this.applyHorizontalMovement(player, deltaTime);
        this.handleRunEffects(player, deltaTime);
        this.handleRunShooting(player);
        player.currentAnimation = this.setAnimation(player, player.stateManager, player.inputHandler);
    }

    applyHorizontalMovement(player, deltaTime) {
        const isMoving = player.inputHandler.isMovingLeft() || player.inputHandler.isMovingRight();
        player.flipX = player.getPlayerFlipX();
        if (isMoving) {
            player.position.x = (player.flipX ? -RUN_SPEED : RUN_SPEED) * deltaTime;
        }
    }

    handleRunEffects(player, deltaTime) {
        if (player.runDustEffectTimer.get() >= DUST_EFFECT_INTERVAL) {
            player.currentRunDustEffectIndex = (player.currentRunDustEffectIndex + 1) % 3;
            const effect = player.runDustEffectsPool[player.currentRunDustEffectIndex];
            effect.active = true;
            effect.x = player.x;
            effect.y = player.y + 41;
            player.runDustEffectTimer.reset();
        }
    }

    handleRunShooting(player) {
        if (!player.stateManager.isShooting) return;
        const randomX = Math.round(Math.random() * 10);
        const randomY = Math.round(Math.random() * 15);
        const direction = player.flipX ? -1 : 1;

        if (player.inputHandler.isAimingUp()) {
            const bulletX = player.x + (player.flipX ? -30 : 88);
            const bulletY = player.y + 6;
            player.weaponSystem.shootDiagonal(bulletX, bulletY, direction, randomX, randomY);
            player.currentAnimation = player.RUN_SHOOT_DIAGONAL_UP;
            player.fingerEffect.x = player.x + (player.flipX ? -28 : 35);
            player.fingerEffect.y = player.y - 2;
            player.effectManager.activateEffect(player.fingerEffect);
            return;
        }

        const bulletX = player.x + (player.flipX ? -30 : 70);
        const bulletY = player.y + 35;
        this.shootWithEffect(player, bulletX, bulletY, direction, player.RUN_SHOOT_STRAIGHT, 34, 17);
    }

    executeIdle(player) {
        if (!player.stateManager.isShooting) return;
        if (player.inputHandler.isAimingUp()) {
            this.executeIdleUpShot(player);
            return;
        }
        const bulletX = player.x + (player.flipX ? -30 : 70);
        const bulletY = player.y + 35;
        const direction = player.flipX ? -1 : 1;
        this.shootWithEffect(player, bulletX, bulletY, direction, player.IDLE_SHOOT_STRAIGHT, 33, 17);
    }

    executeIdleUpShot(player) {
        const randomX = Math.round(Math.random() * 10);
        const randomY = Math.round(Math.random() * 15);
        const bulletX = player.x + (player.flipX ? -30 : 7);
        const bulletY = player.y;
        const shot = player.weaponSystem.shootUp(bulletX, bulletY, randomX, randomY);
        if (shot) {
            player.fingerEffect.x = player.x + (player.flipX ? -18 : 14);
            player.fingerEffect.y = player.y - 25;
            player.effectManager.activateEffect(player.fingerEffect);
        }
    }

    shootWithEffect(player, bulletX, bulletY, direction, animation, effectOffsetX, effectOffsetY) {
        const randomX = Math.round(Math.random() * 10);
        const randomY = Math.round(Math.random() * 15);
        const shot = player.weaponSystem.shootStraight(bulletX, bulletY, direction, randomX, randomY);
        if (shot) {
            player.fingerEffect.x = player.x + (player.flipX ? -effectOffsetX : effectOffsetX);
            player.fingerEffect.y = player.y + effectOffsetY;
            player.effectManager.activateEffect(player.fingerEffect);
        }
    }

    executeSpecialMove(player) {
        if (player.isLastFrame()) {
            player.stateManager.isUsingSpecial = false;
        }
    }
}