import { getSceneToLoad } from "../../../SceneManager.js";
import { FadeIn, FadeOut } from "/src/Modules/fade.js";

const font = new Font("default");
const imageCount = 53; 
const imagePaths = Array.from({ length: imageCount }, (_, i) => `src/Scenes/Hourglass/Animation/${i + 1}.png`);
const images = imagePaths.map(path => new Image(path));

let currentIndex = 0; 
const animationSpeed = 50; 
let lastUpdateTime = Date.now();

const FX2 = [];
for (let i = 1; i <= 20; i++) {
    FX2.push(new Image(`host:/src/Scenes/ScreenFX/${i}.png`));
}

const fadeOut = new FadeOut('screen', 1, 255, false);  
const fadeIn = new FadeIn('screen', 5, 255, false);  

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;

function updateFX2() {
    if (FX2.length > 0) {
        const now = Date.now();
        if (now - lastFX2UpdateTime > FX2AnimationSpeed) {
            FX2Index += FX2Direction;
            if (FX2Index >= FX2.length || FX2Index < 0) {
                FX2Direction *= -1;
                FX2Index += FX2Direction;
            }
            lastFX2UpdateTime = now;
        }
        FX2[FX2Index].draw(0, 0); 
    }
}

let startTime = Date.now();
const reloadTime = 5000; 
const reloadTime2 = 7500; 

Screen.display(() => {
    const currentTime = Date.now();
  
    images[currentIndex].draw(536, 250);

    if (currentTime - lastUpdateTime >= animationSpeed) {
        lastUpdateTime = currentTime;
        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0; 
        }
    }
    updateFX2();

    fadeOut.play()

    if (currentTime - startTime >= reloadTime) {
        fadeIn.play()
    }

    if (currentTime - startTime >= reloadTime2) {
        std.reload(getSceneToLoad());
    }
});
