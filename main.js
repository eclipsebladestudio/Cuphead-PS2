const introImage = new Image("host:/Assets/Textures/LOGO.png");
const fadeInDuration = 5000;
const fadeOutDuration = 5000;
const mdhrAnimationSpeed = 40;

const audio = Sound.load("host:/Assets/Music/logo.wav");
const audioSlot = 0;

let mdhrImages = [];
let currentMdhrIndex = 0;
let lastMdhrUpdateTime = 0;
let phase = 0;
let audioPlayed = false;

function loadMdhrImages(start, end) {
  mdhrImages = Array.from({ length: end - start + 1 }, (_, i) => 
    new Image(`host:/Assets/Textures/MDHR/${start + i}.png`)
  );
}

const createFadeInOut = (image, fadeInDuration, fadeOutDuration) => {
  const fadeInStep = 255 / (fadeInDuration / (1000 / 60));
  const fadeOutStep = 255 / (fadeOutDuration / (1000 / 60));
  
  return {
    image,
    opac: 0,
    fadeInSpeed: fadeInStep,
    fadeOutSpeed: fadeOutStep,
    maxOpac: 128,
    phase: 1, 
    startTime: Date.now(),
    update() {
      const elapsed = Date.now() - this.startTime;

      if (this.phase === 1) {
        this.opac = Math.min(this.maxOpac, this.opac + this.fadeInSpeed);
        this.image.color = Color.new(255, 255, 255, this.opac);
        if (this.opac >= this.maxOpac) this.phase = 2;
      } else if (this.phase === 2 && elapsed >= fadeInDuration) {
        this.phase = 3;
        this.startTime = Date.now();
      } else if (this.phase === 3) {
        this.opac = Math.max(0, this.opac - this.fadeOutSpeed);
        this.image.color = Color.new(255, 255, 255, this.opac);
        if (this.opac <= 0) this.phase = 0; 
      }
    },
    draw() {
      if (this.phase !== 0) this.image.draw(0, 0);
    }
  };
};

const fadeInOutLogo = createFadeInOut(introImage, fadeInDuration, fadeOutDuration);

function showIntro() {
  fadeInOutLogo.update();
  fadeInOutLogo.draw();
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
  if (phase === 0) {
    showIntro();
    if (fadeInOutLogo.phase === 0) {
      phase = 1;
      loadMdhrImages(1, 70);
    }
  } else if (phase >= 1) {
    showMdhrSequence();
    if (currentMdhrIndex > 70) { 
      Sound.pause(audio, audioSlot);
      std.reload("host:/Scripts/title.js");
    }
  }
});
