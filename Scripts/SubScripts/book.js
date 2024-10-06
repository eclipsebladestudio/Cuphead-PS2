
let currentStage = 1; 

function stage1() {

    const imagePaths = Array.from({ length: 23 }, (_, i) => `Assets/Textures/StoryBook/Book/${i + 1}.png`);
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

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    let arrowPosition = 400;
    let arrowDirection = 1;
    const arrowSpeed = 1; 

    const red_t = Color.new(0, 0, 0, 100);
    const fontDefault = new Font("Assets/Font/controls.otf");
    fontDefault.color = red_t;
    fontDefault.scale = 0.6;

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
                currentStage = 2; 
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

        const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

        Screen.flip();
    }
}

function stage2() {

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
  const animationSpeed = 100;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 3;
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
      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage3() {
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
  const animationSpeed = 100;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 4; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage4() {

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
  const animationSpeed = 100;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 5; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage5() {

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
  const animationSpeed = 100;

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 6; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage6() {
 
  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page05-06/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 7; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage7() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page06-07/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 8; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage8() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page07-08/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 9; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage9() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page07-08/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 10; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage10() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page08-09/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 11;
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage11() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page09-10/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 12; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

function stage12() {

  const imagePaths = Array.from({ length: 18 }, (_, i) => `Assets/Textures/StoryBook/Page10-11/${i + 1}.png`);
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

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  let arrowPosition = 400;
  let arrowDirection = 1;
  const arrowSpeed = 1; 

  const red_t = Color.new(0, 0, 0, 100);
  const fontDefault = new Font("Assets/Font/controls.otf");
  fontDefault.color = red_t;
  fontDefault.scale = 0.6;

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
              currentStage = 4; 
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

      const free_mem = System.getMemoryStats();
  const free_vram = Screen.getFreeVRAM();
  const ram_usage = System.getMemoryStats();
  const ramUse = (ram_usage.used / 1048576).toFixed(2);
  
  fontDefault.print(0, 50, "Using RAM: " + ramUse + " MB/32MB");
  fontDefault.print(0, 100, "Free RAM: " + (32 - ramUse) + " MB/32MB");
  fontDefault.print(0, 150, "Used RAM: " + ram_usage.used + " B");
  fontDefault.print(0, 200, "Free VRAM: " + free_vram + " KB");

      Screen.flip();
  }
}

while (true) {
    switch (currentStage) {
        case 1:
            stage1(); 
            break;
        case 2:
            stage2(); 
            break;
        case 3:
            stage3(); 
            break;
        case 4:
            stage4(); 
            break;
        case 5:
            stage5(); 
            break;
        case 6:
            stage6(); 
            break;
        case 7:
            stage7(); 
            break;
        case 8:
            stage8(); 
            break;
        case 9:
            stage9(); 
            break;
        case 10:
            stage10(); 
            break;
        case 11:
            stage11(); 
            break;
            case 12:
            stage11(); 
            break;

        default:
            break;
    }
}
