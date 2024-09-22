console.log("Title Script Loaded!!!");
console.log("Loading Some Things ...");
std.loadScript("host:/Modules/outline.js");
std.loadScript("host:/Scripts/SubScripts/Audio.js");
console.log("Some Things Were Loaded!!!");

const background = new Image("host:/Assets/Textures/title screen/Background/bg.png");
const images = [];
for (let i = 1; i <= 22; i++) {
    images.push(new Image(`host:/Assets/Textures/title screen/Cuphead and Mugman/${i}.png`));
}

const font = new Font("host:/Assets/Font/bold.ttf");

const fontOutline = new FontOutline(font);

const outlineColor = Color.new(0, 0, 0, 200);

var free_mem
var free_vram
var ram_usage = System.getMemoryStats()

const red_t = Color.new(255, 255, 255, 100)


Sound.play(audio, audioSlot);
Sound.repeat(true, audioSlot);

//const fontDefault = new Font()
//fontDefault.color = red_t
//fontDefault.scale = Math.fround(1);

const overlayImages = [];
for (let i = 1; i <= 20; i++) {
    overlayImages.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
}

const transitionImages = [];
for (let i = 1; i <= 15; i++) {
    transitionImages.push(new Image(`host:/Assets/Textures/Transition/${i}.png`));
}



font.scale = 0.8;
const yellow = Color.new(255, 255, 0);
font.color = yellow;

let currentIndex = 0;
let direction = 1;
let lastUpdateTime = Date.now();
const animationSpeed = 30;

let overlayIndex = 0;
let overlayDirection = 1;
let lastOverlayUpdateTime = Date.now();
const overlayAnimationSpeed = 40;

let transitionIndex = 0;
let transitionActive = false;
let transitionCompleted = false;
let lastTransitionUpdateTime = Date.now();
const transitionAnimationSpeed = 25;
let showBlackScreen = false;



let showText = true;
const textBlinkSpeed = 500;
let lastBlinkTime = Date.now();

let isScriptRunning = true;
let intervalId;

let texts = {};  

std.loadScript("host:/Scripts/SubScripts/Languageforscripts.js");


function delete_images() {
    for (let i = 0; i < images.length; i++) {
        images[i] = null;
    }
    
    for (let i = 0; i < overlayImages.length; i++) {
        overlayImages[i] = null;
    }
    
    for (let i = 0; i < transitionImages.length; i++) {
        transitionImages[i] = null;
    }
    
    if (typeof std.gc === 'function') {
        std.gc();
    }
}

function startAnimation() {
    intervalId = os.setInterval(() => {
        if (!isScriptRunning) {
            os.clearInterval(intervalId);
            delete_images();
            return;
        }

        const currentTime = Date.now();

        const PAD = Pads.get(0);
        if (PAD.btns & Pads.CROSS) {
            if (!transitionActive) {
                transitionActive = true;
                transitionIndex = 0;
                transitionCompleted = false;
                showBlackScreen = false;
            }
        }

        if (currentTime - lastUpdateTime >= animationSpeed) {
            currentIndex += direction;

            if (currentIndex >= images.length || currentIndex < 0) {
                direction *= -1;
                currentIndex += direction;
            }

            lastUpdateTime = currentTime;
        }

        if (currentTime - lastOverlayUpdateTime >= overlayAnimationSpeed) {
            overlayIndex += overlayDirection;

            if (overlayIndex >= overlayImages.length || overlayIndex < 0) {
                overlayDirection *= -1;
                overlayIndex += overlayDirection;
            }

            lastOverlayUpdateTime = currentTime;
        }

        if (transitionActive && currentTime - lastTransitionUpdateTime >= transitionAnimationSpeed) {
            if (!transitionCompleted) {
                transitionIndex++;
                if (transitionIndex >= transitionImages.length) {
                    transitionCompleted = true;
                    transitionIndex = transitionImages.length - 1;
                    showBlackScreen = true;
                }
                lastTransitionUpdateTime = currentTime;
            }
        }

        if (currentTime - lastBlinkTime >= textBlinkSpeed) {
            showText = !showText;
            lastBlinkTime = currentTime;
        }

        Screen.clear();

        if (showBlackScreen) {
            isScriptRunning = false;
            delete_images();
            Screen.clear();
            console.log("Loading Menu Script...");
            std.loadScript("host:/Scripts/menu.js");
            os.clearInterval(intervalId);
            return;
        } else {
            background.draw(0, 0);
            images[currentIndex].draw(5, 95);

            if (transitionActive) {
                const transitionImage = transitionImages[transitionIndex];
                transitionImage.width = 640;
                transitionImage.height = 448;
                transitionImage.draw(0, 0);
            }

            const text = texts["press_any_button"] || "Press any Button";
            const estimatedCharWidth = 13;
            const textWidth = text.length * estimatedCharWidth;
            const centerX = (640 - textWidth) / 2; 

            if (showText) {
                fontOutline.print(centerX, 400.0, text, 1, outlineColor);
            }
        }
        overlayImages[overlayIndex].draw(0, 0);


        Screen.flip();
    }, 0);
}

loadLanguage(); 
startAnimation();
