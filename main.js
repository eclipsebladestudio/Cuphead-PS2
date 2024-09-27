import { FadeIn, FadeOut } from "./Modules/fade.js";

const introImage = new Image("host:/Assets/Textures/LOGO.png");
const mdhrAnimationSpeed = 35; 

const audio = Sound.load("host:/Assets/Music/logo.wav");
const audioSlot = 0;

let mdhrImages = [];
let currentMdhrIndex = 0;
let lastMdhrUpdateTime = 0;
let phase = 0; 
let audioPlayed = false;

const fadeInLogo = new FadeIn(introImage, 3, 85); 
const fadeOutLogo = new FadeOut(introImage, 4, 85); 

const last = new Image("host:/Assets/Textures/MDHR/70.png");
const lastfade = new FadeOut(last, 4, 100); 

function loadMdhrImages(start, end) {
    mdhrImages = Array.from({ length: end - start + 1 }, (_, i) => 
        new Image(`host:/Assets/Textures/MDHR/${start + i}.png`)
    );
}

function showIntro() {
    if (phase === 0) {
        fadeInLogo.play();

        if (!fadeInLogo.isDrawing) {
            phase = 1;
        }
    } else if (phase === 1) {
        fadeOutLogo.play();
        
        if (!fadeOutLogo.isDrawing && fadeOutLogo.opacity <= 0) { 
            phase = 2;
            loadMdhrImages(1, 70); 
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
        currentMdhrIndex++;
        lastMdhrUpdateTime = currentTime;
    }

    if (currentMdhrIndex < mdhrImages.length) {
        mdhrImages[currentMdhrIndex].draw(0, 0);
    }
}



Screen.display(() => {
    if (phase < 2) {
        showIntro();
    } else if (phase === 2) {
        showMdhrSequence();

        if (currentMdhrIndex >= 70) { 
            
            lastfade.play();
            phase = 3; 
        }
    } else if (phase === 3) {
      if (lastfade.isDrawing) {
        lastfade.play();
    } else {
      Sound.pause(audio, audioSlot);
        std.reload("host:/Scripts/title.js"); 
    }
    }
});
