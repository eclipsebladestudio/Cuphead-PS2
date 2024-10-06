
let currentPage = 1; 

var intro = Sound.load("host:/Assets/Music/intro_book_music.wav");
var introSlot = 5; 

Sound.play(intro, introSlot);

const red_t = Color.new(0, 0, 0, 100);
    const fontDefault = new Font("Assets/Font/controls.otf");
    fontDefault.color = red_t;
    fontDefault.scale = 0.6;

function debug() {

    const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

}

const FX2 = [];
for (let i = 1; i <= 20; i++) {
  FX2.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
}

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;

function page1() {

    const imagePaths = Array.from({ length: 60 }, (_, i) => `Assets/Textures/StoryBook/Book/${i + 1}.png`);
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
    const animationSpeed = 70;

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    let arrowPosition = 400;
    let arrowDirection = 1;
    const arrowSpeed = 1; 

    

    const storyText = 
    `Once upon a time, in a magical place called Inkwell Isle, there 
were two brothers named  Cuphead and Mugman. They lived 
without a care under the watchful eye of the wise Elder Kettle.`;


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
                delete_images();
                currentPage = 2; 
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
            playingAnimation = true;
            lastUpdateTime = currentTime;
        }

        
        if (currentIndex === images.length - 1) {
            arrow.draw(arrowPosition + 120, 410);

            const lines = storyText.split('\n');
            lines.forEach((line, index) => {
                fontDefault.print(80, 333 + index * 20, line);
            });
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
}

function page2() {

  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page01-02/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `One day the two boys wandered far from home, and - despite
the Elder Kettle's many warnings - ended up on the wrong side
of the tracks and entered the Devi's Casino.`;


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
              delete_images();
              currentPage = 3;
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page3() {
  const imagePaths = Array.from({ length: 23 }, (_, i) => `Assets/Textures/StoryBook/Page02-03/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `Inside, Cuphead and Mugman soon found themselves on a 
winning streak at the Craps table. "How dawg!" exclaimed king
Dice, the casino's sleazy manager. "These fellas can't lose!"`;

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
              delete_images();
              currentPage = 4; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page4() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page03-04/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `"Nice run, boys," laughed a newcomer. The brothers gasped.
It was the casino's owner -the Devil himself! "Now, how about
we raise the skates?" he suggested with a toothy grin.`;

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
              delete_images();
              currentPage = 5; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page5() {

  const imagePaths = Array.from({ length: 23 }, (_, i) => `Assets/Textures/StoryBook/Page04-05/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `"Win one more roll, and all the loot in my casino is yours!" the
Devil boomed. "But if you lose, I'll have your souls! Deal?"`;


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
              delete_images();
              currentPage = 6; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page6() {
 
  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page05-06/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `Cuphead, blinded by easy riches, nodded and grabbed the
dice for a throw. "Good gosh, Cuphead, no!" cried Mugman, for
he understood the danger. But it was too late!`;


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
              delete_images();
              currentPage = 7; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page7() {

  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page06-07/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `"Snake eyes!" laughed the Devil while slamming the floor.
"You lose!" The brothers trembled in fear as he loomed over
them. "Now, about those shouls..."`;


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
              delete_images();
              currentPage = 8; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page8() {

  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page07-08/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `The brothers pleaded for their very lives. "Th-there must
be another w-way to repay you," Mugman stammered. "Yes,
p-please, mister!" Cuphead Added.`;

 
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
              delete_images();
              currentPage = 9; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page9() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page08-09/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `"Hmm, perhaps there is," the Devil snickered, pulling out a 
parchment. "I have here a list of my runaway debtors. Collect
their souls for me, and I just might pardon you two mugs."`;


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
              delete_images();
              currentPage = 10; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page10() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page09-10/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `"Now get going!" the Devil roared, kicking the boys out most
rudely. "You have 'til midnight tomorrow to collect every one of
those souls! Otherwise I'll be the one collecting yours!"`;


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
              delete_images();
              currentPage = 11;
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

function page11() {

  const imagePaths = Array.from({ length: 14 }, (_, i) => `Assets/Textures/StoryBook/Page10-11/${i + 1}.png`);
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
  const animationSpeed = 70;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const storyText = 
  `Cuphead and Mugman were terribly frightened and ran away
as fast as they could. "C'mon, Mug!" panted Cuphead. "We have
to find the Elder Kettle. He'll know what to do!"`;


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
              delete_images();
              currentPage = 12; 
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
          playingAnimation = true;
          lastUpdateTime = currentTime;
      }

      
      if (currentIndex === images.length - 1) {
          arrow.draw(arrowPosition + 120, 410);

          const lines = storyText.split('\n');
          lines.forEach((line, index) => {
              fontDefault.print(80, 333 + index * 20, line);
          });
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
}

while (true) {
    switch (currentPage) {
        case 1:
            page1(); 
            break;
        case 2:
            page2(); 
            break;
        case 3:
            page3(); 
            break;
        case 4:
            page4(); 
            break;
        case 5:
            page5(); 
            break;
        case 6:
            page6(); 
            break;
        case 7:
            page7(); 
            break;
        case 8:
            page8(); 
            break;
        case 9:
            page9(); 
            break;
        case 10:
            page10(); 
            break;
        case 11:
            page11(); 
            break;
        default:
            break;
    }
}
