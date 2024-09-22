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
