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

const cross = new Image("Assets/Textures/pads/Cross.png");

const scripts = [
  "config",
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




//CREDITS

function Credits() {
  
  var gray = Color.new(11, 11, 11, 255);
  var logoebd = new Image("host:/Assets/Textures/eclipse_credits_final.png");
  var fant = new Font("host:/Assets/Font/bold.ttf");
  fant.scale = 1;

  var fx3 = [];
  for (let i = 1; i <= 10; i++) {
      fx3.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
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
      { text: texts["gameplay_programming_team1"] || "Axel", color: Color.new(255, 255, 255) },
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
            System.loadELF(System.loadELF(System.boot_path + "/athena.elf", ["Scripts/Subscripts/book.js"]) );
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