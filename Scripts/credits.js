console.log("Credits Loaded!!!!");
console.log("Teste 1");
const canvas2 = Screen.getMode();
canvas2.width = 640;
canvas2.height = 448;
Screen.setMode(canvas2);
console.log("Teste 2");
var gray = Color.new(11, 11, 11, 255)

var logoebd = new Image("host:/Assets/Textures/LOGOt.png");
console.log("Teste 3");

var fant = new Font("host:/Assets/Font/bold.ttf");
console.log("Teste 3.1");
fant.scale = 1;
console.log("Teste 3.2");
var fx3 = [];
console.log("Teste 3.3");
for (let i = 1; i <= 10; i++) {
    fx3.push(new Image(`host:/Assets/Textures/FX/${i}.png`));
    console.log("Teste 3.4."+i);
}
console.log("Teste 4");
let fx3Index = 0;
let fx3Direction = 1;
let lastFx3UpdateTime = Date.now();
var fx3AnimationSpeed = 20;

var lineSpacing = 30;
var initialFontSize = 10;  
var maxFontSize = 14;
var scrollSpeed = 1;

let startCredits = false;
let introStartTime = Date.now();
let creditsOffset = canvas2.height;
let logoStartTime = null;
let showingLogo = false;
console.log("Teste 5");
var introDuration = 6000;
var logoDuration = 3000;

console.log("Teste 6");
let texts = {};
const introText = [
    texts["intro_text1"] || "Before starting, none of this would be possible in this capacity",
    texts["intro_text2"] || "without the help of Daniel Santos, creator of the AthenaENV engine,",
    texts["intro_text3"] || "among other projects. I thank Daniel in advance for everything he",
    texts["intro_text4"] || "has done to help us. Thank you very much, Mr. Daniel."
];
console.log("Teste 7");
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
    { text: "", color: Color.new(255, 255, 255) },
    { text: texts["design_title"] || "Design", color: Color.new(255, 0, 0) },
    { text: texts["design_name"] || "Tayklor", color: Color.new(255, 255, 255) },
    { text: "", color: Color.new(255, 255, 255) },
    { text: texts["honorable_mentions_title"] || "Honorable Mentions", color: Color.new(255, 0, 0) },
    { text: texts["honorable_mentions_text"] || "Zeca Apelão and Kianzitou - For sprites and sounds help", color: Color.new(255, 255, 255) }
];
console.log("Teste 8");
function drawText(lines, yOffset, fontSize) {
    const centerX = canvas2.width / 2;
    let y = yOffset;

    fant.scale = fontSize / 20;  

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].text;
        let color = lines[i].color;

        fant.color = color;

        let size = fant.getTextSize(line);
        fant.print(centerX - size.width / 2, y, line);

        y += lineSpacing;
    }
}
console.log("Teste 9");
os.setInterval(() => {
    const currentTime = Date.now();

    if (currentTime - lastFx3UpdateTime >= fx3AnimationSpeed) {
        fx3Index += fx3Direction;

        if (fx3Index >= fx3.length || fx3Index < 0) {
            fx3Direction *= -1;
            fx3Index += fx3Direction;
        }

        lastFx3UpdateTime = currentTime;
    }

    Screen.clear(gray);
    
    fx3[fx3Index].draw(0, 0);

    if (!startCredits) {
        const introElapsed = currentTime - introStartTime;
        if (introElapsed < introDuration) {
            drawText(introText.map(text => ({ text, color: Color.new(255, 255, 255) })), canvas2.height / 2 - (introText.length * lineSpacing) / 2, initialFontSize);
        } else {
            startCredits = true;
            introStartTime = Date.now();
        }
    } else if (!showingLogo) {
        let y = creditsOffset;
        const fontSize = Math.min(maxFontSize, initialFontSize + ((currentTime - introStartTime) / 50));

        drawText(textLines, y, fontSize);

        creditsOffset -= scrollSpeed;

        if (creditsOffset + textLines.length * lineSpacing < 0) {
            creditsOffset = canvas2.height;
            showingLogo = true;
            logoStartTime = Date.now();
        }
    } else {
        logoebd.draw(canvas2.width / 2 - logoebd.width / 2, canvas2.height / 2 - logoebd.height / 2);

        if (Date.now() - logoStartTime >= logoDuration) {
            std.reload("host:/main.js")
        }
    }
    fx3[fx3Index].draw(0, 0);

    Screen.flip();
}, 0);
console.log("Done!!!");
