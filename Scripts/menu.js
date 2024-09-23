const canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;
Screen.setMode(canvas);


let pad = Pads.get();
let stop = false;

let showSelectText = false;

const loadScript = (scriptName) => {
  const baseDir = "host:/Scripts/SubScripts/";
  std.loadScript(`${baseDir}${scriptName}.js`);
};

const scripts = [
  "Audio",
  "AudioMenu",
  "deleteImages",
  "Language",
  "languagemenu",
  "menuandsubmenu",
  "beforegameplay",
  "imagesandconfigurations",
  "controlsmenu",
  "visualmenu"
];

scripts.forEach(script => loadScript(script));

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

  

 const currentTime = Date.now();

  if (transitionbActive) {
    if (currentTime - lastTransitionbUpdateTime >= transitionbSpeed) {
      if (!transitionbCompleted) {
        transitionbIndex++;
        if (transitionbIndex >= transitionbImages.length) {
          transitionbIndex = transitionbImages.length - 1;
          transitionbCompleted = true;

          Sound.pause(audio);
          std.reload("host:/Scripts/credits.js");
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