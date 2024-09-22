var canvas = Screen.getMode();
canvas.width = 640;
canvas.height = 448;


var pad = Pads.get();
Screen.setFrameCounter(true);
var frameCounter = 1;

var currentImageIndex = 0;
var maxImageIndex = 24;

var images = [];
var transitionFrames = 25;
var transitionCounter = 25;
var displayLastImage = false;


var playbackSpeed = 8; 
var speedIncrement = 1.1; 
var minSpeed = 0.1;
var maxSpeed = 3.0;

for (var i = 1; i <= 25; i++) {
  images.push(new Image("Assets/Storybook/Page 06-07/" + i + ".png", RAM));
}

class menu {
  play() {
    pad.update();

    if (pad.justPressed(Pads.LEFT)) {
      playbackSpeed = Math.max(minSpeed, playbackSpeed - speedIncrement);
    } else if (pad.justPressed(Pads.RIGHT)) {
      playbackSpeed = Math.min(maxSpeed, playbackSpeed + speedIncrement);
    }

    if (displayLastImage) {
      images[maxImageIndex].draw(0, 0);
    } else {
      images[currentImageIndex].width = 640;
      images[currentImageIndex].height = 448;
      images[currentImageIndex].draw(0, 0);
    }

    frameCounter++;

    if (transitionCounter < transitionFrames / playbackSpeed) {
      transitionCounter++;
    } else {
      if (currentImageIndex < maxImageIndex) {
        currentImageIndex++;
        transitionCounter = 0;
      } else {
        displayLastImage = true;
      }
    }
  }
}

var game = new menu();

var loop = () => {
  game.play();
};

Screen.displayFunc(loop);

os.setInterval(() => {
  Screen.display();
}, 0);
