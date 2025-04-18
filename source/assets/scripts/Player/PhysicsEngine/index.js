export default class PlayerPhysicsEngine {
    constructor(physicsConstants) {
        this.gravity = physicsConstants.gravity;
        this.jumpStrength = physicsConstants.jumpStrength;
        this.maxVelocityY = physicsConstants.maxVelocityY;
    }
    applyGravity(entity, deltaTime) {
        if (entity.velocity.y < this.maxVelocityY) {
            entity.velocity.y += this.gravity * deltaTime;
        }
    }

    jump(entity) {
        if (entity.stateManager.isGrounded && !entity.stateManager.isJumping) {
            entity.velocity.y = this.jumpStrength;
            entity.stateManager.isJumping = true;
            entity.stateManager.isGrounded = false;
            return true;
        }
        return false;
    }
}