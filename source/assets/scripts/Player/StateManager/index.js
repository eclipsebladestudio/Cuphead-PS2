export default class PlayerStateManager {
    constructor() {
        this.isJumping = false;
        this.isGrounded = true;
        this.isRunning = false;
        this.isDucking = false;
        this.isDashing = false;
        this.isShooting = false;
        this.isUsingSpecial = false;
        this.isIntroFinished = false;
        this.isAlive = true;

        this.states = {
            idle: {
                enter: () => this.resetMovementStates(),
                update: () => {},
                exit: () => {}
            },
            running: {
                enter: () => {
                    this.isRunning = true;
                    this.isDucking = false;
                    this.isDashing = false;
                },
                update: () => {},
                exit: () => {}
            },
            jumping: {
                enter: () => {
                    this.isJumping = true;
                    this.isGrounded = false;
                    this.isDucking = false;
                    this.isRunning = false;
                },
                update: () => {},
                exit: () => {}
            },
            dashing: {
                enter: () => {
                    this.isDashing = true;
                    this.isRunning = false;
                    this.isDucking = false;
                    this.isJumping = false;
                },
                update: () => {},
                exit: () => {}
            },
            ducking: {
                enter: () => {
                    this.isDucking = true;
                    this.isRunning = false;
                    this.isDashing = false;
                    this.isJumping = false;
                },
                update: () => {},
                exit: () => {}
            },
            shooting: {
                enter: () => {
                    this.isShooting = true;
                },
                update: () => {},
                exit: () => {
                    this.isShooting = false;
                }
            },
            special: {
                enter: () => {
                    this.isUsingSpecial = true;
                    this.resetMovementStates();
                },
                update: () => {},
                exit: () => {
                    this.isUsingSpecial = false;
                }
            },
            intro: {
                enter: () => {
                    this.isIntroFinished = false;
                    this.resetMovementStates();
                },
                update: () => {},
                exit: () => {
                    this.isIntroFinished = true;
                }
            }
        };

        this.currentState = 'intro';
    }

    transitionTo(state, player) {
        if (!this.states[state] || !this.canTransitionTo(state)) {
            return false;
        }

        this.states[this.currentState].exit?.(player);
        this.currentState = state;
        this.states[state].enter(player);
        return true;
    }

    update(inputHandler, player) {
        this.states[this.currentState].update(inputHandler, player);
        this.updateMovementStates(inputHandler);
        this.updateActionStates(inputHandler);
    }

    updateMovementStates(inputHandler) {
        if (!this.isIntroFinished) return;
        const isMoving = inputHandler.isMovingLeft() || inputHandler.isMovingRight();
        const isDucking = inputHandler.isDucking();

        if (isDucking && this.canDuck()) {
            this.transitionTo('ducking', null);
        } else if (isMoving && !this.isDashing && !this.isJumping && this.isGrounded) {
            this.transitionTo('running', null);
        } else if (!isMoving && !this.isDashing && !this.isJumping && this.currentState !== 'intro') {
            this.transitionTo('idle', null);
        }
    }

    updateActionStates(inputHandler) {
        const isShooting = inputHandler.isShooting();
        if (isShooting && this.canShoot() && !this.isShooting) {
            this.states.shooting.enter();
        } else if (!isShooting && this.isShooting) {
            this.states.shooting.exit();
        }
    }

    resetMovementStates() {
        this.isRunning = false;
        this.isDashing = false;
        this.isDucking = false;
        this.isJumping = false;
    }

    setJumping(value) {
        if (value && this.canJump()) {
            this.transitionTo('jumping', null);
        } else if (!value) {
            this.isJumping = false;
        }
    }

    setGrounded(value) {
        this.isGrounded = value;
        if (value) {
            this.isJumping = false;
            if (this.currentState === 'jumping') {
                this.transitionTo('idle', null);
            }
        }
    }

    setDashing(value, player = null) {
        if (value && this.canDash()) {
            this.transitionTo('dashing', player);
        } else if (!value) {
            this.isDashing = false;
            if (this.currentState === 'dashing') {
                if (!this.isGrounded) {
                    this.setJumping(true);
                }
                else if (player && (player.inputHandler.isMovingLeft() || player.inputHandler.isMovingRight())) {
                    this.transitionTo('running', player);
                }
                else {
                    this.transitionTo('idle', player);
                }
            }
        }
    }

    setDucking(value) {
        if (value && this.canDuck()) {
            this.transitionTo('ducking', null);
        } else if (!value) {
            this.isDucking = false;
            if (this.currentState === 'ducking') {
                this.transitionTo('idle', null);
            }
        }
    }

    setUsingSpecial(value) {
        if (value) {
            this.transitionTo('special', null);
        } else {
            this.isUsingSpecial = false;
            if (this.currentState === 'special') {
                this.transitionTo('idle', null);
            }
        }
    }

    canDash() {
        return !this.isDashing && !this.isDucking && this.isAlive;
    }

    canShoot() {
        return !this.isDashing && this.isAlive;
    }

    canJump() {
        return this.isGrounded && !this.isDashing && !this.isDucking && this.isAlive;
    }

    canDuck() {
        return !this.isJumping && !this.isDashing && this.isAlive;
    }

    canTransitionTo(state) {
        switch (state) {
            case 'jumping':
                return this.canJump();
            case 'dashing':
                return this.canDash();
            case 'ducking':
                return this.canDuck();
            case 'shooting':
                return this.canShoot();
            case 'special':
                return !this.isUsingSpecial && this.isAlive;
            case 'intro':
                return !this.isIntroFinished;
            case 'idle':
            case 'running':
                return true;
            default:
                return false;
        }
    }
}