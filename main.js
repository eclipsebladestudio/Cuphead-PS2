std.reload("host:/src/Scenes/Elder Kettle/main.js")

import { FadeIn, FadeOut } from "./src/Modules/fade.js";

const introImage = new Image("host:/src/Logo/LOGOt.png");
const mdhrAnimationSpeed = 34;

const fadeOut = new FadeOut('screen', 2, 255, false);  
const fadeIn = new FadeIn('screen', 0, 255, false);  

const audio = Sound.load("host:/src/Music/logo.wav");
const audioSlot = 0;

let mdhrImages = [];
let currentMdhrIndex = 0;
let lastMdhrUpdateTime = 0;
let phase = 0; 
let audioPlayed = false;

let FX2 = [];

const fadeInLogo = new FadeIn(introImage, 3, 85); 
const fadeOutLogo = new FadeOut(introImage, 4, 85); 



const last = new Image("host:/src/Scenes/MDHR/100.png");
const lastfade = new FadeOut(last, 4, 100); 

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;


function loadImages(path) {
    const animations = [];
    System.listDir(path).forEach(file => {
  
        if (file.name.endsWith('.png')) {
            animations.push(file.name); 
        }
    });

    animations.sort((a, b) => {
   
        const numA = parseInt(a.replace('.png', ''));
        const numB = parseInt(b.replace('.png', ''));
        return numA - numB; 
    });
 
    const loadedImages = animations.map(fileName => new Image(path + "/" + fileName));
    return loadedImages;
}

mdhrImages = loadImages("host:/src/Scenes/MDHR");
FX2 = loadImages("host:/src/Scenes/ScreenFX");

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

function showIntro() {
    if (phase === 0) {
        fadeInLogo.play();
        if (!fadeInLogo.isDrawing) {
            phase = 1;
        }
    } else if (phase === 1) {
        fadeOutLogo.play();
        if (!fadeOutLogo.isDrawing) {
            currentMdhrIndex = 0; 
            phase = 2;
        }
    }
}

function showMdhrSequence() {
    if (!audioPlayed) {
        Sound.play(audio, audioSlot);
        audioPlayed = true;
    }

    const currentTime = Date.now();
    if (currentTime - lastMdhrUpdateTime >= mdhrAnimationSpeed) {
        
        if (!fadeOut.isDrawing) {
            currentMdhrIndex++;
        }
        lastMdhrUpdateTime = currentTime;
    }

    if (currentMdhrIndex < mdhrImages.length) {
        mdhrImages[currentMdhrIndex].draw(0, 0);
    } else {
        lastfade.play();
        phase = 3; 
    }
}

Screen.display(() => {

    if (phase < 2) {
        showIntro();
    } else if (phase === 2) {
        showMdhrSequence();
        fadeOut.play();
        updateFX2();
    } else if (phase === 3) {
        if (lastfade.isDrawing) {
            lastfade.play();
        } else {
            Sound.pause(audio, audioSlot);
            std.reload("host:/src/Scenes/Menu/title.js"); 
        }
    }
});  