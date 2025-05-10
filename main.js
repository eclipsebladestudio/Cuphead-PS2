import { SceneManager, ImageManager } from "./source/assets/scripts/scenemanager.js";
import { drawScreenFX } from "./source/assets/scripts/ScreenFX.js";
import { Timer } from "./source/assets/scripts/timer.js"
import { Entity } from "./source/assets/scripts/entity.js"
import Player from "./source/assets/scripts/Player/index.js"
import { Health } from "./source/assets/scripts/health.js"
import { ElderKettle } from './source/assets/scenes/elder_kettle/elder.js';
import { getConfig, setConfig } from "source/assets/scripts/config.js";
import { loadCupLanguage, setLanguage, getText } from "./source/assets/scripts/cupreader.js";
import MemoryCardManager from "./source/assets/scripts/MemoryCardManager/index.js";

loadCupLanguage()
std.loadScript("source/assets/scripts/utils.js")

let DisableScreenFX = false;
let brightness = getConfig("Video", "brightness", 0.3); 

const screenWidth = 640; 

let languageKeys = [];
let languageLabels = [];

function loadLanguagesFromFile() {
    languageKeys = [];
    languageLabels = [];

    let file;
    try {
        file = std.open("source/assets/texts/language.cfg", "r");
    } catch (err) {
        console.log("Erro ao abrir language.cfg:", err);
        return;
    }

    while (!file.eof()) {
        let line = file.getline()?.trim();
        if (!line || line.startsWith("#")) continue;

        let [key, value] = line.split("=", 2).map(s => s.trim());
        if (key && value) {
            languageKeys.push(key.toLowerCase());
            languageLabels.push(value);
        }
    }

    file.close();
}

function logoUpdate() {
    const eclipseSound = Sound.load("source/assets/sounds/eclipsesound.wav")
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

    Sound.play(eclipseSound)
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
    const frameSpeed = 20.3;
    let currentFrame = 0;
    let lastUpdate = Date.now();
    let animationStartTime = null;

    let fadingOut = false;
    let fadeAlpha = 128;
    const fadeSpeed = 3;
    let fadeIn = 255;
    const fadeInSpeed = 3;

    let fadeCompletedTime = null;

    const introsound = Sound.load("source/assets/sounds/logo.wav");

    for (let i = 1; i <= frameCount; i++) {
        const frame = new ImageManager(`source/assets/scenes/mdhr_logo/${i}.png`);
        frame.width = 640;
        frame.height = 448;
        frame.color = Color.new(128, 128, 128, 128);
        introFrames.push(frame);
    }

    Sound.play(introsound);

    renderScreen(() => {
        
        const now = Date.now();

  
        if (animationStartTime === null) {
            animationStartTime = now;
        }

        if (!fadingOut) {
            if (now - animationStartTime < 1300) {
                
                Screen.clear(Color.new(255, 66, 10))
            } else {
            
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
            }
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
                    DisableScreenFX = true;
                } else if (now - fadeCompletedTime >= 500) {
                 
                    SceneManager.load(titleUpdate);
                    DisableScreenFX = false;
                   
                }
            }
        }


        if (fadeIn > 0) {
            Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, fadeIn));
            fadeIn -= fadeInSpeed;
            if (fadeIn < 0) fadeIn = 0;
        }
    });
}

function titleUpdate() {

    const titlemusic = Sound.load("source/assets/sounds/screen.wav")

    const irisFrames = [];
    for (let i = 17; i >= 2; i--) {
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
    let transitionCompleted = false;
    let lastFrameStartedAt = null;

    Sound.play(titlemusic)

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

        img.draw(46, 67);


        const blink = Math.floor(now / 700) % 2 === 0;
        let press_any_button = getText("press_any_button");

        if (blink) {
            let size = cupheadvogue_bold.getTextSize(press_any_button.value);
            let centerX = 640 / 2; 
            let x = centerX - size.width / 2;
            cupheadvogue_bold.print(x, press_any_button.y, press_any_button.value);
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
               
                Screen.clear(); 
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

function updateVolumeINI(index, value) {
    const keys = ["master", "sfx", "music"];
    const key = keys[index];
    setConfig("Audio", key, value);
}

function initMenuAssets() {
    const menu_background = new ImageManager("source/assets/scenes/menu/bg.png");
    const interfacebg = new ImageManager("source/assets/scenes/menu/interface.png");
    const pausebg = new ImageManager("source/assets/scenes/menu/pause.png");
    const optionsbg = new ImageManager("source/assets/scenes/menu/options.png");
    const controlsbg = new ImageManager("source/assets/scenes/menu/controlsmenu.png");

    const select1 = new ImageManager("source/assets/scenes/menu/select1.png");
    const select2 = new ImageManager("source/assets/scenes/menu/select2.png");
    const headcup = new ImageManager("source/assets/scenes/menu/frame_headcup.png");
    const headmugman = new ImageManager("source/assets/scenes/menu/frame_headmugman.png");
    const headcupselected = new ImageManager("source/assets/scenes/menu/frame_headcup_selected.png");
    const headmugmanselected = new ImageManager("source/assets/scenes/menu/frame_headmugman_selected.png");

    interfacebg.width = 328;
    interfacebg.height = 322;
    bangersfont.scale = 0.9;

    return {
        menu_background, interfacebg, pausebg, optionsbg, controlsbg,
        select1, select2, headcup, headmugman, headcupselected, headmugmanselected
    };
}

function createMenuState() {
    return {
        inStartScene: false,
        selectedIndex: 0,
        slotIndex: 0,
        fadeAlpha: 255,
        slotConfirmed: false,
        confirmedSlotIndex: -1,
        characterIndex: 0,
        inOptionsMenu: false,
        optionsIndex: 0,
        inControlsMenu: false,
        inLanguageMenu: false,
        inVisualMenu: false,
        inAudioMenu: false,
        languageMenuIndex: 0,
        currentLanguageIndex: 0,
        visualIndex: 0,
        audioIndex: 0,
        optionsList: [
            getText("audio").value,
            getText("visual").value, 
            getText("controls").value,
            getText("language").value,
            getText("back").value
        ],
        fadeSpeed: 5,
        vsync: true,
        aspectIndex: 0,
        aspectRatios: ["4:3"],
        resolutionIndex: 0,
        resolutions: ["NTSC(480i)"],
        noiseEffect: true,
        debugMode: false,
        masterVolume: parseInt(getConfig("Audio", "master")) || 5,
        sfxVolume: parseInt(getConfig("Audio", "sfx")) || 5,
        musicVolume: parseInt(getConfig("Audio", "music")) || 5
    };
}

function handleMainMenu(state, assets, pad) {
    if (pad.justPressed(Pads.UP)) {
        state.selectedIndex = (state.selectedIndex - 1 + 2) % 2;
    }
    if (pad.justPressed(Pads.DOWN)) {
        state.selectedIndex = (state.selectedIndex + 1) % 2;
    }

    let startText = getText("start");
    let optionsText = getText("options");
    
    let startSize = bangersfont.getTextSize(startText.value);
    let optionsSize = bangersfont.getTextSize(optionsText.value);
    
    let startX = screenWidth / 2 - startSize.width / 2;
    let optionsX = screenWidth / 2 - optionsSize.width / 2;
    
    if (state.selectedIndex === 0) {
        printWithChromatic(bangersfont, startX, 170, startText.value, Color.new(255, 255, 255, 255), true);
        printWithChromatic(bangersfont, optionsX, 195, optionsText.value, Color.new(80, 80, 80, 128), true);
    } else {
        printWithChromatic(bangersfont, startX, 170, startText.value, Color.new(80, 80, 80, 128), true);
        printWithChromatic(bangersfont, optionsX, 195, optionsText.value, Color.new(255, 255, 255, 255), true);
    }

    if (pad.justPressed(Pads.CROSS)) {
        if (state.selectedIndex === 0) {
            state.inStartScene = true;
            state.slotIndex = 0;
            state.slotConfirmed = false;
            state.confirmedSlotIndex = -1;
            state.characterIndex = 0;
        } else if (state.selectedIndex === 1) {
            state.inOptionsMenu = true;
            state.optionsIndex = 0;
        }
    }
}

function handleSlotSelection(state, assets, pad) {
    assets.interfacebg.draw(156, 58);

    if (!state.slotConfirmed) {
        if (pad.justPressed(Pads.UP)) {
            state.slotIndex = (state.slotIndex - 1 + 3) % 3;
        }
        if (pad.justPressed(Pads.DOWN)) {
            state.slotIndex = (state.slotIndex + 1) % 3;
        }
    }

    const slotPositions = [75, 74 + 85, 74 + 168];
    const newTextPositions = [100, 90 + 90, 99 + 170];

    if (!state.slotConfirmed) {
        assets.select1.draw(166, slotPositions[state.slotIndex]);
    }

    for (let i = 0; i < 3; i++) {
        if (i !== state.confirmedSlotIndex) {
            bangers.color = (i === state.slotIndex && !state.slotConfirmed)
                ? Color.new(255, 255, 255)
                : Color.new(0, 0, 0);
            bangers.print(300, newTextPositions[i], "NEW");
        }
    }

    if (pad.justPressed(Pads.CROSS) && !state.slotConfirmed) {
        state.slotConfirmed = true;
        state.confirmedSlotIndex = state.slotIndex;
    }

    if (state.slotConfirmed) {
        handleCharacterSelection(state, assets, pad, slotPositions);
    } else if (pad.justPressed(Pads.TRIANGLE)) {
        state.inStartScene = false;
    }
}

function handleCharacterSelection(state, assets, pad, slotPositions) {
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 70));

    if (pad.justPressed(Pads.LEFT)) {
        state.characterIndex = (state.characterIndex - 1 + 2) % 2;
    }
    if (pad.justPressed(Pads.RIGHT)) {
        state.characterIndex = (state.characterIndex + 1) % 2;
    }

    const headY = slotPositions[state.confirmedSlotIndex];
    const headCupX = 320;
    const headMugX = 400;

    if (state.characterIndex === 0) {
        assets.select1.draw(166, slotPositions[state.confirmedSlotIndex]);
        assets.headcupselected.draw(headCupX, headY);
        assets.headmugman.draw(headMugX, headY);
    } else {
        assets.select2.draw(166, slotPositions[state.confirmedSlotIndex]);
        assets.headcup.draw(headCupX, headY);
        assets.headmugmanselected.draw(headMugX, headY);
    }

    const textY = headY + 20;

    bangersfont2.color = Color.new(255, 255, 255);
    bangersfont2.scale = 0.6;
    bangersfont2.print(220 - 45, textY, "PLEASE SELECT A");
    bangersfont2.print(245 - 45, textY + 20, "PLAYER");

    if (pad.justPressed(Pads.TRIANGLE)) {
        state.slotConfirmed = false;
        state.confirmedSlotIndex = -1;
        state.characterIndex = 0;
    }
}

function handleOptionsMenu(state, assets, pad) {
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 50));
    assets.pausebg.draw(150, 125);

    if (pad.justPressed(Pads.UP)) {
        state.optionsIndex = (state.optionsIndex - 1 + state.optionsList.length) % state.optionsList.length;
    }
    if (pad.justPressed(Pads.DOWN)) {
        state.optionsIndex = (state.optionsIndex + 1) % state.optionsList.length;
    }

    const screenWidth = Screen.getMode().width;

    let itemPositions = [];
    for (let i = 0; i < state.optionsList.length; i++) {
        let text = state.optionsList[i];
        let size = bangersfont.getTextSize(text);
        let x = screenWidth / 2 - size.width / 2;
        let y = 150 + i * 26;
        itemPositions.push({x: x, y: y});
    }
    

    for (let i = 0; i < state.optionsList.length; i++) {
        const pos = itemPositions[i];
        const color = (i === state.optionsIndex)
            ? Color.new(255, 0, 0)
            : Color.new(20, 20, 20);
    
        printWithChromatic(bangersfont, pos.x, pos.y, state.optionsList[i], color, true);
    }

    if (pad.justPressed(Pads.CROSS)) {
        const selectedOption = state.optionsList[state.optionsIndex];
        if (selectedOption === "BACK") {
            state.inOptionsMenu = false;
        } else if (selectedOption === "LANGUAGE") {
            state.inLanguageMenu = true;
            state.inOptionsMenu = false;
            state.languageMenuIndex = 0;
        } else if (selectedOption === "AUDIO") {
            state.inAudioMenu = true;
            state.inOptionsMenu = false;
            state.audioIndex = 0;
        } else if (selectedOption === "VISUAL") {
            state.inVisualMenu = true;
            state.inOptionsMenu = false;
            state.visualIndex = 0;
        } else if (selectedOption === "CONTROLS") {
            state.inOptionsMenu = false;
            state.inControlsMenu = true;
        }
    }
}

function handleLanguageMenu(state, assets, pad) {

    if (!languageKeys.length) {
        loadLanguagesFromFile();
        state.currentLanguageIndex = languageKeys.indexOf(getConfig("Language", "language", "english"));
        if (state.currentLanguageIndex === -1) state.currentLanguageIndex = 0;
    }
    

    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 50));
    assets.pausebg.draw(150, 125);
    
    if (pad.justPressed(Pads.UP) || pad.justPressed(Pads.DOWN)) {
        state.languageMenuIndex = (state.languageMenuIndex + 1) % 2;
    }
    
    if (state.languageMenuIndex === 0) {
        if (pad.justPressed(Pads.LEFT)) {
            state.currentLanguageIndex = (state.currentLanguageIndex - 1 + languageKeys.length) % languageKeys.length;
            setLanguage(languageKeys[state.currentLanguageIndex]);
        }
        if (pad.justPressed(Pads.RIGHT)) {
            state.currentLanguageIndex = (state.currentLanguageIndex + 1) % languageKeys.length;
            setLanguage(languageKeys[state.currentLanguageIndex]);
        }
    }
    
    const languageText = languageLabels[state.currentLanguageIndex];
    const langColor = (state.languageMenuIndex === 0)
        ? Color.new(255, 0, 0)
        : Color.new(20, 20, 20);
    

    let langSize = bangersfont.getTextSize(languageText);
    let centerX = 640 / 2;
    let langX = centerX - langSize.width / 2;
    
    printWithChromatic(bangersfont, langX, 190, languageText, langColor, true);
    
    const backText = "BACK";
    const backColor = (state.languageMenuIndex === 1)
        ? Color.new(255, 0, 0)
        : Color.new(20, 20, 20);
    
    let backSize = bangersfont.getTextSize(backText);
    let backX = centerX - backSize.width / 2;
    
    printWithChromatic(bangersfont, backX, 250, backText, backColor, true);
    
    bangersfont2.scale = 0.6;
    bangersfont2.color = Color.new(60, 60, 60);
    
    const labelText = "LANGUAGE:";
    let labelSize = bangersfont2.getTextSize(labelText);
    let labelX = centerX - labelSize.width / 2;
    
    bangersfont2.print(labelX, 170, labelText);
    
    if (pad.justPressed(Pads.CROSS) && state.languageMenuIndex === 1) {
        state.inLanguageMenu = false;
        state.inOptionsMenu = true;
    }
}

function handleControlsMenu(state, assets, pad) {
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 50));
    assets.controlsbg.draw(20, 20);
    
    if (pad.justPressed(Pads.TRIANGLE)) {
        state.inControlsMenu = false;
        state.inOptionsMenu = true;
    }
}
function handleAudioMenu(state, assets, pad) {
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 50));
    assets.optionsbg.draw(169, 92);
    
    const audioOptions = ["MASTER VOLUME", "SFX VOLUME", "MUSIC VOLUME", "BACK"];
    const optionPositions = [
        { x: 190, y: 150 - 30 },
        { x: 245, y: 175 - 30 },
        { x: 210, y: 200 - 30 },
        { x: 287, y: 270 - 30 }
    ];

    let volumes = [state.masterVolume, state.sfxVolume, state.musicVolume];

    if (pad.justPressed(Pads.UP)) {
        state.audioIndex = (state.audioIndex - 1 + audioOptions.length) % audioOptions.length;
    }
    if (pad.justPressed(Pads.DOWN)) {
        state.audioIndex = (state.audioIndex + 1) % audioOptions.length;
    }

    if (pad.justPressed(Pads.RIGHT) && state.audioIndex < 3) {
        if (volumes[state.audioIndex] < 10) {
            volumes[state.audioIndex]++;
            updateVolumeINI(state.audioIndex, volumes[state.audioIndex]);
        }
    }
    if (pad.justPressed(Pads.LEFT) && state.audioIndex < 3) {
        if (volumes[state.audioIndex] > 0) {
            volumes[state.audioIndex]--;
            updateVolumeINI(state.audioIndex, volumes[state.audioIndex]);
        }
    }

    [state.masterVolume, state.sfxVolume, state.musicVolume] = volumes;

    for (let i = 0; i < audioOptions.length; i++) {
        const pos = optionPositions[i];
        const textColor = (i === 3 && i === state.audioIndex)
            ? Color.new(255, 0, 0)
            : Color.new(20, 20, 20);

        printWithChromatic(
            bangersfont,
            pos.x,
            pos.y,
            audioOptions[i] + (i < 3 ? ":" : ""),
            textColor,
            true
        );

        if (i < 3) {
            const level = volumes[i];
            let bar = "";
            
            for (let j = 0; j < 10; j++) {
                bar += (j === level - 1 ? "|" : "-");
            }

            const barColor = (i === state.audioIndex) ? Color.new(255, 0, 0) : Color.new(0, 0, 0);

            bangersfont2.scale = 0.7;
            bangersfont2.color = barColor;
            bangersfont2.print(395, 123 + i * 25, bar);
        }
    }

    if (pad.justPressed(Pads.CROSS) && state.audioIndex === 3) {
        state.inAudioMenu = false;
        state.inOptionsMenu = true;
    }
}
function handleVisualMenu(state, assets, pad) {
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 50));
    assets.optionsbg.draw(169, 92);
    
    const visualOptions = [
        "RESOLUTION",
        "ASPECT RATIO",
        "BRIGHTNESS",
        "VSYNC",
        "NOISE EFFECT",
        "DEBUG",
        "BACK"
    ];

    const startY = 110;
    const spacing = 22;

    const optionPositions = visualOptions.map((_, i) => {
        if (i === 6) return { x: 305, y: startY + spacing * i }; 
        return { x: 190, y: startY + spacing * i };
    });

    if (pad.justPressed(Pads.UP)) {
        state.visualIndex = (state.visualIndex - 1 + visualOptions.length) % visualOptions.length;
    }
    if (pad.justPressed(Pads.DOWN)) {
        state.visualIndex = (state.visualIndex + 1) % visualOptions.length;
    }

    if (pad.justPressed(Pads.LEFT)) {
        handleVisualMenuLeftInput(state);
    }

    if (pad.justPressed(Pads.RIGHT)) {
        handleVisualMenuRightInput(state);
    }

    for (let i = 0; i < visualOptions.length; i++) {
        const pos = optionPositions[i];
        const label = visualOptions[i];
        let color = (i === state.visualIndex) ? Color.new(255, 0, 0) : Color.new(20, 20, 20);
        let value = getVisualOptionValue(state, i);

        if (i === 6) {
            printWithChromatic(bangersfont, pos.x, pos.y, label, color, true, 0.7);
        } else {
            printWithChromatic(bangersfont, pos.x, pos.y, `${label}: ${value}`, color, true, 0.7);
        }
    }

    if (pad.justPressed(Pads.CROSS) && state.visualIndex === 6) {
        state.inVisualMenu = false;
        state.inOptionsMenu = true;
    }
}
function handleVisualMenuLeftInput(state) {
    switch (state.visualIndex) {
        case 0:
            state.resolutionIndex = (state.resolutionIndex - 1 + state.resolutions.length) % state.resolutions.length;
            break;
        case 1:
            state.aspectIndex = (state.aspectIndex - 1 + state.aspectRatios.length) % state.aspectRatios.length;
            break;
        case 2:
            adjustBrightness(false); 
            break;
        case 3:
            state.vsync = !state.vsync;
            setConfig("Video", "vsync", state.vsync);
            break;
        case 4:
            state.noiseEffect = !state.noiseEffect;
            setConfig("VisualEffects", "screenfx", state.noiseEffect);
            break;
        case 5:
            state.debugMode = !state.debugMode;
            setConfig("Debug", "enabled", state.debugMode);
            break;
    }
}
function handleVisualMenuRightInput(state) {
    switch (state.visualIndex) {
        case 0:
            state.resolutionIndex = (state.resolutionIndex + 1) % state.resolutions.length;
            break;
        case 1:
            state.aspectIndex = (state.aspectIndex + 1) % state.aspectRatios.length;
            break;
        case 2:
            adjustBrightness(true); 
            break;
        case 3:
            state.vsync = !state.vsync;
            setConfig("Video", "vsync", state.vsync);
            break;
        case 4:
            state.noiseEffect = !state.noiseEffect;
            setConfig("VisualEffects", "screenfx", state.noiseEffect);
            break;
        case 5:
            state.debugMode = !state.debugMode;
            setConfig("Debug", "enabled", state.debugMode);
            break;
    }
}
function getVisualOptionValue(state, optionIndex) {
    switch (optionIndex) {
        case 0: return state.resolutions[state.resolutionIndex];
        case 1: return state.aspectRatios[state.aspectIndex];
        case 2: return `${Math.round((1 - brightness) * 100)}%`;
        case 3: return state.vsync ? "ON" : "OFF";
        case 4: return state.noiseEffect ? "ON" : "OFF";
        case 5: return state.debugMode ? "ON" : "OFF";
        default: return "";
    }
}
function menuUpdate() {
    const pad = Pads.get(0);
    const assets = initMenuAssets();
    const state = createMenuState();

    renderScreen(() => {
        pad.update();
        assets.menu_background.draw(0, 0);
        
        if (state.inOptionsMenu) {
            handleOptionsMenu(state, assets, pad);
        } else if (state.inLanguageMenu) {
            handleLanguageMenu(state, assets, pad);
        } else if (state.inControlsMenu) {
            handleControlsMenu(state, assets, pad);
        } else if (state.inAudioMenu) {
            handleAudioMenu(state, assets, pad);
        } else if (state.inVisualMenu) {
            handleVisualMenu(state, assets, pad);
        } else if (!state.inStartScene) {
            handleMainMenu(state, assets, pad);
        } else {
            handleSlotSelection(state, assets, pad);
        }
    });
}
function adjustBrightness(up) {
    if (up) {
        brightness = Math.min(brightness + 0.1, 1); 
    } else {
        brightness = Math.max(brightness - 0.1, 0);
    }
    setConfig("Video", "brightness", brightness); 
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
         
            } else {
            
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
  
        let alphaBrightness = brightness * 255; 

        callback();
     
        if (getConfig("Debug", "enabled", false)) {
            DebugMemory();
        }

        

        if (getConfig("VisualEffects", "screenfx", false) && !DisableScreenFX) {
            drawScreenFX();
        }

        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, alphaBrightness));

    });
}



SceneManager.load(logoUpdate);
