import Player from './player.js';
import { FadeIn, FadeOut } from "/Modules/fade.js";



class Map {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;

        const audio = Sound.load("Assets/Textures/Overworld/Stage/Audio/One.ogg")
        const audioSlot = 0;
        this.fadeOut = new FadeOut('screen', 1, 255, false);  


        this.player = new Player();

        this.cameraX = 0;
        this.cameraY = 0;
        

        this.mapImage = new Image("Assets/Textures/Overworld/Stage/Map1.png");
        this.map2 = new Image("Assets/Textures/Overworld/Stage/Map2.png");
        this.Map2S = new Image("Assets/Textures/Overworld/Stage/Map2second.png");
        this.bridge = new Image("Assets/Textures/Overworld/Stage/Map content/bridge1.png");
        this.stairsveggie = new Image("Assets/Textures/Overworld/Stage/Map content/stairs veggies.png");
        this.lighthouseImage = new Image("Assets/Textures/Overworld/Stage/Map content/lighthouse.png");
        this.piecesImage = new Image("Assets/Textures/Overworld/Stage/Map content/pieces1.png");
        this.icon = new Image("Assets/Textures/Overworld/Stage/coin.png");
        this.boat = new Image("Assets/Textures/Overworld/Stage/Boat/world1_boat.png");
        this.dock = new Image("Assets/Textures/Overworld/Stage/Boat/world1_dock.png");

        this.npcAnimationImages = this.loadImages('Assets/Textures/Overworld/Stage/Npc', 8);
        this.npcCurrentFrame = 0;
        this.npcAnimationSpeed = 100;
        this.npcLastFrameTime = Date.now();

        this.slimeAnimationImages = this.loadImages('Assets/Textures/Overworld/Stage/Icon Slime/', 3);
        this.slimeCurrentFrame = 0;
        this.slimeAnimationSpeed = 100;
        this.slimeLastFrameTime = Date.now();

        this.houseAnimationImages = this.loadImages('Assets/Textures/Overworld/Stage/Tutorial', 3);
        this.houseCurrentFrame = 0;
        this.houseAnimationSpeed = 100;
        this.houseLastFrameTime = Date.now();

        this.shopAnimationImages = this.loadImages('Assets/Textures/Overworld/Stage/Shop/', 3);
        this.shopCurrentFrame = 0;
        this.shopAnimationSpeed = 100;
        this.shopLastFrameTime = Date.now();

        this.veggiesAnimationImages = this.loadImages('Assets/Textures/Overworld/Stage/Veggies/', 3);

        this.veggiesCurrentFrame = 0;
        this.veggiesAnimationSpeed = 100;
        this.veggiesLastFrameTime = Date.now();

   




        
        
       
        this.bridge.width = 170;
        this.bridge.height = 70;

        this.stairsveggiePositionX = 700;
        this.stairsveggiePositionY = 415;
        this.stairsveggie.height = 54;
        this.stairsveggie.width = 54;

        this.Map2SPositionX = 920;
        this.Map2SPositionY = -71;
        this.Map2S.width = 408;
        this.Map2S.height = 657;
    
        this.fontDefault = new Font("Assets/font/cupiredi.otf");
        this.fontDefault.scale = Math.fround(1);
        this.fontDefault.color = Color.new(139,0,0);



   
        

        this.ram_usage = System.getMemoryStats();
        this.free_mem;
        this.free_vram;
        this.ramUse = (this.ram_usage.used / 1048576).toFixed(2);

        Sound.play(audio, audioSlot);
        Sound.repeat(true, audioSlot);

        
        

    }

    update() {
        this.player.update();

     
    }

    loadImages(path, count) {
        let images = [];
        for (let i = 1; i <= count; i++) {
            images.push(new Image(`${path}/${i}.png`));
        }
        return images;
    }

    

    draw(cameraX, cameraY) {
        Screen.clear(Color.new(2, 141, 222));

        this.mapImage.draw(-cameraX, -cameraY);
        this.map2.draw(500 - cameraX, -70 - cameraY);
        this.Map2S.draw(this.Map2SPositionX - cameraX, this.Map2SPositionY - cameraY);
        this.bridge.draw(430 - cameraX, 240 - cameraY);
        this.stairsveggie.draw(this.stairsveggiePositionX - cameraX, this.stairsveggiePositionY - cameraY);
        this.boat.draw(13 - cameraX, 389 - cameraY);
        this.dock.draw(60 - cameraX, 350 - cameraY);

        const now = Date.now();
        if (now - this.npcLastFrameTime > this.npcAnimationSpeed) {
            this.npcCurrentFrame = (this.npcCurrentFrame + 1) % this.npcAnimationImages.length;
            this.npcLastFrameTime = now;
        }

        this.npcAnimationImages[this.npcCurrentFrame].draw(557 - cameraX, 211 - cameraY);

        if (now - this.houseLastFrameTime > this.houseAnimationSpeed) {
            this.houseCurrentFrame = (this.houseCurrentFrame + 1) % this.houseAnimationImages.length
            this.houseLastFrameTime = now;
        }
        this.houseAnimationImages[this.houseCurrentFrame].draw(130 - cameraX, 100 - cameraY);

        if (now - this.shopLastFrameTime > this.shopAnimationSpeed) {
            this.shopCurrentFrame = (this.shopCurrentFrame + 1) % this.shopAnimationImages.length
            this.shopLastFrameTime = now;
        }
        this.shopAnimationImages[this.houseCurrentFrame].draw(700 - cameraX, 222 - cameraY);

        if (now - this.slimeLastFrameTime > this.slimeAnimationSpeed) {
            this.slimeCurrentFrame = (this.slimeCurrentFrame + 1) % this.slimeAnimationImages.length
            this.slimeLastFrameTime = now;
        }
        this.slimeAnimationImages[this.slimeCurrentFrame].draw(708 - cameraX, 100 - cameraY);

        if (now - this.veggiesLastFrameTime > this.veggiesAnimationSpeed) {
            this.veggiesCurrentFrame = (this.veggiesCurrentFrame + 1) % this.veggiesAnimationImages.length
            this.veggiesLastFrameTime = now;
        }
        this.veggiesAnimationImages[this.veggiesCurrentFrame].draw(540 - cameraX, 386 - cameraY);
              
        this.player.update();
        this.player.draw();

        this.lighthouseImage.draw(-170 - cameraX, 0 - cameraY);
        this.piecesImage.draw(89 - cameraX, 25 - cameraY);
    

        this.displayMemoryStats();
        this.fontDefault.color = Color.new(0, 0, 0);
        this.fontDefault.print(548, 15, "E Q U I P");
        this.fontDefault.print(549, 15, "E Q U I P");
        this.fontDefault.print(550, 14, "E Q U I P");
        this.fontDefault.print(550, 16, "E Q U I P");

        this.fontDefault.color = Color.new(255, 255, 255);
        this.fontDefault.print(550, 15, "E Q U I P");
        this.icon.draw(17, 10)
        this.fadeOut.play();

        Screen.flip();
    }

    displayMemoryStats() {

        this.fontDefault.color = Color.new(0, 0, 0); 
        this.fontDefault.print(48, 15, "x");
        this.fontDefault.print(49, 15, "x");
        this.fontDefault.print(50, 14, "x");
        this.fontDefault.print(50, 16, "x");




   



        this.fontDefault.color = Color.new(800, 0, 0);
        this.fontDefault.print(400, 50, `Position X : ${this.player.playerX}`);
        this.fontDefault.print(400, 100, `Position Y : ${this.player.playerY}`);
    
        //this.temps = System.getTemperature()
        //this.free_mem = System.getMemoryStats()
        //this.free_vram = Screen.getFreeVRAM();
        //this.ram_usage = System.getMemoryStats();
        //this.ramUse = (this.ram_usage.used / 1048576).toFixed(2);
//
        //this.fontDefault.print(400, 150, `Temperature: ${this.temps}`);
//
        //this.fontDefault.print(0, 50, `Using Ram ${this.ramUse}MB/32MB`);
        //this.fontDefault.print(0, 100, `Free RAM: ${(32 - this.ramUse).toFixed(2)}MB/32MB`);
        //this.fontDefault.print(0, 150, `Used Ram: ${this.ram_usage.used} B`);
        //this.fontDefault.print(0, 200, `Free VRAM: ${this.free_vram} KB`);
    }
}

export default Map;
