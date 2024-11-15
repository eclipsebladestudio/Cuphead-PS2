import { FadeIn, FadeOut } from "./Modules/fade.js";

const introImage = new Image("host:/Assets/Textures/LOGO.png");
const mdhrAnimationSpeed = 34;

const fadeOut = new FadeOut('screen', 2, 255, false);  
const fadeIn = new FadeIn('screen', 0, 255, false);  

const audio = Sound.load("host:/Assets/Music/logo.wav");
const audioSlot = 0;

let mdhrImages = [];
let currentMdhrIndex = 0;
let lastMdhrUpdateTime = 0;
let phase = 0; 
let audioPlayed = false;

const fadeInLogo = new FadeIn(introImage, 3, 85); 
const fadeOutLogo = new FadeOut(introImage, 4, 85); 

const FX2 = [];
for (let i = 1; i <= 20; i++) {
    FX2.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
}

const last = new Image("host:/Assets/Textures/MDHR/100.png");
const lastfade = new FadeOut(last, 4, 100); 

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;

function loadMdhrImages(start, end) {
    mdhrImages = Array.from({ length: end - start + 1 }, (_, i) => 
        new Image(`host:/Assets/Textures/MDHR/${start + i}.png`)
    );
}

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
            loadMdhrImages(1, 100);
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
            std.reload("host:/Scripts/title.js"); 
        }
    }
});
