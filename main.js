import { SceneManager, ImageManager } from "./source/assets/scripts/scenemanager.js";
import { drawScreenFX } from "./source/assets/scripts/ScreenFX.js";
import { Entity } from "./source/assets/scripts/entity.js"
import Player from "./source/assets/scripts/Player/index.js"
import { ElderKettle } from './source/assets/scenes/elder_kettle/elder.js';
import { getConfig } from "./source/assets/scripts/config.js";
import MemoryCardManager from "./source/assets/scripts/MemoryCardManager/index.js";

std.loadScript("source/assets/scripts/utils.js")

let isDebugEnabled = false;

function logoUpdate() {
    const logo = new ImageManager("source/assets/logo/eclipse.png");
    const eclipsetext = new ImageManager("source/assets/logo/eclipsetext.png");

    let width = 594;
    let height = 634;
    const initialTargetWidth = 164;
    const initialTargetHeight = 204;
    const screenWidth = 640;
    const screenHeight = 448;
    const finalX = 40;

    const finalWidth = 194;
    const finalHeight = 234;

    let x = (screenWidth - width) / 2;
    let y = (screenHeight - height) / 2;

    let phase = 1;
    let showText = false;
    let textAlpha = 0;
    let logoAlpha = 0;
    const fadeSpeed = 0.01;
    let pauseTimer = 0;

    let fadeOutAlpha = 0;
    const fadeOutSpeed = 3;
    let textShownTime = null;

    let startX = x;
    let startWidth = initialTargetWidth;
    let startHeight = initialTargetHeight;

    const totalMoveFrames = Math.abs(startX - finalX) / 3;
    let moveProgress = 0;

    const fadeInLogo = () => {
        if (logoAlpha < 1) {
            logoAlpha += fadeSpeed;
            logoAlpha = Math.min(logoAlpha, 1);
        }
    };

    const fadeInText = () => {
        if (textAlpha < 1) {
            textAlpha += fadeSpeed;
            textAlpha = Math.min(textAlpha, 1);
        }
    };

    Screen.display(() => {
        Screen.clear();

        if (phase === 1) {
            fadeInLogo();

            if (width > initialTargetWidth) width -= 3;
            if (height > initialTargetHeight) height -= 3;

            width = Math.max(width, initialTargetWidth);
            height = Math.max(height, initialTargetHeight);

            x = (screenWidth - width) / 2;
            y = (screenHeight - height) / 2;

            if (width === initialTargetWidth && height === initialTargetHeight) {
                phase = 2;
                pauseTimer = Date.now();
                x = (screenWidth - initialTargetWidth) / 2;
                startX = x;
            }
        } else if (phase === 2) {
            fadeInLogo();

            if (Date.now() - pauseTimer >= 200) {
                phase = 3;
            }

            if (Date.now() - pauseTimer < 1000) {
                logo.color = Color.new(128, 128, 128, logoAlpha * 128);
                logo.width = width;
                logo.height = height;
                logo.draw(x, y);
                return;
            }
        } else if (phase === 3) {
            if (x > finalX) {
                moveProgress += 0.01;
                moveProgress = Math.min(moveProgress, 1);


                x = startX + (finalX - startX) * moveProgress;
                width = initialTargetWidth + (finalWidth - initialTargetWidth) * moveProgress;
                height = initialTargetHeight + (finalHeight - initialTargetHeight) * moveProgress;

                y = (screenHeight - height) / 2;
            } else {
                x = finalX;
                width = finalWidth;
                height = finalHeight;
                y = (screenHeight - height) / 2;

                if (!showText) {
                    showText = true;
                    textShownTime = Date.now();
                }
            }
        }

        logo.color = Color.new(128, 128, 128, logoAlpha * 128);
        logo.width = width;
        logo.height = height;
        logo.draw(x, y);

        if (showText) {
            fadeInText();
            eclipsetext.color = Color.new(255, 255, 255, textAlpha * 128);
            eclipsetext.draw(-30, 0);

            if (textShownTime && Date.now() - textShownTime >= 5000) {
                if (fadeOutAlpha < 255) {
                    fadeOutAlpha += fadeOutSpeed;
                    if (fadeOutAlpha > 255) fadeOutAlpha = 255;
                    if (fadeOutAlpha >= 255) {
                        SceneManager.load(introUpdate)
                    }
                }
                Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeOutAlpha));
            }
        }
    });
}


function introUpdate() {
    const introFrames = [];
    const frameCount = 100;
    const frameSpeed = 33.3;
    let currentFrame = 0;
    let lastUpdate = Date.now();

    let fadingOut = false;
    let fadeAlpha = 128;
    const fadeSpeed = 3;

    let fadeCompletedTime = null;

    for (let i = 1; i <= frameCount; i++) {
        const frame = new ImageManager(`source/assets/scenes/mdhr_logo/${i}.png`);
        frame.width = 640;
        frame.height = 448;
        frame.color = Color.new(128, 128, 128, 128);
        introFrames.push(frame);
    }

    renderScreen(() => {
        const now = Date.now();

        if (!fadingOut) {
            if (now - lastUpdate >= frameSpeed) {
                currentFrame++;
                lastUpdate = now;
            }

            if (currentFrame >= frameCount - 1) {
                currentFrame = frameCount - 1;
                fadingOut = true;
                fadeAlpha = 128;
            }

            introFrames[currentFrame].draw(0, 0);




        } else {
            const lastFrame = introFrames[frameCount - 1];
            lastFrame.color = Color.new(128, 128, 128, fadeAlpha);
            lastFrame.draw(0, 0);

            if (fadeAlpha > 0) {
                fadeAlpha -= fadeSpeed;
                if (fadeAlpha < 0) fadeAlpha = 0;
            } else {
                if (fadeCompletedTime === null) {
                    fadeCompletedTime = now;
                } else if (now - fadeCompletedTime >= 500) {
                    SceneManager.load(titleUpdate);

                }
            }
        }

    });
}

function titleUpdate() {

    const irisFrames = [];
    for (let i = 16; i >= 1; i--) {
        const img = new ImageManager(`source/assets/scenes/iris_transitions/${i}.png`);
        img.width = 640;
        img.height = 448;
        irisFrames.push(img);
    }

    const title_background = new ImageManager("source/assets/scenes/title_screen/bg.png");

    const frameCount = 34;
    const frameSpeed = 33.3;
    let currentFrame = 1;
    let lastUpdate = Date.now();

    const sequence = [];
    for (let i = 1; i <= frameCount; i++) {
        sequence.push(new ImageManager(`source/assets/scenes/title_screen/Cuphead and Mugman/${i}.png`));
    }

    let isTransitioning = false;
    let transitionFrame = 0;
    let lastTransitionUpdate = Date.now();

    let fadeAlpha = 255;
    const fadeSpeed = 5;

    cupheadvogue_bold.color = Color.new(255, 255, 0, 255);
    cupheadvogue_bold.outline = 1.0;
    cupheadvogue_bold.outline_color = Color.new(0, 0, 0, 255);

    renderScreen(() => {
        pad.update();

        title_background.draw(0, 0);

        const now = Date.now();

        if (now - lastUpdate >= frameSpeed) {
            currentFrame++;
            if (currentFrame > frameCount) currentFrame = 1;
            lastUpdate = now;
        }

        const img = sequence[currentFrame - 1];

        drawImageWithChromatic(img, 46, 67);

        const blink = Math.floor(now / 700) % 2 === 0;
        if (blink) {
            cupheadvogue_bold.print(220, 400, "Press Any Button");
        }

        if (pad.btns && Pads.CROSS) {
            isTransitioning = true;
            transitionFrame = 0;
            lastTransitionUpdate = now;
        }

        if (isTransitioning) {
            if (transitionFrame < irisFrames.length) {
                if (now - lastTransitionUpdate >= frameSpeed) {
                    transitionFrame++;
                    lastTransitionUpdate = now;
                }
            } else {
                SceneManager.load(menuUpdate);
            }

            const index = Math.min(transitionFrame, irisFrames.length - 1);
            irisFrames[index].draw(0, 0);
        }



        if (fadeAlpha > 0) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            fadeAlpha -= fadeSpeed;
            if (fadeAlpha < 0) fadeAlpha = 0;
        }

    });
}

function menuUpdate() {
    const pad = Pads.get(0);
    const menu_background = new ImageManager("source/assets/scenes/menu/bg.png");

    let fadeAlpha = 255;
    const fadeSpeed = 5;
    let selectedIndex = 0;

    bangersfont.scale = 0.9;

    renderScreen(() => {
        pad.update();
        menu_background.draw(0, 0);


        if (pad.justPressed(Pads.UP)) {
            selectedIndex = (selectedIndex - 1 + 2) % 2;
        }
        if (pad.justPressed(Pads.DOWN)) {
            selectedIndex = (selectedIndex + 1) % 2;
        }

        if (selectedIndex === 0) {
            printWithChromatic(bangersfont, 295, 170, "START", Color.new(255, 255, 255, 255), true);
            printWithChromatic(bangersfont, 280, 195, "OPTIONS", Color.new(80, 80, 80, 128), true);
        } else {
            printWithChromatic(bangersfont, 295, 170, "START", Color.new(80, 80, 80, 128), true);
            printWithChromatic(bangersfont, 280, 195, "OPTIONS", Color.new(255, 255, 255, 255), true);
        }

        if (fadeAlpha > 0) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeAlpha));
            fadeAlpha -= fadeSpeed;
            if (fadeAlpha < 0) fadeAlpha = 0;
        }


        if (pad.justPressed(Pads.CROSS)) {
            if (selectedIndex === 0) {

            } else {

            }
        }


    });
}

function storybookUpdate() {
    const storyPages = [
        {
            images: Array.from({ length: 60 }, (_, i) => `source/assets/scenes/story_book/Book/${i + 1}.png`),
            text: `Once upon a time, in a magical place called Inkwell Isle, there 
were two brothers named Cuphead and Mugman. They lived 
without a care under the watchful eye of the wise Elder Kettle.`
        },
        {
            images: Array.from({ length: 22 }, (_, i) => `source/assets/scenes/story_book/Page01-02/${i + 1}.png`),
            text: `One day the two boys wandered far from home, and - despite
the Elder Kettle's many warnings - ended up on the wrong side
of the tracks and entered the Devil's Casino.`
        },
        {
            images: Array.from({ length: 23 }, (_, i) => `source/assets/scenes/story_book/Page02-03/${i + 1}.png`),
            text: `Inside, Cuphead and Mugman soon found themselves on a 
winning streak at the Craps table. "How dawg!" exclaimed king
Dice, the casino's sleazy manager. "These fellas can't lose!"`
        },
        {
            images: Array.from({ length: 15 }, (_, i) => `source/assets/scenes/story_book/Page03-04/${i + 1}.png`),
            text: `"Nice run, boys," laughed a newcomer. The brothers gasped.
It was the casino's owner - the Devil himself! "Now, how about
we raise the stakes?" he suggested with a toothy grin.`
        },
        {
            images: Array.from({ length: 23 }, (_, i) => `source/assets/scenes/story_book/Page04-05/${i + 1}.png`),
            text: `"Win one more roll, and all the loot in my casino is yours!" the
Devil boomed. "But if you lose, I'll have your souls! Deal?"`
        },
        {
            images: Array.from({ length: 22 }, (_, i) => `source/assets/scenes/story_book/Page05-06/${i + 1}.png`),
            text: `Cuphead, blinded by easy riches, nodded and grabbed the
dice for a throw. "Good gosh, Cuphead, no!" cried Mugman, for
he understood the danger. But it was too late!`
        },
        {
            images: Array.from({ length: 22 }, (_, i) => `source/assets/scenes/story_book/Page06-07/${i + 1}.png`),
            text: `"Snake eyes!" laughed the Devil while slamming the floor.
"You lose!" The brothers trembled in fear as he loomed over
them. "Now, about those souls..."`
        },
        {
            images: Array.from({ length: 22 }, (_, i) => `source/assets/scenes/story_book/Page07-08/${i + 1}.png`),
            text: `The brothers pleaded for their very lives. "Th-there must
be another way to repay you," Mugman stammered. "Yes,
p-please, mister!" Cuphead added.`
        },
        {
            images: Array.from({ length: 15 }, (_, i) => `source/assets/scenes/story_book/Page08-09/${i + 1}.png`),
            text: `"Hmm, perhaps there is," the Devil snickered, pulling out a 
parchment. "I have here a list of my runaway debtors. Collect
their souls for me, and I just might pardon you two mugs."`
        },
        {
            images: Array.from({ length: 15 }, (_, i) => `source/assets/scenes/story_book/Page09-10/${i + 1}.png`),
            text: `"Now get going!" the Devil roared, kicking the boys out most
rudely. "You have 'til midnight tomorrow to collect every one of
those souls! Otherwise I'll be the one collecting yours!"`
        },
        {
            images: Array.from({ length: 14 }, (_, i) => `source/assets/scenes/story_book/Page10-11/${i + 1}.png`),
            text: `Cuphead and Mugman were terribly frightened and ran away
as fast as they could. "C'mon, Mug!" panted Cuphead. "We have
to find the Elder Kettle. He'll know what to do!"`
        },
    ];

    let currentPage = 0;

    const playStoryPage = (pageConfig, onComplete) => {
        let images = pageConfig.images.map(path => {
            const img = new ImageManager(path);
            img.width = 640;
            img.height = 448;
            return img;
        });

        const storyText = pageConfig.text;
        let currentIndex = 0;
        let lastUpdate = Date.now();
        const frameSpeed = 50;

        const font = new Font("source/assets/fonts/CupheadVogue-Bold.otf");
        font.color = Color.new(40, 40, 40);
        font.scale = 0.8;

        let completed = false;

        renderScreen(() => {
            if (completed) return;

            const now = Date.now();
            pad.update();

            const img = images[currentIndex];
            if (img) img.draw(0, 0);

            if (currentIndex === images.length - 1) {
                storyText.split("\n").forEach((line, index) => {
                    font.print(80, 333 + index * 20, line);
                });

                if (pad.justPressed(Pads.CROSS)) {
                    completed = true;

                    delete_images(images);
                    images = null;

                    SceneManager.load(() => {
                        if (onComplete) onComplete();
                    });

                    return;
                }
            }

            if (currentIndex < images.length - 1 && now - lastUpdate >= frameSpeed) {
                currentIndex++;
                lastUpdate = now;
            }


        });
    };

    const delete_images = (images) => {
        images.forEach(img => {
            if (img && typeof img.release === "function") {
                img.release();
            }
        });
        std.gc();
    };

    const nextPage = () => {
        if (currentPage >= storyPages.length) {
            SceneManager.load(titleUpdate);
            return;
        }

        playStoryPage(storyPages[currentPage], () => {
            currentPage++;
            nextPage();
        });
    };

    nextPage();
}

function elderkettleUpdate() {
    const elderKettle = new ElderKettle();
    const background = new Image("source/assets/scenes/elder_kettle/background.png");
    const overlay = new Image("source/assets/scenes/elder_kettle/overlay.png");
    const memoryCard = new MemoryCardManager();

    memoryCard.testMemoryCard();

    let camera = new Entity(0, 0, 640, 448, 0);
    let player1 = new Player(0, 270, 50, 70, 0);

    background.width = 680;
    overlay.width = 680;

    let currentOffset = 0;
    let cutsceneActive = true;

    renderScreen(() => {
        let targetOffset = (player1.x / (640 - player1.w)) * (680 - 640);
        const smoothFactor = 0.05;
        currentOffset += (targetOffset - currentOffset) * smoothFactor;

        background.draw(-currentOffset, 0);
        elderKettle.update();
        elderKettle.draw(-currentOffset + 500, 217);

        if (cutsceneActive) {
            if (player1.x < 350) {
                player1.x += 2;
                // player1.run()
            } else {
                // player1.idle();
                cutsceneActive = false;
            }
        }


        player1.update(250, camera);
        player1.draw(camera);
        overlay.draw(-currentOffset, 0);


    });
}

function renderScreen(callback) {
    Screen.display(() => {
        callback();
        if (getConfig("Debug", "enabled", false)) {
            DebugMemory();
        }

        if (getConfig("VisualEffects", "screenfx", false)) {
            drawScreenFX();
        }

    });
}


SceneManager.load(elderkettleUpdate)

