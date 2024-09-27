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