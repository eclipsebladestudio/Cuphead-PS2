const canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;
Screen.setMode(canvas);

std.loadScript("Assets/Modules/fadec.js");
const fadeOut = new FadeOut('screen', 1, 255, false);  

console.log("imagesandconfigurations Loaded!!!");
let col1 = Color.new(255, 255, 255); 
let col2 = Color.new(21, 21, 21);   
let col3 = Color.new(255, 0, 0);   
const black = Color.new(0, 0, 0);
const red = Color.new(255,127,80);  
const orange = Color.new(255,127,80);  
const green = Color.new(50, 160, 50);
const white = Color.new(255, 255, 255);
const circle = new Image("Assets/Scenes/Menu/Textures/pads/circle.png");
const TRIANGLE = new Image("Assets/Scenes/Menu/Textures/pads/triangle.png");

const controlsMenu = new Image("Assets/Scenes/Menu/Textures/controlst.png");

const controlsMenuImage = new Image("host:/Assets/Scenes/Menu/Textures/controlsmenu.png")
const controlsMenuImage2 = new Image("host:/Assets/Scenes/Menu/Textures/controlsmenu2.png")


const fonta = new Font("host:/Assets/Font/bold.ttf");
const bold = new Font("host:/Assets/Font/bold.ttf");
bold.scale = 0.8;

const Background = new Image("host:/Assets/Scenes/Menu/Textures/Menubg.png");
Background.width = 640;
Background.height = 448;

const select_img = new Image("host:/Assets/Scenes/Menu/Textures/select.png");

const FX2 = [];
for (let i = 1; i <= 20; i++) {
  FX2.push(new Image(`host:/Assets/Scenes/ScreenFX/${i}.png`));
}

const transitionbImages = [];
for (let i = 1; i <= 15; i++) {
  transitionbImages.push(new Image(`host:/Assets/Scenes/Transition/${i}.png`));
}

const interfaceImage = new Image("host:/Assets/Scenes/Menu/Textures/pause.png");
const interfaceImage2 = new Image("host:/Assets/Scenes/Menu/Textures/interface.png");
const interfaceImage3 = new Image("host:/Assets/Scenes/Menu/Textures/options.png");

interfaceImage2.width = 328;
interfaceImage2.height = 322;

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;

const transitionbSpeed = 50;
let transitionbIndex = 0;
let transitionbActive = false;
let transitionbCompleted = false;
let lastTransitionbUpdateTime = Date.now();
let showBlackScreen2 = false;
const slot = new Image("host:/Assets/Scenes/Menu/Textures/slot.png");
const fillImage = new Image("host:/Assets/Scenes/Menu/Textures/select.png");
const studiologo = new Image("host:/Assets/Scenes/Menu/Textures/studiologo.png")


let pad = Pads.get();
let stop = false;

let showSelectText = false;

const loadScript = (scriptName) => {
  const baseDir = "host:/Assets/Scripts/SubScripts/";
  std.loadScript(`${baseDir}${scriptName}.js`);
};

const cross = new Image("Assets/Scenes/Menu/Textures/pads/Cross.png");

const scripts = [
  "config",
  "Audio",
  "Language"
];

scripts.forEach(script => loadScript(script));


console.log("deleteImages Loaded!!!");
function deleteImages() {
    FX2.forEach(image => image = null);
    FX2.length = 0;
    transitionbImages.forEach(image => image = null);
    transitionbImages.length = 0;

      std.gc();
    
  }

console.log("menuandsubmenu Loaded!!!");






























//BEFORE GAMEPLAY


console.log("beforegameplay Loaded!!!");
console.log("Teste 1");
var bold2 = new Font("Assets/Font/bold.ttf");
var bold3 = new Font("Assets/Font/bold.ttf");
var text_new = new Font("Assets/Font/bold.ttf");
var text_player = new Font("default");
text_player.scale = 0.6;
text_new.color = Color.new(29,29,29);
text_new.scale = 0.8;

console.log("Teste 2");
var isInInterfaceP = false;
var inter = new Image("Assets/Scenes/Menu/Textures/interface.png");
console.log("Teste 3");
var zz = text_new.getTextSize("NEW");
var centerx = 173 + (294 - zz.width) / 2;
var frames_head_player1 = [];
var frames_head_player2 = [];
var option_player_1 = 1;
var direction_player = false;
var play_animation = false;
var time_anim = null;
var head = [1, 0];
console.log("Teste 4");
var interf = false;
var transparent = false;
var option_save = 1;
var scph = false;
console.log("Teste 5");
function loadImgHead() {
  for (var z = 1; z < 9; z++) {
    frames_head_player1.push(new Image("Assets/Scenes/Menu/Textures/players/cuphead/HEAD_MENU/" + z + ".png"));
  }
  for (var p = 1; p < 9; p++) {
    frames_head_player2.push(new Image("Assets/Scenes/Menu/Textures/players/mugman/HEAD_MENU/" + p + ".png"));
  }
}

function loadFrameHead(frame, width, height, x, y) {
  if (frames_head_player1[frame] && frames_head_player1[frame].ready()) {
    frames_head_player1[frame].width = width;
    frames_head_player1[frame].height = height;
    frames_head_player1[frame].draw(x, y);
  }
}

function loadFrameHead2(frame, width, height, x, y) {
  if (frames_head_player2[frame] && frames_head_player2[frame].ready()) {
    frames_head_player2[frame].width = width;
    frames_head_player2[frame].height = height;
    frames_head_player2[frame].draw(x, y);
  }
}

function checkSaveFiles() {
  var saveFiles = [
      "Saves/cuphead_player_data_v1_slot_0.sav",
      "Saves/cuphead_player_data_v1_slot_1.sav",
      "Saves/cuphead_player_data_v1_slot_2.sav",
  ];

  var foundSave = [false, false, false]; 

  for (let i = 0; i < saveFiles.length; i++) {
      if (std.exists(saveFiles[i])) {
          console.log("O arquivo " + saveFiles[i] + " existe.");
          foundSave[i] = true;
         
      } else {
          console.log("O arquivo " + saveFiles[i] + " não existe.");
      }
  }

  return foundSave; 
}

var saveStatus = checkSaveFiles();
console.log("Status dos Saves: ", saveStatus);

var headvelocity = 0.0009; 

var fadeOutAlpha = 0;
var fadeOutInProgress = false; 

function drawInterfaceP() {
  Background.draw(0, 0);

  

  if (interf) {
    inter.width = 328;
    inter.height = 322;
    slot.width = 294;
    slot.height = 73;
    select_img.width = 294;
    select_img.height = 73;

    inter.draw(canvas.width / 2 - inter.width / 2, canvas.height / 2 - inter.height / 2);

    slot.draw(173, 80);
    slot.draw(173, 167);
    slot.draw(173, 254);

    text_new.scale = 0.8;
    var textColor = Color.new(29, 29, 29); 



    

    cross.draw(440, 420);
    fonta.scale = 0.5;
    fonta.print(382, 413,"CONFIRM");

    circle.draw(520, 420);
    fonta.print(477, 413,"DELETE");

    TRIANGLE.draw(595, 420);
    fonta.print(562, 413,"BACK");







    text_new.color = textColor;
    var saveMessages = ["NEW", "NEW", "NEW"];
var savePercentages = [0, 0, 0]; 

for (var i = 0; i < saveStatus.length; i++) {
    if (saveStatus[i]) {
        savePercentages[i] = 1; 
    }
}

var offsetX = 55;

for (var i = 0; i < 3; i++) {

  if (saveStatus[i]) {
        text_new.print(centerx - offsetX, 65 + (73 - zz.height) / 2 + (i * 87), "CUPHEAD " + String.fromCharCode(65 + i) + " - " + savePercentages[i] + "%");
        text_new.print(centerx - offsetX, 90 + (73 - zz.height) / 2 + (i * 87), "Inkwell Isle One"); 
    } else {
        text_new.print(centerx, 80 + (73 - zz.height) / 2 + (i * 87), saveMessages[i]);
    }
}

if (!transparent) {
    switch (option_save) {
        case 1:
            select_img.draw(173, 80);
            text_new.color = Color.new(255, 255, 255);
            if (saveStatus[0]) {
                text_new.print(centerx - offsetX, 65 + (73 - zz.height) / 2, "CUPHEAD A - " + savePercentages[0] + "%");
                text_new.print(centerx - offsetX, 90 + (73 - zz.height) / 2, "Inkwell Isle One"); 
            } else {
                text_new.print(centerx, 80 + (73 - zz.height) / 2, saveMessages[0]);
            }
            break;

        case 2:
            select_img.draw(173, 167);
            text_new.color = Color.new(255, 255, 255);
            if (saveStatus[1]) {
                text_new.print(centerx - offsetX, 157 + (73 - zz.height) / 2, "CUPHEAD B - " + savePercentages[1] + "%");
                text_new.print(centerx - offsetX, 187 + (73 - zz.height) / 2, "Inkwell Isle One"); 
            } else {
                text_new.print(centerx, 167 + (73 - zz.height) / 2, saveMessages[1]);
            }
            break;

        case 3:
            select_img.draw(173, 254);
            text_new.color = Color.new(255, 255, 255);
            if (saveStatus[2]) {
                text_new.print(centerx - offsetX, 254 + (73 - zz.height) / 2, "CUPHEAD C - " + savePercentages[2] + "%");
                text_new.print(centerx - offsetX, 274 + (73 - zz.height) / 2, "Inkwell Isle One"); 
            } else {
                text_new.print(centerx, 254 + (73 - zz.height) / 2, saveMessages[2]);
            }
            break;
    }
}


    if (pad.justPressed(Pads.CROSS) && !transparent) {
      playSoundSelect();
      transparent = true;
      scph = false;
    }

    if (transparent) {
      Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 85));
      select_img.width = 296;
      select_img.height = 75;

      switch (option_save) {
        case 1:
          select_img.draw(173, 80);
          if (option_player_1 == 2) {
            Draw.rect(173, 80, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.scale = 0.6;
          text_player.print(184, 93, "PLEASE SELECT");
          text_player.print(184, 110, "A PLAYER");
          loadFrameHead(head[0], 59, 59, 327, 85);
          loadFrameHead2(head[1], 59, 59, 396, 85);
          break;
        case 2:
          select_img.draw(173, 167);
          if (option_player_1 == 2) {
            Draw.rect(173, 167, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.scale = 0.6;
          text_player.print(184, 180, "PLEASE SELECT");
          text_player.print(184, 197, "A PLAYER");
          loadFrameHead(head[0], 59, 59, 327, 172);
          loadFrameHead2(head[1], 59, 59, 396, 172);
          break;
        case 3:
          select_img.draw(173, 254);
          if (option_player_1 == 2) {
            Draw.rect(173, 254, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.scale = 0.6;
          text_player.print(184, 267, "PLEASE SELECT");
          text_player.print(184, 284, "A PLAYER");
          loadFrameHead(head[0], 59, 59, 327, 259);
          loadFrameHead2(head[1], 59, 59, 396, 259);
          break;
      }

      if (pad.justPressed(Pads.CROSS) && transparent && !play_animation && scph) {
        time_anim = Timer.new();
        Timer.reset(time_anim);
        Timer.setTime(time_anim, 0);
        Timer.resume(time_anim);
        play_animation = true;
      }
      scph = true;

      if (fadeOutInProgress) {
        Draw.rect(0, 0, canvas.width, canvas.height, Color.new(0, 0, 0, fadeOutAlpha));
        if (fadeOutAlpha < 255) {
          fadeOutAlpha += 5; 
        } else {
          fadeOutInProgress = false; 
          console.log("Loading Book...");
          System.loadELF(System.loadELF(System.boot_path + "/book.ini", ["Assets/Scenes/StoryBook/book.js"]));
        }
      }

      if (play_animation) {
        if (Timer.getTime(time_anim) >= 50 / headvelocity) { 
            Timer.setTime(time_anim, 0);
            if (head[0] == 7 || head[1] == 7) {
                direction_player = true;
            }
            if (head[0] == 2 || head[1] == 2) {
                if (direction_player) {
                  
                    Sound.pause(audio, audioSlot);
                    fadeOutInProgress = true; 
    fadeOutAlpha = 0;
                }
            }

          if (!direction_player) {
            switch (option_player_1) {
              case 1:
                head[0]++;
                break;
              case 2:
                head[1]++;
                break;
            }
          }
          if (direction_player) {
            switch (option_player_1) {
              case 1:
                head[0]--;
                break;
              case 2:
                head[1]--;
                break;
            }
          }

        }
      }
    }
  }
}


function handlebeforegameplayMenu() {

  if (pad.justPressed(Pads.TRIANGLE) && !stop) {
  isInInterfaceP = false;
  }

  if (pad.justPressed(Pads.DOWN) && !stop) {
    if (option_save === 3) {
      option_save = 1;
    } else {
      option_save++;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.UP) && !stop) {
    if (option_save === 1) {
      option_save = 3;
    } else {
      option_save--;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.CROSS) && !stop) {
    playSoundSelect();
    stop = true;
    interf = true;

  }

  if (pad.justPressed(Pads.RIGHT) && !play_animation) {
    if (option_player_1 === 2) {
      option_player_1 = 1;
      head[0] = 1;
      head[1] = 0;
    } else {
      option_player_1 = 2;
      head[0] = 0;
      head[1] = 1;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.LEFT) && !play_animation) {
    if (option_player_1 === 1) {
      option_player_1 = 2;
      head[0] = 0;
      head[1] = 1;
    } else {
      option_player_1 = 1;
      head[0] = 1;
      head[1] = 0;
    }
    playSoundSelect();
  }
  drawInterfaceP();
}
console.log("Teste 6");
loadImgHead();
console.log("Teste 7");
interf = true;
console.log("Done!!!");








//VISUAL MENU













console.log("visualmenu Loaded!!!");
let isInVisualMenu = false;
let visualMenuOption = 1;
let vsyncEnabled = false;
let currentScreenModeIndex = 0;
let currentAspectRatioIndex = 0;

const screenModes = [
  { name: "NTSC(480i)", mode: NTSC, width: 640, height: 448, interlace: INTERLACED, field: FIELD },
  { name: "PAL(576i)", mode: PAL, width: 640, height: 512, interlace: INTERLACED, field: FIELD },
  { name: "480p", mode: DTV_480p, width: 640, height: 480, interlace: PROGRESSIVE, field: FRAME },
  { name: "720p", mode: DTV_720p, width: 960, height: 720, interlace: PROGRESSIVE, field: FRAME }
];

const aspectRatios = [
  "1:1",
  "5:4",
  "4:3",
  "3:2",
  "16:10",
  "16:9",
  "16.5:9",
  "17:9",
  "17.5:9",
  "18:9",
  "18.5:9",
  "19:9",
  "19.5:9",
  "20:9",
  "21:9",
  "32:9"
];

function drawVisualMenu() {
  Background.draw(0, 0);

  const offsetX = (canvas.width - interfaceImage.width) / 2;
  const offsetY = -17;
  interfaceImage3.draw((canvas.width - interfaceImage2.width) / 2, (canvas.height - interfaceImage2.height) / 2 - offsetY);

  bold.scale = 0.6;

  const options = [
    { label: "Screen Mode:", value: screenModes[currentScreenModeIndex].name },
    { label: "Aspect Ratio:", value: aspectRatios[currentAspectRatioIndex] },
    { label: "Brightness:", value: "Unavailable" },
    { label: "Vsync:", value: vsyncEnabled ? "On" : "Off" }
  ];

  options.forEach((option, index) => {
    const isSelected = (visualMenuOption === index + 1);
    const labelColor = col2; 
    const valueColor = isSelected ? Color.new(255, 0, 0) : Color.new(21, 21, 21); 

    bold.color = labelColor;
    bold.print(175, 100 + index * 20, option.label); 

    bold.color = valueColor;
    bold.print(285, 100 + index * 20, option.value); 
  });

  const backLabel = "BACK";
  const backColor = visualMenuOption === 5 ? Color.new(255, 0, 0) : col2; 

  bold.color = backColor;
  bold.print((canvas.width - 60) / 2, 100 + options.length * 20 + 30, backLabel); 
}

function handleVisualMenu() {
  if (pad.justPressed(Pads.DOWN)) {
    visualMenuOption = visualMenuOption < 5 ? visualMenuOption + 1 : 1;
    playSoundSelect();
  }
  if (pad.justPressed(Pads.UP)) {
    visualMenuOption = visualMenuOption > 1 ? visualMenuOption - 1 : 5;
    playSoundSelect();
  }


  if (pad.justPressed(Pads.RIGHT) || pad.justPressed(Pads.LEFT)) {
    if (visualMenuOption === 1) { 
      currentScreenModeIndex = (pad.justPressed(Pads.RIGHT)) ? 
        (currentScreenModeIndex + 1) % screenModes.length : 
        (currentScreenModeIndex - 1 + screenModes.length) % screenModes.length;
      const mode = screenModes[currentScreenModeIndex];
      Screen.setMode(mode.mode, mode.width, mode.height, CT16S, mode.interlace, mode.field);
    }
    if (visualMenuOption === 2) {
      currentAspectRatioIndex = (pad.justPressed(Pads.RIGHT)) ? 
        (currentAspectRatioIndex + 1) % aspectRatios.length : 
        (currentAspectRatioIndex - 1 + aspectRatios.length) % aspectRatios.length;

    }
    if (visualMenuOption === 4) { 
      vsyncEnabled = !vsyncEnabled;
      Screen.setVSync(vsyncEnabled);  
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.TRIANGLE) || (visualMenuOption === 5 && pad.justPressed(Pads.RIGHT))) {
    isInVisualMenu = false;
    playSoundSelect();
  }

  drawVisualMenu();
}







//CONTROLSMENU


console.log("AudioMenu Loaded!!!");
let isInAudioMenu = false;
let audioMenuOption = 1;


const originalBoldScale = 0.9;


function drawVolumeBar(x, y, volume, maxVolume = 10, isSelected = false) {
    const selectedColor = col3;
    const nonSelectedColor = col2; 
    
    let volumeBar = '';
  
    for (let i = 0; i < maxVolume; i++) {
      volumeBar += '-';
    }
  
    volumeBar = volumeBar.substring(0, maxVolume - volume) + '|' + volumeBar.substring(maxVolume - volume + 1);
  
    bold.color = isSelected ? selectedColor : nonSelectedColor;
    bold.print(x, y, volumeBar.substring(0, maxVolume - volume + 1));
    
    bold.color = nonSelectedColor;
    bold.print(x + bold.getTextSize(volumeBar.substring(0, maxVolume - volume + 1)).width, y, volumeBar.substring(maxVolume - volume + 1));
}


function drawAudioMenu() {
    Background.draw(0, 0);
  
    const offsetX = (canvas.width - interfaceImage.width) / 2;
    const offsetY = -17;
    interfaceImage3.draw((canvas.width - interfaceImage2.width) / 2, (canvas.height - interfaceImage2.height) / 2 - offsetY);
  
    const options = [
      { label: "Main Volume:", value: config.audio.mainVolume },
      { label: "Sound Effects:", value: config.audio.soundEffects },
      { label: "Music:", value: config.audio.music },
      { label: "Back" }
    ];
  

    bold.scale = 0.6;
    const baseYPosition = canvas.height / 2 - 130;
    const baseXPosition = offsetX + 30;
  
    options.forEach((option, index) => {
      const yPosition = baseYPosition + index * 20;
  
      if (index < 3) {
        bold.color = audioMenuOption === index + 1 ? col2 : col2;
  
        console.log(`Drawing option ${index}: ${option.label}`);
        const labelWidth = bold.getTextSize(option.label).width;
        bold.print(baseXPosition, yPosition, option.label);
        drawVolumeBar(offsetX + 180, yPosition, option.value, 10, audioMenuOption === index + 1);
      } else {
        const backTextWidth = bold.getTextSize(option.label).width;
        const backXPosition = (canvas.width - backTextWidth) / 2;
        const backYPosition = baseYPosition + 80;
  
        bold.color = audioMenuOption === 4 ? col3 : col2;
        bold.print(backXPosition, backYPosition, option.label);
      }
    });

    
    resetFontScale();
}

function resetFontScale() {
    bold.scale = originalBoldScale;
}






























//CONTROLS MENU 


console.log("controlsmenu Loaded!!!");
  
let isInControlsMenu = false;
let controlOption = 1;
let isPlayerTwo = false;
let isRumbleOn = false;
let isSelectingPlayerOne = false;
let selectedOption = 1; 

const boxWidth = 130;
const boxHeightOptions = 18;
const textPadding = -10;
const boxSpacing = 5;

const fonta3 = new Font("host:/Assets/Font/ep.otf");
const fonta2 = new Font("host:/Assets/Font/ep2.otf");
const fonta5 = new Font("host:/Assets/Font/controls.otf");
const fonta4 = new Font("host:/Assets/Font/ep.otf");

fonta5.scale = 0.5;
fonta3.scale = 0.5;
fonta2.scale = 0.5;
fonta4.scale = 0.8;

let buttonConfigs = {
    "Move horizontal": "Unknown",
    "Move right": "Unknown",
    "Move left": "Unknown",
    "Move vertical": "Unknown",
    "Move Up": "Unknown",
    "Move down": "Unknown",
    "Jump": "Unknown",
    "Shoot": "Unknown",
    "Ex Shoot": "Unknown",
    "Switch weapon": "Unknown",
    "Lock": "Unknown",
    "Dash": "Unknown",
    "Flip X - AXIS": "Unknown",
    "Flip Y - AXIS": "Unknown"
};

function getTextWidth(font, text) {
    var characterWidth = 10 * font.scale;
    return text.length * characterWidth;
}

function drawFilledBox(x, y, width, height, color) {
    Draw.rect(x, y, width, height, color); 
}

function drawOutlineBox(x, y, width, height, color) {
    Draw.line(x, y, x + width, y, color);
    Draw.line(x, y, x, y + height, color);
    Draw.line(x + width, y, x + width, y + height, color);
    Draw.line(x, y + height, x + width, y + height, color);
}

function drawCheckBox(x, y, size, isChecked, color) {
    drawOutlineBox(x, y, size, size, color);
    
    if (isChecked) {
        Draw.line(x + 2, y + 2, x + size - 2, y + size - 2, color);
        Draw.line(x + size - 2, y + 2, x + 2, y + size - 2, color);
    }
}

function drawRedRectangle(x, y, width, height, transparency) {
    const redColor = Color.new(255, 0, 0, transparency); 
    drawFilledBox(x, y, width, height, redColor);
}

function drawControlsMenu() {
    Background.draw(0, 0);

    if (isPlayerTwo) {
        controlsMenuImage2.draw((canvas.width - controlsMenuImage2.width) / 2, (canvas.height - controlsMenuImage2.height) / 2);
    } else {
        controlsMenuImage.draw((canvas.width - controlsMenuImage.width) / 2, (canvas.height - controlsMenuImage.height) / 2);
    }

    fonta4.color = col1;
    const titleText = "CONTROLS";
    fonta4.print(55, 50, titleText);

    const actions = [
        "Move horizontal", "Move right", "Move left", "Move vertical", "Move Up", "Move down",
        "Jump", "Shoot", "Ex Shoot", "Switch weapon", "Lock", "Dash", "Flip X - AXIS", "Flip Y - AXIS"
    ];

    fonta3.color = col2;
    fonta3.print((canvas.width / 2) - 120, (canvas.height / 2) - 180, "ACTIONS");

    const boxHeight = 23;
    const baseYPosition = canvas.height / 2 - 150;
    
    const baseXPosition = canvas.width / 2 - 120;
    const baseXPosition2 = canvas.width / 2 - 275;
    const baseXPosition3 = canvas.width / 2 - 260;

    actions.forEach((action, index) => {
        const yPosition = baseYPosition + index * boxHeight;
        fonta2.color = col2;
        fonta2.print(baseXPosition, yPosition, action);
    
        if (action === "Flip X - AXIS" || action === "Flip Y - AXIS") {
            const isChecked = buttonConfigs[action] === "Selected";
            drawCheckBox(baseXPosition + 150, yPosition + 12, 12, isChecked, col2);
        } else {
            const buttonConfig = buttonConfigs[action] || "Unknown";
            fonta2.print(baseXPosition + 150, yPosition, buttonConfig);
        }

        if (isSelectingPlayerOne && selectedOption === index + 1) {
            drawRedRectangle(baseXPosition + 150, yPosition + 8, boxWidth, 18, 50); 
        }
    });


    const menuOptions = ["Done", "Restore Defaults", "Rumble: " + (isRumbleOn ? "ON" : "OFF")];
    const optionsBaseY = canvas.height / 2 - 120;

    menuOptions.forEach((option, index) => {
        const yPosition = optionsBaseY + index * (boxHeightOptions + boxSpacing);
        const textWidth = getTextWidth(fonta2, option);

        let textColor = isPlayerTwo ? green : red;

        if (controlOption === index + 1) {
            drawFilledBox(baseXPosition2, yPosition, boxWidth, boxHeightOptions, white);
            fonta2.color = textColor;
        } else {
            fonta2.color = white;
            drawOutlineBox(baseXPosition2, yPosition, boxWidth, boxHeightOptions, white);
        }

        const centeredX = baseXPosition2 + (boxWidth - textWidth) / 2;
        fonta2.print(centeredX, yPosition + textPadding, option);
    });

    fonta5.color = controlOption === 4 ? white : (isPlayerTwo ? col2 : col2);
    fonta5.print(baseXPosition3 + 10, optionsBaseY + 3 * (boxHeightOptions + boxSpacing) + 10, "- Player One -");

    fonta5.color = controlOption === 5 ? white : (isPlayerTwo ? col2 : col2);
    studiologo.draw(38, 300);
    fonta5.print(baseXPosition3 + 10, optionsBaseY + 4 * (boxHeightOptions + boxSpacing) + 10, "- Player Two -");
}

function togglePlayer() {
    isPlayerTwo = !isPlayerTwo;
}

loadButtonConfigs();


let isInButtonConfigMenu = false;
let replaceOption = 1;  
const options = ["Replace", "Remove", "Cancel"];

let selectedActionText = "";  
function drawReplaceMenu() {
    drawControlsMenu();
    Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 85));
    controlsMenu.draw((canvas.width - controlsMenu.width) / 2, (canvas.height - controlsMenu.height) / 2);

    const menuY = canvas.height / 2;
    const optionSpacing = 90;
    const boxHeight = 18;
    const boxWidth = 90;
    const offsetX = -20;
    const offsetY = 65;

    fonta4.color = black;

    const actionTextWidth = getTextWidth(fonta4, selectedActionText);
    const centeredActionX = (canvas.width - actionTextWidth) / 2 - 10;
    fonta4.print(centeredActionX, menuY - 85, selectedActionText);  

    const buttonConfig = buttonConfigs[selectedActionText] || "Unknown"; 
    const buttonConfigWidth = getTextWidth(fonta2, buttonConfig);
    const centeredButtonX = (canvas.width - buttonConfigWidth) / 2 - 10; 
    fonta2.color = Color.new(21, 21, 21);  
    fonta2.print(centeredButtonX, menuY - 60, buttonConfig);

    options.forEach((option, index) => {
        const xPosition = (canvas.width - options.length * optionSpacing) / 2 + index * optionSpacing + offsetX;
        const textWidth = getTextWidth(fonta2, option);
        const centeredX = xPosition + (boxWidth - textWidth) / 2;
        const adjustedMenuY = menuY + offsetY;

        if (replaceOption === index + 1) {
            drawOutlineBox(centeredX - 10, adjustedMenuY - 10, boxWidth, boxHeight, col2);
            drawFilledBox(centeredX - 10, adjustedMenuY - 10, boxWidth, boxHeight, orange);
        } else {
            drawOutlineBox(centeredX - 10, adjustedMenuY - 10, boxWidth, boxHeight, col2);
        }

        fonta2.color = col2;
        fonta2.print(centeredX + 15, adjustedMenuY + (boxHeight / 2) - 30, option);
    });
}

function updateSelectedAction(action) {
    selectedActionText = action; 
}

function handleControlsMenu() {
    if (isInButtonConfigMenu) {

        if (pad.justPressed(Pads.CIRCLE) && !stop) {
            isInButtonConfigMenu = false;
            playSoundSelect();
        }

        if (pad.justPressed(Pads.RIGHT) && !stop) {
            replaceOption = (replaceOption % options.length) + 1;  
            playSoundSelect();
        }

        if (pad.justPressed(Pads.LEFT) && !stop) {
            replaceOption = replaceOption === 1 ? options.length : replaceOption - 1;
            playSoundSelect();
        }

        if (pad.justPressed(Pads.CROSS) && !stop) {
            switch (replaceOption) {
                case 1: 
      
                    break;
                case 2:
                    buttonConfigs[selectedActionText] = " "; 
            saveButtonConfigs(); 
     
                    break;
                case 3: 
                    isInButtonConfigMenu = false;
                    break;
            }
            playSoundSelect();
        }

        drawReplaceMenu(); 
    } else {
        
        if (pad.justPressed(Pads.CIRCLE) && !stop) {
            if (isSelectingPlayerOne) { 
                isSelectingPlayerOne = false;
                isInControlsMenu = false;
                isInSubmenu = true;
            } else {
                isInControlsMenu = false;
                isInSubmenu = true;
            }
            playSoundSelect();
        }

        if (pad.justPressed(Pads.DOWN) && !stop) {
            if (isSelectingPlayerOne) {
                selectedOption = selectedOption === 14 ? 1 : selectedOption + 1;
            } else {
                controlOption = controlOption === 5 ? 1 : controlOption + 1;
            }
            playSoundSelect();
        }

        if (pad.justPressed(Pads.UP) && !stop) {
            if (isSelectingPlayerOne) {
                selectedOption = selectedOption === 1 ? 14 : selectedOption - 1;
            } else {
                controlOption = controlOption === 1 ? 5 : controlOption - 1;
            }
            playSoundSelect();
        }

        if (pad.justPressed(Pads.CROSS) && !stop) {
            if (isSelectingPlayerOne) {
                if (selectedOption >= 1 && selectedOption <= 14) { 
                    currentButtonConfig = Object.keys(buttonConfigs)[selectedOption - 1];
                    selectedActionText = currentButtonConfig; 
                    isInButtonConfigMenu = true;
                    playSoundSelect();
                }
            } else {
                switch (controlOption) {
                    case 1:
                        isInControlsMenu = false;
                        playSoundSelect();
                        break;
                    case 2:
                        playSoundSelect();
                        break;
                    case 3:
                        isRumbleOn = !isRumbleOn;
                        if (isRumbleOn) {
                            Pads.rumble(0, 1.0, 0.5);
                        } else {
                            Pads.rumble(0, 0, 0);
                        }
                        playSoundSelect();
                        break;
                    case 4:
                        isSelectingPlayerOne = true;
                        playSoundSelect();
                        break;
                    case 5:
                        isPlayerTwo = true;
                        playSoundSelect();
                        break;
                }
            }
        }

        drawControlsMenu();  
    }
}







//LANGUAGE MENU

console.log("Languagemenu Loaded!!!");
let isInLanguageMenu = false; 

function drawLanguageMenu(textKey) {
    let text = texts[textKey] || textKey;
    Background.draw(0, 0);
    
  
    const offsetY = -17; 
    interfaceImage.draw((canvas.width - interfaceImage.width) / 2, (canvas.height - interfaceImage.height) / 2 - offsetY);
  
    drawSubmenuOption("language", canvas.height / 2 - 35, false);
    drawSubmenuOption(languages[currentLanguageIndex], canvas.height / 2 - 15, submenuOption === 1);
    drawSubmenuOption("back", canvas.height / 2 + 25, submenuOption === 2);
  }

function handleLanguageMenu() {

    if (pad.justPressed(Pads.LEFT) && !stop) {
      currentLanguageIndex = currentLanguageIndex === 0 ? languages.length - 1 : currentLanguageIndex - 1;
      loadLanguage(languages[currentLanguageIndex]);
      playSoundSelect();
    }

    if (pad.justPressed(Pads.RIGHT) && !stop) {
      currentLanguageIndex = currentLanguageIndex === languages.length - 1 ? 0 : currentLanguageIndex + 1;
      loadLanguage(languages[currentLanguageIndex]);
      playSoundSelect();
    }

    if (pad.justPressed(Pads.DOWN) && !stop) {
      submenuOption = submenuOption === 2 ? 1 : submenuOption + 1;
      playSoundSelect();
    }

    if (pad.justPressed(Pads.UP) && !stop) {
      submenuOption = submenuOption === 1 ? 2 : submenuOption - 1; 
      playSoundSelect();
    }

    if (pad.justPressed(Pads.CROSS) && !stop) {
      if (submenuOption === 2) { 
        isInLanguageMenu = false; 
        isInSubmenu = true;
        playSoundSelect();
      } else {
        playSoundSelect();
      }
    }

    drawLanguageMenu();

}






//MENU AND SUBMENU
let option = 1;
let submenuOption = 1;
let isInSubmenu = false;

function drawMenuOption(textKey, y, isSelected) {
  let text = texts[textKey] || textKey; 
  let size = bold.getTextSize(text); 
  let textColor = isSelected ? col1 : col2;

  bold.color = textColor;

  let x = (canvas.width - size.width) / 2;
  
  let verticalOffset = y;

  bold.print(x, verticalOffset, text);
}

function drawSubmenuOption(textKey, y, isSelected) {
  let text = texts[textKey] || textKey;
  let size = bold.getTextSize(text);
  let textColor = isSelected ? col3 : col2; 

  bold.color = textColor;
  let x = (canvas.width - size.width) / 2;
  let verticalOffset = y - (size.height / 2);
  bold.print(x, verticalOffset, text);
}









//CREDITS

function Credits() {
  
  var gray = Color.new(11, 11, 11, 255);
  var logoebd = new Image("host:/Assets/Scenes/Menu/Textures/eclipse_credits_final.png");
  var fant = new Font("host:/Assets/Font/bold.ttf");
  fant.scale = 1;

  var fx3 = [];
  for (let i = 1; i <= 10; i++) {
      fx3.push(new Image(`host:/Assets/Scenes/ScreenFX/${i}.png`));
  }
  let fx3Index = 0;
  let fx3Direction = 1;
  let lastFx3UpdateTime = Date.now();
  var fx3AnimationSpeed = 20;

  var lineSpacing = 30;
  var initialFontSize = 12;  
  var maxFontSize = 14;
  var scrollSpeed = 0.3;

  let startCredits = false;
  let introStartTime = Date.now();
  let creditsOffset = canvas.height;
  let logoStartTime = null;
  let showingLogo = false;
  var introDuration = 6000;
  var logoDuration = 5000;

  
  Sound.play(credit, audioSlot3);

  let texts = {};
  const introText = [
      texts["intro_text1"] || "Before starting, none of this would be possible in this capacity",
      texts["intro_text2"] || "without the help of Daniel Santos, creator of the AthenaENV engine,",
      texts["intro_text3"] || "among other projects. I thank Daniel in advance for everything he",
      texts["intro_text4"] || "has done to help us. Thank you very much, Mr. Daniel."
  ];

  const textLines = [
      { text: texts["owners_title"] || "Owners", color: Color.new(255, 0, 0) },
      { text: texts["owners_name"] || "NGM MODS", color: Color.new(255, 255, 255) },
      { text: texts["owners_member"] || "Daviz7", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["co_owner_title"] || "Co-Owner", color: Color.new(255, 0, 0) },
      { text: texts["co_owner_name"] || "Lucas Teles", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["tools_title"] || "Tools", color: Color.new(255, 0, 0) },
      { text: texts["tools_name"] || "Lucas Teles", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["ui_programming_title"] || "UI Programming", color: Color.new(255, 0, 0) },
      { text: texts["ui_programming_team1"] || "NGM MODS", color: Color.new(255, 255, 255) },
      { text: texts["ui_programming_team2"] || "Daviz7", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["gameplay_programming_title"] || "Gameplay Programming", color: Color.new(255, 0, 0) },
      { text: texts["gameplay_programming_team1"] || "Fatality", color: Color.new(255, 255, 255) },
      { text: texts["gameplay_programming_team2"] || "Devecoisas", color: Color.new(255, 255, 255) },
      { text: texts["gameplay_programming_team3"] || "Axel", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["design_title"] || "Designer", color: Color.new(255, 0, 0) },
      { text: texts["design_name"] || "Tayklor", color: Color.new(255, 255, 255) },
      { text: texts["design_name"] || "Saimon", color: Color.new(255, 255, 255) },
      { text: "", color: Color.new(255, 255, 255) },
      { text: texts["honorable_mentions_title"] || "Honorable Mentions", color: Color.new(255, 0, 0) },
      { text: texts["honorable_mentions_text"] || "Zeca Apelão For sprites and sounds help", color: Color.new(255, 255, 255) },
      { text: texts["honorable_mentions_text"] || "Kianzitou For sprites help", color: Color.new(255, 255, 255) },
      { text: texts["honorable_mentions_text"] || "Gabe Developer For sprites, Sounds and Tool help", color: Color.new(255, 255, 255) },
      { text: texts["honorable_mentions_text"] || "Neutrico Made a Logo of Eclipse", color: Color.new(255, 255, 255) }
  ];

  function preProcessText(lines, fontSize) {
      let processedLines = [];
      fant.scale = fontSize / 20;
      
      for (let i = 0; i < lines.length; i++) {
          let line = lines[i].text;
          let size = fant.getTextSize(line);
          processedLines.push({ text: line, size: size, color: lines[i].color });
      }
      return processedLines;
  }

  let processedIntroText = preProcessText(introText.map(text => ({ text, color: Color.new(255, 255, 255) })), initialFontSize);
  let processedTextLines = preProcessText(textLines, initialFontSize);

  function drawText(processedLines, yOffset) {
      const centerX = canvas.width / 2;
      let y = yOffset;

      for (let i = 0; i < processedLines.length; i++) {
          let line = processedLines[i].text;
          let color = processedLines[i].color;
          let size = processedLines[i].size;

          fant.color = color;
          fant.print(centerX - size.width / 2, y, line);

          y += lineSpacing;
      }
  }

  Screen.display(() => {
      const currentTime = Date.now();
      
      if (!startCredits) {
          const introElapsed = Date.now() - introStartTime;
          if (introElapsed < introDuration) {
              drawText(processedIntroText, canvas.height / 2 - (processedIntroText.length * lineSpacing) / 2);
          } else {
              startCredits = true;
              introStartTime = Date.now();
          }
      } else if (!showingLogo) {
          let y = creditsOffset;
          drawText(processedTextLines, y);

          creditsOffset -= scrollSpeed;

          if (creditsOffset + processedTextLines.length * lineSpacing < 0) {
              creditsOffset = canvas.height;
              showingLogo = true;
              logoStartTime = Date.now();
          }
      } else {
          logoebd.draw(canvas.width / 2 - logoebd.width / 2, canvas.height / 2 - logoebd.height / 2);

          if (Date.now() - logoStartTime >= logoDuration) {
            System.loadELF(System.loadELF(System.boot_path + "/athena.elf", ["Assets/Scripts/Subscripts/book.js"]) );
          }
      }

      if (currentTime - lastFx3UpdateTime >= fx3AnimationSpeed) {
          fx3Index += fx3Direction;

          if (fx3Index >= fx3.length || fx3Index < 0) {
              fx3Direction *= -1;
              fx3Index += fx3Direction;
          }

          lastFx3UpdateTime = currentTime;
      }

      fx3[fx3Index].draw(0, 0);
  });
}












Screen.display(() => {
  pad.update();

  if (!isInSubmenu && !isInLanguageMenu && !isInInterfaceP && !isInAudioMenu && !isInControlsMenu && !isInVisualMenu ) {
    if (pad.justPressed(Pads.DOWN) && !stop) {
      option = option === 4 ? 1 : option + 1;
      playSoundSelect();
    }

    if (pad.justPressed(Pads.UP) && !stop) {
      option = option === 1 ? 4 : option - 1;
      playSoundSelect();
    }

    if (pad.justPressed(Pads.CROSS) && !stop) {
      if (option === 2) {
        isInSubmenu = true;
        submenuOption = 1;
        playSoundSelect();
      } else if (option === 3) {
        if (!transitionbActive) {
          transitionbActive = true;
          transitionbIndex = 0;
          transitionbCompleted = false;
          showBlackScreen2 = false;
          lastTransitionbUpdateTime = Date.now();
        }
      } else if (option === 1) {
        isInInterfaceP = true;
        slotOption = 1;
        showSelectText = true;

        
        playSoundSelect();
      }
      else if (option === 2) {
        isInVisualMenu = true; 
        
        playSoundSelect();
      } else if (option === 4) {
        System.exitToBrowser();
      }
    }

    Background.draw(0, 0);
    drawMenuOption("start", canvas.height / 2 - 35, option === 1);
    drawMenuOption("options", canvas.height / 2 - 15, option === 2);
    drawMenuOption("credits", canvas.height / 2 + 5, option === 3);
    drawMenuOption("exit", canvas.height / 2 + 25, option === 4);

    cross.draw(600, 420);
    fonta.scale = 0.5;
    fonta.print(542, 413,"CONFIRM");

  } else if (isInSubmenu) {
    if (pad.justPressed(Pads.DOWN) && !stop) {
      submenuOption = submenuOption === 5 ? 1 : submenuOption + 1;
      playSoundSelect();
    }

    if (pad.justPressed(Pads.UP) && !stop) {
      submenuOption = submenuOption === 1 ? 5 : submenuOption - 1;
      playSoundSelect();
    }

    if (pad.justPressed(Pads.CROSS) && !stop) {
      switch (submenuOption) {
        case 1: 
          isInSubmenu = false;
          isInAudioMenu = true;
          playSoundSelect();
          break;
        case 2: 
        isInSubmenu = false;
          isInVisualMenu = true;
          break;
        case 3: 
        isInSubmenu = false;
          isInControlsMenu = true; 
          playSoundSelect();
          break;
        case 4:
          isInSubmenu = false;
          isInLanguageMenu = true; 
          submenuOption = 1;
          playSoundSelect();
          break;
        case 5: 
          isInSubmenu = false;
          playSoundSelect();
          break;
      }
    }

    Background.draw(0, 0);
    const offsetY = -17; 
    interfaceImage.draw((canvas.width - interfaceImage.width) / 2, (canvas.height - interfaceImage.height) / 2 - offsetY);
    drawSubmenuOption("audio", canvas.height / 2 - 35, submenuOption === 1);
    drawSubmenuOption("visual", canvas.height / 2 - 15, submenuOption === 2);
    drawSubmenuOption("controls", canvas.height / 2 + 5, submenuOption === 3);
    drawSubmenuOption("language", canvas.height / 2 + 25, submenuOption === 4);
    drawSubmenuOption("back", canvas.height / 2 + 45, submenuOption === 5);

  } else if (isInAudioMenu) {
    if (pad.justPressed(Pads.DOWN) && !stop) {
      audioMenuOption = audioMenuOption === 4 ? 1 : audioMenuOption + 1;
      playSoundSelect();
    }
  
    if (pad.justPressed(Pads.UP) && !stop) {
      audioMenuOption = audioMenuOption === 1 ? 4 : audioMenuOption - 1;
      playSoundSelect();
    }
  
    if (pad.justPressed(Pads.RIGHT) && !stop) {
      adjustVolume(audioMenuOption, -1); 
    }
  
    if (pad.justPressed(Pads.LEFT) && !stop) {
      adjustVolume(audioMenuOption, 1);
    }
  
    if (pad.justPressed(Pads.CROSS) && !stop) {
      if (audioMenuOption === 4) { 
        isInAudioMenu = false;
    resetFontScale();
        isInSubmenu = true;
        playSoundSelect();
      }
    }
  
    Background.draw(0, 0);
    interfaceImage.draw((canvas.width - interfaceImage.width) / 2, (canvas.height - interfaceImage.height) / 2);
    
    drawAudioMenu("Main Volume", canvas.height / 2 - 35, audioMenuOption === 1);
    drawAudioMenu("Sound Effects", canvas.height / 2 - 15, audioMenuOption === 2);
    drawAudioMenu("Music", canvas.height / 2 + 5, audioMenuOption === 3);
    drawAudioMenu("Back", canvas.height / 2 + 25, audioMenuOption === 4);
    

    

 }else if (isInControlsMenu) {
  handleControlsMenu();
}else if (isInLanguageMenu) {
  handleLanguageMenu();
} else if (isInInterfaceP) {
  handlebeforegameplayMenu()
  } else if (isInVisualMenu) {
    handleVisualMenu()
    }

    
   
    fadeOut.play();

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
    FX2[FX2Index].color = Color.new(255, 255, 255, 70)
    FX2[FX2Index].draw(0, 0); 
  }

  

 const currentTime = Date.now();

  if (transitionbActive) {
    if (currentTime - lastTransitionbUpdateTime >= transitionbSpeed) {
      if (!transitionbCompleted) {
        transitionbIndex++;
        if (transitionbIndex >= transitionbImages.length) {
          transitionbIndex = transitionbImages.length - 1;
          transitionbCompleted = true;

          Sound.pause(audio);
          Credits();
        }
        lastTransitionbUpdateTime = currentTime;
      }
    }

    const transitionbImage = transitionbImages[transitionbIndex];
    transitionbImage.width = canvas.width;
    transitionbImage.height = canvas.height;
    transitionbImage.draw(0, 0);


    }

  
  

});
