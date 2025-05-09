import { Entity } from "../Entity/index.js";
import { Effect } from "../effect.js";
import { Sprite } from "../sprite.js";
import { Timer } from "../timer.js";
import { PLAYER_PHYSICS } from "./constants/physics.js";
import { SHOOT_SPEED, SHOOT_DELAY, DUST_EFFECT_SPEED } from './constants/general.js';
import PlayerInputHandler from "./InputHandler/index.js";
import PlayerPhysicsEngine from "./PhysicsEngine/index.js";
import PlayerWeaponSystem from "./WeaponSystem/index.js";
import PlayerEffectsManager from "./EffectManager/index.js";
import PlayerMovementController from "./MovementController/index.js";
import PlayerStateManager from "./StateManager/index.js";
import { PLAYER_ANIMATIONS } from "./constants/animations.js";

export default class Player extends Entity {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.initializeProperties();
        this.setupEffects();
        this.setupAnimations();
        this.currentAnimation = this.INTRO;
    }

    initializeProperties() {
        this.fps = 24;
        this.flipX = false;
        this.flipY = false;

        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };

        this.constraints = {
            minX: null,
            maxX: null,
            maxY: this.y,
            minY: this.y - 100
        };

        this.inputHandler = new PlayerInputHandler();
        this.physics = new PlayerPhysicsEngine(PLAYER_PHYSICS);
        this.weaponSystem = new PlayerWeaponSystem(SHOOT_DELAY, SHOOT_SPEED);
        this.effectManager = new PlayerEffectsManager();
        this.movementController = new PlayerMovementController();
        this.stateManager = new PlayerStateManager();

        this.dashDelay = new Timer();
        this.dashReloadTime = new Timer();
        this.startingDash = false;
        this.duckTurning = false;
        this.startingDucking = false;
        this.duckTurningTimer = new Timer();
        this.duckTurningTimer.pause();
        this.introTimer = new Timer();
        this.currentRunDustEffectIndex = -1;
        this.runDustEffectTimer = new Timer();
    }

    setupAnimations() {
        this.animationNames = [
            "INTRO", "JUMP", "IDLE", "IDLE_SHOOT_STRAIGHT", "IDLE_SHOOT_UP",
            "RUN", "RUN_SHOOT_STRAIGHT", "RUN_SHOOT_DIAGONAL_UP",
            "START_DASH_GROUND", "DASH_GROUND", "DUCK", "DUCK_TURN",
            "DUCK_SHOOT", "DUCKING", "SPECIAL_GROUND_STRAIGHT"
        ];

        this.setAnimations(this.animationNames);

        PLAYER_ANIMATIONS.forEach(animation => {
            this.index(this[animation.name], new Sprite(
                animation.spritesheetPath,
                this.x,
                this.y,
                animation.jumpers,
                animation.reverse
            ));
        });
    }

    setupEffects() {
        this.runDustEffectsPool = [];
        for (let i = 0; i < 3; i++) {
            const effect = this.createDustEffect(
                i * 103, 0, 9, 50, i * 103, 50, 5, 52
            );
            effect.active = false;
            this.runDustEffectsPool.push(effect);
            this.effectManager.addEffect(effect, false);
        }

        this.fingerEffect = new Effect(
            new Sprite(
                "source/assets/player/Finger/finger.png",
                0, 0,
                [
                    { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 0, widthPerImage: 53, heightPerImage: 50 },
                    { imagesLength: 2, imageOffsetX: 0, imageOffsetY: 42, widthPerImage: 53, heightPerImage: 50 }
                ],
                false
            ),
            24
        );

        this.runDustEffectsPool.forEach(effect => {
            effect.onUpdate = () => effect.y -= DUST_EFFECT_SPEED;
        });

        this.effectManager.addEffect(this.fingerEffect, this.stateManager.isShooting);
    }

    createDustEffect(offsetX1, offsetY1, length1, height1, offsetX2, offsetY2, length2, height2) {
        return new Effect(
            new Sprite(
                "source/assets/player/dust_effect.png",
                0, 0,
                [
                    { imagesLength: length1, imageOffsetX: offsetX1, imageOffsetY: offsetY1, widthPerImage: 56, heightPerImage: height1 },
                    { imagesLength: length2, imageOffsetX: offsetX2, imageOffsetY: offsetY2, widthPerImage: 56, heightPerImage: height2 }
                ],
                false
            ),
            24
        );
    }

    getPlayerFlipX() {
        if (this.inputHandler.isMovingLeft()) return true;
        if (this.inputHandler.isMovingRight()) return false;
        return this.flipX;
    }

    isGrounded() {
        return this.y >= this.constraints.maxY;
    }

    update(speed, camera, deltaTime = 1) {
        const PAD = Pads.get();
        this.inputHandler.setPad(PAD);

        this.stateManager.update(this.inputHandler, this);

        if(this.currentAnimation !== this.DASH_GROUND && this.currentAnimation !== this.START_DASH_GROUND){
            this.physics.applyGravity(this, deltaTime);
            this.y += this.velocity.y * deltaTime;
        }

        if (this.isGrounded()) {
            this.y = this.constraints.maxY;
            this.velocity.y = 0;
            this.stateManager.setGrounded(true);
        } else {
            this.stateManager.setGrounded(false);
        }

        this.movementController.update(this, deltaTime);

        this.x += this.position.x * deltaTime;

        if (this.animations[this.currentAnimation]) {
            this.animations[this.currentAnimation].sprite.x = this.x;
            this.animations[this.currentAnimation].sprite.y = this.y;
            this.animations[this.currentAnimation].sprite.flipX = this.flipX;
        }

        camera.y = this.y - 224;

        this.animate(this.currentAnimation, this.fps, camera);

        this.weaponSystem.updateBullets(this.x, this.y, deltaTime);

        this.effectManager.updateAndDraw(this.stateManager.isShooting && !this.stateManager.isJumping, deltaTime);
    }
}