const imagePaths2 = Array.from({ length: 28 }, (_, i) => `Page 01 (Intro)/${i + 1}.png`);
const images2 = imagePaths2.map(path => {
  const img2 = new Image(path);
  img2.width = 640;
  img2.height = 448;
  return img2;
});

let currentIndex = 0;
let playingAnimation = false;
let crossPressed = false; 
let lastUpdateTime = 0; 
const animationSpeed = 100; 

function delete_images() {
    for (let i = 0; i < images.length; i++) {
        images2[i] = null; 
    }
    
    if (typeof std.gc === 'function') {
        std.gc(); 
    }
}

while (true) {
  const currentTime = Date.now();

  Screen.clear();

  if (Pads.get(0).justPressed(Pads.CROSS)) {
    if (currentIndex === images.length - 1) {
      crossPressed = true; 
      delete_images(); 
      std.loadScript("Scripts/Bookscript/page1-2.js"); 
      break; 
    }
  }

  if (playingAnimation) {
    const currentImage = images2[currentIndex];
    currentImage.draw(0, 0);

    if (currentTime - lastUpdateTime >= animationSpeed) {
      lastUpdateTime = currentTime; 
      currentIndex++;

      if (currentIndex >= images2.length) {
        currentIndex = images2.length - 1; 
   
      }
    }
  } else {

    if (!crossPressed) {
      playingAnimation = true;
      lastUpdateTime = currentTime; 
    }
  }


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

  Screen.flip();
}
