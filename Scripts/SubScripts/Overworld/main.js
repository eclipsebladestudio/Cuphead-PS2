
import Map from './scripts/map.js';
import Player from './scripts/player.js';

const map = new Map();
const player = new Player();

os.setInterval(() => {

   player.update();
   player.draw();
   const cameraPosition = player.getCameraPosition();
   map.draw(cameraPosition.x, cameraPosition.y);

}, 0);
