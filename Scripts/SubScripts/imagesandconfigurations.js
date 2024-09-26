console.log("imagesandconfigurations Loaded!!!");
let col1 = Color.new(255, 255, 255); 
let col2 = Color.new(21, 21, 21);   
let col3 = Color.new(255, 0, 0);   
const red = Color.new(160, 50, 50);  
const green = Color.new(50, 160, 50);
const white = Color.new(255, 255, 255);
const circle = new Image("Assets/Textures/pads/circle.png");
const TRIANGLE = new Image("Assets/Textures/pads/triangle.png");


const controlsMenuImage = new Image("host:/Assets/Textures/controlsmenu.png")
const controlsMenuImage2 = new Image("host:/Assets/Textures/controlsmenu2.png")


const fonta = new Font("host:/Assets/Font/bold.ttf");//again, it will break the entire code
const bold = new Font("host:/Assets/Font/bold.ttf");
bold.scale = 0.8;

const Background = new Image("host:/Assets/Textures/Menubg.png");
Background.width = 640;
Background.height = 448;

const select_img = new Image("host:/Assets/Textures/select.png");

const FX2 = [];
for (let i = 1; i <= 20; i++) {
  FX2.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
}

const transitionbImages = [];
for (let i = 1; i <= 15; i++) {
  transitionbImages.push(new Image(`host:/Assets/Textures/Transition/${i}.png`));
}

const interfaceImage = new Image("host:/Assets/Textures/pause.png");
const interfaceImage2 = new Image("host:/Assets/Textures/interface.png");
const interfaceImage3 = new Image("host:/Assets/Textures/options.png");

interfaceImage2.width = 328;
interfaceImage2.height = 322;

let FX2Index = 0;
let FX2Direction = 1;
let lastFX2UpdateTime = Date.now();
const FX2AnimationSpeed = 40;

const transitionbSpeed = 50;
let transitionbIndex = 0;
let transitionbActive = false;
let transitionbCompleted = false;
let lastTransitionbUpdateTime = Date.now();
let showBlackScreen2 = false;
const slot = new Image("host:/Assets/Textures/slot.png");
const fillImage = new Image("host:/Assets/Textures/select.png");
const studiologo = new Image("host:/Assets/Textures/studiologo.png")

