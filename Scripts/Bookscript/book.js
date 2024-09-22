console.log("book Loaded!!!");
console.log("Teste 1");
var images2 = Array.from({ length: 28 }, (_, i) => {
  const img2 = new Image(`Textures/StoryBook/book/${i + 1}.png`);
  img2.width = 640;
  img2.height = 448;
  return img2;
});
console.log("Teste 2");
let i = 0;
var lastIndex = images.length - 1;
console.log("Teste 3");
os.setInterval(() => {
  pad.update();
  Screen.clear();
  if(pad.justPressed(Pads.CROSS)) {
  for(var z = 0;z < images.length; z++) {
  images2[z] = null;
  }
  std.gc();
    std.loadScript("scripts/Bookscript/page1-2.js");
  }
  images2[i].draw(0, 0);
  Screen.flip();
  
  if (i === lastIndex) {
  } else {
    i = (i + 1) % images2.length;
  }
}, 5, 0);
console.log("Done!!!");