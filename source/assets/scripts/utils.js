const cupheadvogue_bold = new Font("source/assets/fonts/CupheadVogue-Bold-merged.ttf");
const pad = Pads.get(0);
const bangersfont = new Font("source/assets/fonts/CupheadVogue-ExtraBold-merged.ttf")
const bangersfont2 = new Font("source/assets/fonts/CupheadVogue-ExtraBold-merged.ttf")
const bangers = new Font("source/assets/fonts/Bangers.ttf")


function DebugMemory() {
    const ramStats = System.getMemoryStats();
    const freeVRAM = Screen.getFreeVRAM()

    const ramUsedMB = (ramStats.used / 1048576).toFixed(2);
    const ramFreeMB = (32 - ramUsedMB).toFixed(2);

    cupheadvogue_bold.print(0, 50, "Using RAM: " + ramUsedMB + "MB / 32MB");
    cupheadvogue_bold.print(0, 100, "Free RAM: " + ramFreeMB + "MB / 32MB");
    cupheadvogue_bold.print(0, 150, "Used RAM: " + ramStats.used + " B");
    cupheadvogue_bold.print(0, 200, "Free VRAM: " + freeVRAM + " KB");
}


function printWithChromatic(font, x, y, text, color, chromaticAberration, scale = 0.8) {

    font.outline = 0.0;
    font.dropshadow = 0.0;
    font.scale = scale;

    const mainAlpha = color.a ?? 255;
    const chromaAlpha = Math.floor((128 / 255) * mainAlpha); 

    if (chromaticAberration) {
        font.color = Color.new(255, 0, 0, chromaAlpha); 
        font.print(x - 1, y, text);

        font.color = Color.new(0, 255, 0, chromaAlpha); 
        font.print(x + 1, y, text);

        font.color = Color.new(0, 0, 255, chromaAlpha); 
        font.print(x, y - 1, text);

        font.color = color;
        font.print(x, y, text);
    } else {
        font.color = color;
        font.print(x, y, text);
    }
}

function drawImageWithChromatic(image, x, y, intensity = 3, alpha = 50) {

    image.color = Color.new(255, 0, 0, alpha); 
    image.draw(x - intensity, y); 

    image.color = Color.new(0, 255, 0, alpha); 
    image.draw(x + intensity, y); 

    image.color = Color.new(0, 0, 255, alpha); 
    image.draw(x, y - intensity);

    image.color = Color.new(128, 128, 128, 128);
    image.draw(x, y);
}

