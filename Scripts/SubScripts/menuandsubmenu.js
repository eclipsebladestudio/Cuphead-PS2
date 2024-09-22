console.log("menuandsubmenu Loaded!!!");

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