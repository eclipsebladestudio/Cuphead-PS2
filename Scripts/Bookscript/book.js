const imagePaths = Array.from({ length: 31 }, (_, i) => `Assets/Textures/StoryBook/Page 01 (Intro)/${i + 1}.png`);
const images = imagePaths.map(path => {
  const img = new Image(path);
  img.width = 640;
  img.height = 448;
  return img;
});

let currentIndex = 0;
let playingAnimation = false;
let crossPressed = false; 
let lastUpdateTime = 0; 
const animationSpeed = 100; 

const arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");

let arrowPosition = 400;
let arrowDirection = 1;
const arrowSpeed = 1; 

const red_t = Color.new(255, 0, 0, 50);
const fontDefault = new Font("default");
fontDefault.color = red_t;
fontDefault.scale = Math.fround(1);

function delete_images() {
    for (let i = 0; i < images.length; i++) {
        images[i] = null; 
    }
    
    if (typeof std.gc === 'function') {
        std.gc(); 
    }
}

while (true) {
  const currentTime = Date.now();

  Screen.clear();

  arrowPosition += arrowSpeed * arrowDirection;

  if (arrowPosition >= 420 || arrowPosition <= 400) {
    arrowDirection *= -1; 
  }

  

  if (Pads.get(0).justPressed(Pads.CROSS)) {
    if (currentIndex === images.length - 1) {
      crossPressed = true; 
      delete_images(); 
      std.loadScript("Scripts/Bookscript/page1-2.js"); 
      break; 
    }
  }

  if (playingAnimation) {
    const currentImage = images[currentIndex];
    currentImage.draw(0, 0);

    if (currentTime - lastUpdateTime >= animationSpeed) {
      lastUpdateTime = currentTime; 
      currentIndex++;

      if (currentIndex >= images.length) {
        currentIndex = images.length - 1; 
        
      }
    }
  } else {
    if (!crossPressed) {
      playingAnimation = true;
      lastUpdateTime = currentTime; 
    }
  }
  
  if (currentIndex === images.length - 1) {
    arrow.draw(arrowPosition + 90, 410);
  }

  
  const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

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
