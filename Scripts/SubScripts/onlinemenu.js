console.log("onlinemenu Loaded!!!");
let isInOnlineMenu = false; 

function drawOnlineMenu() {
    Background.draw(0, 0);
    
    const offsetY = -17; 
    interfaceImage3.draw((canvas.width - interfaceImage.width) / 2, (canvas.height - interfaceImage.height) / 2 - offsetY);
  
  }

  function handleOnlineMenu() {

    if (pad.justPressed(Pads.TRIANGULE) && !stop) {
      isInOnlineMenu = false; 
    }

    drawOnlineMenu();
  }