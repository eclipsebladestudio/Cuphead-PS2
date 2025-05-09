export default class MemoryCardManager {
    constructor(slot = 1, gameDir = "CUPHEAD") {
        if(slot < 1 || slot > 2){
            throw new Error("O Slot deve ser 1 ou 2");
        }

        this.slot = slot;
        this.gameDir = gameDir;
        this.mcPath = `mc${this.slot - 1}:/`; // Converte para índice 0-based
        this.gamePath = `${this.mcPath}${this.gameDir}/`;

        this.checkMemoryCard();
    }

    checkMemoryCard() {
        const mcInfo = System.getMCInfo(this.slot - 1);
        if (mcInfo.type === 0 || mcInfo.format === 0) {
            console.log("Memory Card não reconhecido ou não formatado.");
            return false;
        }
        return true;
    }

    createGameDirectory() {
        if (!this.checkMemoryCard()) return false;

        const result = os.mkdir(this.gamePath, 0o777);
        if (result !== 0 && result !== -os.EEXIST) {
            console.log(`Falha ao criar diretório: ${result}`);
            return false;
        }

        System.copyFile("source/assets/save/cuphead.icn", `${this.gamePath}cuphead.icn`);
        System.copyFile("source/assets/save/cupheaddelete.icn", `${this.gamePath}cupheaddelete.icn`);
        System.copyFile("source/assets/save/icon.sys", `${this.gamePath}icon.sys`);

        return true;
    }

    saveGame(data, fileName = "savegame.txt") {
        if (!this.checkMemoryCard()) return false;

        if (!std.exists(this.gamePath)) {
            this.createGameDirectory();
        }

        const file = std.open(`${this.gamePath}${fileName}`, "w");
        if (!file) {
            console.log("Falha ao abrir arquivo para escrita");
            return false;
        }

        for (const key in data) {
            file.printf("%s:%s\n", key, data[key]);
        }

        file.flush();
        file.close();
        return true;
    }

    loadGame(fileName = "savegame.txt") {
        if (!this.checkMemoryCard()) return null;

        const filePath = `${this.gamePath}${fileName}`;

        if (!std.exists(filePath)) {
            return null;
        }

        const file = std.open(filePath, "r");
        const content = file.readAsString();
        file.close();

        const lines = content.split("\n");
        const data = {};

        console.log("LINHAS: ", lines)
        console.log("DATA: ", content)

        for (const line of lines) {
            if (line.trim() === "") continue;
            const [key, value] = line.split(":");
            data[key] = isNaN(value) ? value : Number(value);
        }

        return data;
    }

    deleteSave(fileName = "savegame.txt") {
        if (!this.checkMemoryCard()) return false;

        const filePath = `${this.gamePath}${fileName}`;

        if (!std.exists(filePath)) {
            return false;
        }

        const result = os.remove(filePath);
        return result === 0;
    }

    listSaves() {
        if (!this.checkMemoryCard()) return [];

        if (!std.exists(this.gamePath)) {
            return [];
        }

        const files = System.listDir(this.gamePath);
        return files.filter(file => !file.directory).map(file => file.name);
    }

    displayInfo() {
        this.updateStatus();

        console.log("\n===== MEMORY CARD INFO =====");
        console.log(`Slot: ${this.slot + 1}`);
        console.log(`Presente: ${this.status.present ? 'Sim' : 'Não'}`);
        console.log(`Formatado: ${this.status.formatted ? 'Sim' : 'Não'}`);
        console.log(`Espaço livre: ${this.status.freeSpace} KB`);
        console.log(`Diretório do jogo: ${this.status.dirExists ? 'Existe' : 'Não existe'}`);
        console.log(`Caminho: ${this.gamePath}`);

        if (this.status.error) {
            console.log(`Erro: ${this.status.error}`);
        }
        console.log("============================\n");
    }
}