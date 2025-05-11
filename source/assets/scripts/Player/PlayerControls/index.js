import MemoryCardManager from "../../MemoryCardManager";

export default class  PlayerControls {
    constructor() {
        this.memoryCardManager = new MemoryCardManager();
        this.controls = {};
    }

    loadControlsPreferences(){
       if(this.controls){
           return this.controls;
       }

       this.controls = this.memoryCardManager.loadGame("controlsConfig.txt");
       return this.controls
    }

    saveControlsPreferences(controls){
        const wasSaved = this.memoryCardManager.saveGame(controls, 'controlsConfig.txt');

        if(wasSaved){
            this.controls = this.memoryCardManager.loadGame("controlsConfig.txt");
            return wasSaved
        }

        return wasSaved;
    }
}