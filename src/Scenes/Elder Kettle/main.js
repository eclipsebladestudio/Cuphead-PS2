import { Timer } from "../../Modules/timer.js"
import { Entity } from "../../Modules/entity.js"
import { StandingPlayer } from "../../Modules/player.js"

let camera = new Entity(0, 100, 640, 448, 0)
let player1 = new StandingPlayer(0, 350, 110, 150, 0)

let currentTime = 0;
let lastFrameTime = 0;

let dt = 0;

let time = new Timer()


while (true) {

	currentTime = time.get();
	dt = (currentTime - lastFrameTime) / 1000;
	lastFrameTime = currentTime;

  Screen.clear()

	player1.move(250, camera);
	player1.entity.draw(camera);

  Screen.flip()
}
