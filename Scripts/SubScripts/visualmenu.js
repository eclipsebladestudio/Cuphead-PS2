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
