export default class MemoryCardManager {
    constructor() {
        this.mcInfo = System.getMCInfo(0);
    }

    testMemoryCard(){
        console.log("Tipo:", this.mcInfo.type);
        console.log("Memória livre:", this.mcInfo.freemem);
        console.log("Formatado:", this.mcInfo.format);
    }
}