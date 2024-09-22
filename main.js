const introImage = new Image("host:/Assets/Textures/LOGO.png");
const fadeInDuration = 5000;
const fadeOutDuration = 5000;
const fadeInStep = 255 / (fadeInDuration / (1000 / 60));
const fadeOutStep = 255 / (fadeOutDuration / (1000 / 60));
const mdhrAnimationSpeed = 40;

const audio = Sound.load("host:/Assets/Music/logo.wav");
const audioSlot = 0;

let mdhrImages = [];
let currentMdhrIndex = 0;
let lastMdhrUpdateTime = 0;
let phase = 0;
let audioPlayed = false;

console.log("Loading MDHR Logo...");
function loadMdhrImages(start, end) {
  mdhrImages = [];
  for (let i = start; i <= end; i++) {
    mdhrImages.push(new Image(`host:/Assets/Textures/MDHR/${i}.png`));
  }
}
console.log("MDHR Logo Loaded!!!");

function unloadMdhrImages() {
  for (let i = 0; i < mdhrImages.length; i++) {
    mdhrImages[i] = null; 
  }
  mdhrImages = []; 
  std.gc(); 
}

const fadeInOut = (image, fadeInDuration, fadeOutDuration) => ({
  image,
  opac: 0,
  fadeInSpeed: fadeInStep,
  fadeOutSpeed: fadeOutStep,
  maxOpac: 128,
  phase: 1, 
  startTime: Date.now(),
  displayTime: fadeInDuration + fadeOutDuration,
  update() {
    const currentTime = Date.now();
    const elapsed = currentTime - this.startTime;
    
    if (this.phase === 1) { 
      this.opac = Math.min(this.maxOpac, this.opac + this.fadeInSpeed);
      this.image.color = Color.new(255, 255, 255, this.opac);
      if (this.opac >= this.maxOpac) this.phase = 2;
    } else if (this.phase === 2 && elapsed >= fadeInDuration) { 
      this.phase = 3;
      this.startTime = currentTime; 
    } else if (this.phase === 3) { 
      this.opac = Math.max(0, this.opac - this.fadeOutSpeed);
      this.image.color = Color.new(255, 255, 255, this.opac);
      if (this.opac <= 0) this.phase = 0; 
    }
  },
  draw() {
    if (this.phase !== 0) this.image.draw(0, 0);
  }
});

const fadeInOutLogo = fadeInOut(introImage, fadeInDuration, fadeOutDuration);

function showIntro() {
  Screen.clear();
  fadeInOutLogo.update();
  fadeInOutLogo.draw();
  Screen.flip();
}

function showMdhrSequence() {
  const currentTime = Date.now();
  
  if (!audioPlayed) {
    Sound.play(audio, audioSlot);
    audioPlayed = true;
  }

  if (currentTime - lastMdhrUpdateTime >= mdhrAnimationSpeed) {
    currentMdhrIndex++;

    if (currentMdhrIndex > 100) { 
      os.clearInterval(intervalId);
      console.log("Unloading MDHR Logo...");
      unloadMdhrImages(); 
      console.log("MDHR Logo Unloaded!!!");
      console.log("Loading Title Script...");
      std.loadScript("host:/Scripts/title.js");
      return;
    }

    lastMdhrUpdateTime = currentTime;
  }

  Screen.clear();
  if (currentMdhrIndex < mdhrImages.length && mdhrImages[currentMdhrIndex - 1]) {
    mdhrImages[currentMdhrIndex - 1].draw(0, 0);
  }
  Screen.flip();

}

const intervalId = os.setInterval(() => {
  if (phase === 0) {
    showIntro();
    if (fadeInOutLogo.phase === 0) {
      phase = 1;
      loadMdhrImages(1, 70);
    }
  } else if (phase >= 1) {
    showMdhrSequence();
  }
}, 0);
