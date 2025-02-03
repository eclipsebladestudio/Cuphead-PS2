import { Timer } from "../../Modules/timer.js"
import { Entity } from "../../Modules/entity.js"
import { StandingPlayer } from "../../Modules/player.js"
import { Health } from "../../Modules/health.js";  
import { ElderKettle } from 'src/Scenes/Elder Kettle/elder.js'; 



const background = new Image("src/Scenes/Elder Kettle/background.png");
const overlay = new Image("src/Scenes/Elder Kettle/overlay.png");


const elderKettle = new ElderKettle();
let camera = new Entity(0, 100, 640, 448, 0)
let player1 = new StandingPlayer(0, 270, 110, 150, 0)

let currentTime = 0;
let lastFrameTime = 0;

let dt = 0;

let time = new Timer()
const font = new Font("default")
var free_mem
var free_vram
var ram_usage = System.getMemoryStats()

let ramUse = (ram_usage.used / 1048576).toFixed(2)
let health = new Health(10, 400);

while (true) {

	currentTime = time.get();
	dt = (currentTime - lastFrameTime) / 1000;
	lastFrameTime = currentTime;

  Screen.clear()
  background.draw(0, 0)

	player1.update(250, camera);
	player1.draw(camera);

	elderKettle.update()
	elderKettle.draw(480, 217)

  

	overlay.draw(0, 0)

	free_mem = System.getMemoryStats();
    free_vram = Screen.getFreeVRAM();
    ram_usage = System.getMemoryStats();

    ramUse = (ram_usage.used / 1048576).toFixed(2)
    //font.print(0, 50, "Using Ram " + ramUse + "MB/32MB")
    //font.print(0, 100, "Free RAM: " + (32 - ramUse) + "MB/32MB");
    //font.print(0, 150, "Used Ram: " + ram_usage.used + " B");
    //font.print(0, 200, "Free VRAM: " + free_vram + " KB");

    health.updateHealth(4);  

    health.draw();


  Screen.flip()
}
