console.log("Audio Loaded!!!");
var audio = Sound.load("host:/Assets/Music/screen.wav");
var audioSlot = 0;

var audio2 = Sound.load("host:/Assets/Sounds/select.adp");

var credit = Sound.load("host:/Assets/Music/credits_music.wav");

var audioSlot3 = 2; 
var audioSlot2 = 1;
Sound.setVolume(100, audioSlot2);

function playSoundSelect() {
  Sound.play(audio2, audioSlot2);
}




