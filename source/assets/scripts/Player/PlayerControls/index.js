import MemoryCardManager from "../../MemoryCardManager/index.js";

export default class PlayerControls {
    constructor(playerId = 1) {
        if(playerId !== 2 && playerId !== 1) {
            throw new Error("O id do jogador deve ser 1 ou 2");
        }

        this.playerId = playerId;
        this.memoryCardManager = new MemoryCardManager();
        this.controls = {};
        this.loadControlsPreferences();
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

        if(this.controls && Object.keys(this.controls).length > 0){
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

    _checkControlsLoaded() {
        if(!this.controls || Object.keys(this.controls).length === 0){
            throw new Error('Os Controles não foram carregados');
        }
    }

    getJumpButton() {
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_jump`];
    }

    getShootButton() {
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_shoot`];
    }

    getDashButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_dash`];
    }

    getExButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_ex`];
    }

    getLockButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_lock`];
    }

    getWpnButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_wpn`];
    }

    getPauseButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_pause`];
    }

    getAxisX(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_axis_x`];
    }

    getAxisY(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_axis_y`];
    }

    getUpButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_up`];
    }

    getDownButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_down`];
    }

    getLeftButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_left`];
    }

    getRightButton(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_btn_right`];
    }

    getAxisXInvert(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_axis_x_invert`];
    }

    getAxisYInvert(){
        this._checkControlsLoaded();
        return this.controls[`p${this.playerId}_axis_y_invert`];
    }
}