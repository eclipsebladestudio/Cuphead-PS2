const screenfxFrames = [];
const screenfxFrameSpeed = 33.3;
let screenfxCurrentFrame = 0;
let screenfxLastUpdate = Date.now();

for (let i = 1; i <= 22; i++) {
    const fx = new Image(`source/assets/scenes/screen_fx/${i}.png`);
    fx.width = 640;
    fx.height = 448;
    fx.color = Color.new(255, 255, 255, 255)
    screenfxFrames.push(fx);
}

export function drawScreenFX() {
    const now = Date.now();
    if (now - screenfxLastUpdate >= screenfxFrameSpeed) {
        screenfxCurrentFrame++;
        screenfxLastUpdate = now;

        if (screenfxCurrentFrame >= screenfxFrames.length) {
            screenfxCurrentFrame = 0;
        }
    }

    screenfxFrames[screenfxCurrentFrame].draw(0, 0);
}
