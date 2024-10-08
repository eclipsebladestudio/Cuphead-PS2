import { FadeIn, FadeOut } from "/Modules/fade.js";

let currentPage = 1; 

var intro = Sound.load("host:/Assets/Music/intro_book_music.wav");
var introSlot = 5; 

Sound.play(intro, introSlot);

const red_t = Color.new(0, 0, 0, 100);
const fontDefault = new Font("Assets/Font/controls.otf");
fontDefault.color = red_t;
fontDefault.scale = 0.6;

const arrowSpeed = 1; 

function delete_images(images) {
    for (let i = 0; i < images.length; i++) {
        images[i] = null; 
    }
    if (typeof std.gc === 'function') {
        std.gc(); 
    }
}

function drawArrow(arrow, arrowPosition) {
    arrow.draw(arrowPosition + 120, 410);
}

function drawText(storyText) {
    const lines = storyText.split('\n');
    lines.forEach((line, index) => {
        fontDefault.print(80, 333 + index * 20, line);
    });
}

function animatePage(images, arrow, storyText) {
    let currentIndex = 0;
    let playingAnimation = false;
    let lastUpdateTime = 0;
    let arrowPosition = 400;
    let arrowDirection = 1;

    const animationSpeed = 50;

    while (true) {
        const currentTime = Date.now();
        Screen.clear();

        arrowPosition += arrowSpeed * arrowDirection;
        if (arrowPosition >= 420 || arrowPosition <= 400) {
            arrowDirection *= -1;
        }

        if (Pads.get(0).justPressed(Pads.CROSS)) {
            if (currentIndex === images.length - 1) {
                delete_images(images);  
                currentPage++;  
                break;
            }
        }

        if (playingAnimation) {
            const currentImage = images[currentIndex];
            currentImage.draw(0, 0);

            if (currentIndex === images.length - 1) {
                drawArrow(arrow, arrowPosition);
                drawText(storyText);
            }

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

        

        
        Screen.flip();
    }
}

function page1() {
    const imagePaths = Array.from({ length: 60 }, (_, i) => `Assets/Textures/StoryBook/Book/${i + 1}.png`);
    const images = imagePaths.map(path => {
        const img = new Image(path);
        img.width = 640;
        img.height = 448;
        return img;
    });

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    const storyText = 
    `Once upon a time, in a magical place called Inkwell Isle, there 
were two brothers named Cuphead and Mugman. They lived 
without a care under the watchful eye of the wise Elder Kettle.`;

    animatePage(images, arrow, storyText);
}

function page2() {
    const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page01-02/${i + 1}.png`);
    const images = imagePaths.map(path => {
        const img = new Image(path);
        img.width = 640;
        img.height = 448;
        return img;
    });

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    const storyText = 
    `One day the two boys wandered far from home, and - despite
the Elder Kettle's many warnings - ended up on the wrong side
of the tracks and entered the Devil's Casino.`;

    animatePage(images, arrow, storyText);
}

function page3() {
    const imagePaths = Array.from({ length: 23 }, (_, i) => `Assets/Textures/StoryBook/Page02-03/${i + 1}.png`);
    const images = imagePaths.map(path => {
        const img = new Image(path);
        img.width = 640;
        img.height = 448;
        return img;
    });

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    const storyText = 
    `Inside, Cuphead and Mugman soon found themselves on a 
winning streak at the Craps table. "How dawg!" exclaimed king
Dice, the casino's sleazy manager. "These fellas can't lose!"`;

    animatePage(images, arrow, storyText);
}

function page4() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page03-04/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  

  const storyText = 
  `"Nice run, boys," laughed a newcomer. The brothers gasped.
It was the casino's owner -the Devil himself! "Now, how about
we raise the skates?" he suggested with a toothy grin.`;

animatePage(images, arrow, storyText);
}

function page5() {

  const imagePaths = Array.from({ length: 23 }, (_, i) => `Assets/Textures/StoryBook/Page04-05/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");

  const storyText = 
  `"Win one more roll, and all the loot in my casino is yours!" the
Devil boomed. "But if you lose, I'll have your souls! Deal?"`;


animatePage(images, arrow, storyText);
}

function page6() {
 
  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page05-06/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");

  const storyText = 
  `Cuphead, blinded by easy riches, nodded and grabbed the
dice for a throw. "Good gosh, Cuphead, no!" cried Mugman, for
he understood the danger. But it was too late!`;


animatePage(images, arrow, storyText);
}

function page7() {

  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page06-07/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  const storyText = 
  `"Snake eyes!" laughed the Devil while slamming the floor.
"You lose!" The brothers trembled in fear as he loomed over
them. "Now, about those shouls..."`;


animatePage(images, arrow, storyText);
}

function page8() {

  const imagePaths = Array.from({ length: 22 }, (_, i) => `Assets/Textures/StoryBook/Page07-08/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  const storyText = 
  `The brothers pleaded for their very lives. "Th-there must
be another w-way to repay you," Mugman stammered. "Yes,
p-please, mister!" Cuphead Added.`;

 
animatePage(images, arrow, storyText);
}

function page9() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page08-09/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  const storyText = 
  `"Hmm, perhaps there is," the Devil snickered, pulling out a 
parchment. "I have here a list of my runaway debtors. Collect
their souls for me, and I just might pardon you two mugs."`;


animatePage(images, arrow, storyText);
}

function page10() {

  const imagePaths = Array.from({ length: 15 }, (_, i) => `Assets/Textures/StoryBook/Page09-10/${i + 1}.png`);
  const images = imagePaths.map(path => {
      const img = new Image(path);
      img.width = 640;
      img.height = 448;
      return img;
  });

  let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
  const storyText = 
  `"Now get going!" the Devil roared, kicking the boys out most
rudely. "You have 'til midnight tomorrow to collect every one of
those souls! Otherwise I'll be the one collecting yours!"`;


animatePage(images, arrow, storyText);
}

function page11() {
    const imagePaths = Array.from({ length: 14 }, (_, i) => `Assets/Textures/StoryBook/Page10-11/${i + 1}.png`);
    const images = imagePaths.map(path => {
        const img = new Image(path);
        img.width = 640;
        img.height = 448;
        return img;
    });

    let arrow = new Image("Assets/Textures/StoryBook/book_arrow.png");
    
    const storyText = 
    `Cuphead and Mugman were terribly frightened and ran away
as fast as they could. "C'mon, Mug!" panted Cuphead. "We have
to find the Elder Kettle. He'll know what to do!"`;

    let currentIndex = 0; 
    let playingAnimation = false; 
    let lastUpdateTime = 0;
    let arrowPosition = 400; 
    let arrowDirection = 1; 

    const animationSpeed = 50; 


    const lastImageFade = new FadeOut(images[images.length - 1], 4, 85); 

    while (true) {
        const currentTime = Date.now();
        Screen.clear();


        arrowPosition += arrowSpeed * arrowDirection;
        if (arrowPosition >= 420 || arrowPosition <= 400) {
            arrowDirection *= -1;
        }


        if (Pads.get(0).justPressed(Pads.CROSS)) {
            if (currentIndex === images.length - 1) {

                if (!lastImageFade.isDrawing) {
                    lastImageFade.play(); 
                }
            }
        }

        if (lastImageFade.isDrawing) {
            lastImageFade.play(); 

            if (!lastImageFade.isDrawing) {
                Sound.pause(intro, introSlot); 
                std.loadScript("Scripts/loading.js"); 
                break; 
            }
        } else {

            const currentImage = images[currentIndex];
            currentImage.draw(0, 0);

            if (currentIndex === images.length - 1) {
                drawArrow(arrow, arrowPosition);
                drawText(storyText);
            }

            if (currentTime - lastUpdateTime >= animationSpeed) {
                lastUpdateTime = currentTime;
                currentIndex++;

                if (currentIndex >= images.length) {
                    currentIndex = images.length - 1;
                }
            }
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
