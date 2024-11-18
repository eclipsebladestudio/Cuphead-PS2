import { setSceneToLoad } from "../../../env.js";
import { FadeIn, FadeOut } from "/src/Modules/fade.js";

let currentPage = 1;

const intro = Sound.load("host:/src/Scenes/StoryBook/intro_book_music.wav");
Sound.repeat(true);
const introSlot = 5;
Sound.play(intro, introSlot);

const red_t = Color.new(0, 0, 0, 100);
const fontDefault = new Font("src/Font/controls.otf");
fontDefault.color = red_t;
fontDefault.scale = 0.6;

const arrowSpeed = 1;

function delete_images(images) {
    images.forEach(image => image.release && image.release());
    std.gc();
}

function drawArrow(arrow, arrowPosition) {
    arrow.draw(arrowPosition + 120, 410);
}

function drawText(storyText) {
    storyText.split('\n').forEach((line, index) => {
        fontDefault.print(80, 333 + index * 20, line);
    });
}

function loadImages(imagePaths) {
    return imagePaths.map(path => {
        const img = new Image(path);
        img.width = 640;
        img.height = 448;
        return img;
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

function getPageConfig(page) {
    const configs = {
        1: {
            images: Array.from({ length: 60 }, (_, i) => `src/Scenes/StoryBook/Book/${i + 1}.png`),
            text: `Once upon a time, in a magical place called Inkwell Isle, there 
were two brothers named Cuphead and Mugman. They lived 
without a care under the watchful eye of the wise Elder Kettle.`,
        },
        2: {
            images: Array.from({ length: 22 }, (_, i) => `src/Scenes/StoryBook/Page01-02/${i + 1}.png`),
            text: `One day the two boys wandered far from home, and - despite
the Elder Kettle's many warnings - ended up on the wrong side
of the tracks and entered the Devil's Casino.`,
        },
        3: {
            images: Array.from({ length: 23 }, (_, i) => `src/Scenes/StoryBook/Page02-03/${i + 1}.png`),
            text: `Inside, Cuphead and Mugman soon found themselves on a 
winning streak at the Craps table. "How dawg!" exclaimed king
Dice, the casino's sleazy manager. "These fellas can't lose!"`,
        },
        4: {
            images: Array.from({ length: 15 }, (_, i) => `src/Scenes/StoryBook/Page03-04/${i + 1}.png`),
            text: `"Nice run, boys," laughed a newcomer. The brothers gasped.
It was the casino's owner - the Devil himself! "Now, how about
we raise the stakes?" he suggested with a toothy grin.`,
        },
        5: {
            images: Array.from({ length: 23 }, (_, i) => `src/Scenes/StoryBook/Page04-05/${i + 1}.png`),
            text: `"Win one more roll, and all the loot in my casino is yours!" the
Devil boomed. "But if you lose, I'll have your souls! Deal?"`,
        },
        6: {
            images: Array.from({ length: 22 }, (_, i) => `src/Scenes/StoryBook/Page05-06/${i + 1}.png`),
            text: `Cuphead, blinded by easy riches, nodded and grabbed the
dice for a throw. "Good gosh, Cuphead, no!" cried Mugman, for
he understood the danger. But it was too late!`,
        },
        7: {
            images: Array.from({ length: 22 }, (_, i) => `src/Scenes/StoryBook/Page06-07/${i + 1}.png`),
            text: `"Snake eyes!" laughed the Devil while slamming the floor.
"You lose!" The brothers trembled in fear as he loomed over
them. "Now, about those souls..."`,
        },
        8: {
            images: Array.from({ length: 22 }, (_, i) => `src/Scenes/StoryBook/Page07-08/${i + 1}.png`),
            text: `The brothers pleaded for their very lives. "Th-there must
be another way to repay you," Mugman stammered. "Yes,
p-please, mister!" Cuphead added.`,
        },
        9: {
            images: Array.from({ length: 15 }, (_, i) => `src/Scenes/StoryBook/Page08-09/${i + 1}.png`),
            text: `"Hmm, perhaps there is," the Devil snickered, pulling out a 
parchment. "I have here a list of my runaway debtors. Collect
their souls for me, and I just might pardon you two mugs."`,
        },
        10: {
            images: Array.from({ length: 15 }, (_, i) => `src/Scenes/StoryBook/Page09-10/${i + 1}.png`),
            text: `"Now get going!" the Devil roared, kicking the boys out most
rudely. "You have 'til midnight tomorrow to collect every one of
those souls! Otherwise I'll be the one collecting yours!"`,
        },
        11: {
            images: Array.from({ length: 14 }, (_, i) => `src/Scenes/StoryBook/Page10-11/${i + 1}.png`),
            text: `Cuphead and Mugman were terribly frightened and ran away
as fast as they could. "C'mon, Mug!" panted Cuphead. "We have
to find the Elder Kettle. He'll know what to do!"`,
        },
        
    };

    return configs[page] || null;
}

let currentUpdater = null;

Screen.display(() => {

    if (currentPage > 11) {
        setSceneToLoad("Inkwell Isle One/main.js")
        std.reload("src/Scenes/Hourglass/loading.js");
    }

    if (!currentUpdater) {
        const config = getPageConfig(currentPage);
        if (!config) return; 

        const images = loadImages(config.images);
        const arrow = new Image("src/Scenes/StoryBook/book_arrow.png");
        currentUpdater = animatePage(images, arrow, config.text);
    }
});

