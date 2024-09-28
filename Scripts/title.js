["host:/Modules/outline.js", 
 "host:/Scripts/SubScripts/Audio.js"].forEach(script => std.loadScript(script));


const background = new Image("host:/Assets/Textures/title screen/Background/bg.png");
const images = Array.from({ length: 22 }, (_, i) => new Image(`host:/Assets/Textures/title screen/Cuphead and Mugman/${i + 1}.png`));

const font = new Font("host:/Assets/Font/bold.ttf");
const fontOutline = new FontOutline(font);
font.scale = 0.8;
font.color = Color.new(255, 255, 0);

const red_t = Color.new(255, 0, 0, 100);
const fontDefault = new Font("host:/Assets/Font/bold.ttf");
fontDefault.color = red_t;
fontDefault.scale = Math.fround(1);

const outlineColor = Color.new(0, 0, 0, 200);

const overlayImages = Array.from({ length: 20 }, (_, i) => new Image(`host:/Assets/Textures/FX/${i + 1}.png`));
const transitionImages = Array.from({ length: 15 }, (_, i) => new Image(`host:/Assets/Textures/Transition/${i + 1}.png`));

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
        std.loadScript("host:/Scripts/menu.js");
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

    const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

    overlayImages[overlayIndex].draw(0, 0);
});
