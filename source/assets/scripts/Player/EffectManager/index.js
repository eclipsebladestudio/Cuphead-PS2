export default class PlayerEffectsManager {
    constructor() {
        this.effects = [];
    }

    addEffect(effect, alwaysDraw = false) {
        this.effects.push({
            effect,
            alwaysDraw,
            originalActive: effect.active
        });
    }

    updateAndDraw(shouldDrawConditionalEffects = true) {
        this.effects.forEach(({ effect, alwaysDraw, originalActive }) => {
            if (!alwaysDraw) {
                effect.active = originalActive;
            }

            if ((alwaysDraw || shouldDrawConditionalEffects) && effect.active) {
                effect.update();
                effect.draw();
                if (effect.sprite.inLastFrame) {
                    effect.active = false;
                }
            }
        });
    }

    activateEffect(effect, duration = 0) {
        const found = this.effects.find(e => e.effect === effect);
        if (found) {
            found.effect.active = true;
            if (duration > 0) {
                setTimeout(() => {
                    found.effect.active = false;
                }, duration);
            }
        }
    }
}