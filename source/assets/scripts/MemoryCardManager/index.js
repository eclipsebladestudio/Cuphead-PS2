export default class MemoryCardManager {
    constructor(slot = 1, gameDir = "CUPHEAD") {
        if(slot !== 1 && slot !== 2) {
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

        if (!this.checkFileExists(this.gamePath)) {
            this.createGameDirectory();
        }

        const file = std.open(`${this.gamePath}${fileName}`, "w");
        if (!file) {
            console.log("Falha ao abrir arquivo para escrita");
            return false;
        }

        for (const key in data) {
            file.printf("%s=%s\n", key, data[key]);
        }

        file.flush();
        file.close();
        return true;
    }

    loadGame(fileName = "savegame.txt") {
        if (!this.checkMemoryCard()) return null;

        const filePath = `${this.gamePath}${fileName}`;

        if (!this.checkFileExists(filePath)) {
            return null;
        }

        const file = std.open(filePath, "r");
        const content = file.readAsString();
        file.close();

        const lines = content.split("\n");
        const data = {};

        for (const line of lines) {
            if (line.trim() === "") continue;
            const [key, rawValue] = line.split("=");
            const value = rawValue.trim();

            if (value === "true") {
                data[key] = true;
            } else if (value === "false") {
                data[key] = false;
            } else if (!isNaN(value) && value !== "NaN") {
                data[key] = Number(value);
            } else {
                data[key] = value;
            }
        }

        console.log(JSON.stringify(data));
        return data;
    }

    checkFileExists(filePath = `${this.gamePath}savegame.txt`) {
        return std.exists(filePath);
    }

    deleteSave(fileName = "savegame.txt") {
        if (!this.checkMemoryCard()) return false;

        const filePath = `${this.gamePath}${fileName}`;

        if (!this.checkFileExists(filePath)) {
            return false;
        }

        const result = os.remove(filePath);
        return result === 0;
    }

    listSaves() {
        if (!this.checkMemoryCard()) return [];

        if (!this.checkFileExists(this.gamePath)) {
            return [];
        }

        const files = System.listDir(this.gamePath);
        return files.filter(file => !file.directory).map(file => file.name);
    }
}