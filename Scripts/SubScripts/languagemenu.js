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