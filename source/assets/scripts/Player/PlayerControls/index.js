import MemoryCardManager from "../../MemoryCardManager";

export default class  PlayerControls {
    constructor() {
        this.memoryCardManager = new MemoryCardManager();
        this.controls = {};
    }

    controlsFileExists() {
        return this.memoryCardManager.checkFileExists(`${this.memoryCardManager.gamePath}controls.txt`);
    }

    loadControlsPreferences(){
        if(!this.controlsFileExists()){
            System.copyFile("source/defaultControls.ini", `${this.memoryCardManager.gamePath}controls.txt`);
            this.controls = this.memoryCardManager.loadGame('controls.txt')
            return this.controls
        }

       if(this.controls !== null && this.controls !== {}){
           return this.controls;
       }

       this.controls = this.memoryCardManager.loadGame("controls.txt");
       return this.controls
    }

    saveControlsPreferences(controls){
        const wasSaved = this.memoryCardManager.saveGame(controls, 'controls.txt');

        if(wasSaved){
            this.controls = this.memoryCardManager.loadGame("controls.txt");
            return wasSaved
        }

        return wasSaved;
    }
}