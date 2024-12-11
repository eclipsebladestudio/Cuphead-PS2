
import { FadeIn, FadeOut } from "/src/Modules/fade.js";

["host:/src/Modules/outline.js", 
 "host:/src/Configuration Files/Audio.js"].forEach(script => std.loadScript(script));

const fadeOut = new FadeOut('screen', 5, 255, false);  


const background = new Image("host:/src/Scenes/Menu/Textures/title screen/Background/bg.png");
const images = Array.from({ length: 22 }, (_, i) => new Image(`host:/src/Scenes/Menu/Textures/title screen/Cuphead and Mugman/${i + 1}.png`));

const font = new Font("host:/src/Font/bold.ttf");
const fontOutline = new FontOutline(font);
font.scale = 0.8;
font.color = Color.new(255, 255, 0);

const outlineColor = Color.new(0, 0, 0, 200);

const overlayImages = Array.from({ length: 20 }, (_, i) => new Image(`host:/src/Scenes/ScreenFX/${i + 1}.png`));
const transitionImages = Array.from({ length: 15 }, (_, i) => new Image(`host:/src/Scenes/Transition/${i + 1}.png`));

Sound.play(audio, audioSlot);
Sound.repeat(true, audioSlot);

let currentIndex = 0;
let direction = 1;
const animationSpeed = 30;

let overlayIndex = 0;
let overlayDirection = 1;
const overlayAnimationSpeed = 40;

let transitionIndex = 0;
let transitionActive = false;
let transitionCompleted = false;
const transitionAnimationSpeed = 25;

let showBlackScreen = false;

let showText = true;
const textBlinkSpeed = 500;
let lastBlinkTime = Date.now();

let isScriptRunning = true;
let intervalId;

const now = Date.now();
let lastUpdateTime = now;
let lastOverlayUpdateTime = now;
let lastTransitionUpdateTime = now;

std.loadScript("host:/src/Configuration Files/Languageforscripts.js");


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
    
    std.gc();
}

Screen.display(() => {
    const currentTime = Date.now();
    const PAD = Pads.get(0);

    if (PAD.btns && !transitionActive) {
        transitionActive = true;
        transitionIndex = 0;
        transitionCompleted = false;
        showBlackScreen = false;
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

    if (showBlackScreen) {
        delete_images();
        std.loadScript("host:/src/Scenes/Menu/menu.js");
        return;
    }

    background.draw(0, 0);
    images[currentIndex].draw(5, 95);

    if (transitionActive) {
        const transitionImage = transitionImages[transitionIndex];
        transitionImage.width = 640;
        transitionImage.height = 448;
        transitionImage.draw(0, 0);
    }

    const text = texts["press_any_button"] || "Press any Button";
    const textWidth = text.length * 13; 
    const centerX = (640 - textWidth) / 2;
    if (showText) {
        fontOutline.print(centerX, 400.0, text, 1, outlineColor);
    }


        fadeOut.play();
        

    overlayImages[overlayIndex].draw(0, 0);
});
