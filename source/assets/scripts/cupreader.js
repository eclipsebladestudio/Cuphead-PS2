import { getConfig, setConfig } from "source/assets/scripts/config.js";

let textData = {};
let currentLanguage = null;

function loadCupLanguage() {

    currentLanguage = getConfig("Language", "language", null);

    if (!currentLanguage) {
        currentLanguage = "english";
        setConfig("Language", "language", currentLanguage);
    }

    textData = {};
    let file;

    try {
        file = std.open(`source/assets/texts/${currentLanguage}.cup`, "r");
    } catch (err) {
        console.log("Erro ao abrir linguagem .cup:", err);
        return;
    }

    let id = null;
    let temp = {};

    while (!file.eof()) {
        let line = file.getline()?.trim();
        if (!line || line.startsWith("#")) continue;

        if (line.startsWith("::")) {
            if (id && temp.text !== undefined) {
                textData[id] = { x: temp.x || 0, y: temp.y || 0, value: temp.text };
            }

            id = line.slice(2).trim();
            temp = {};
        } else {
            const [key, value] = line.split(":", 2).map(s => s.trim());
            if (key === "x" || key === "y") temp[key] = parseInt(value);
            if (key === "text") temp.text = value;
        }
    }

    if (id && temp.text !== undefined) {
        textData[id] = { x: temp.x || 0, y: temp.y || 0, value: temp.text };
    }

    file.close();
}

function getText(id) {
    const entry = textData[id];
    return entry ? entry : { x: 0, y: 0, value: "" };
}

function setLanguage(lang) {
    currentLanguage = lang;
    setConfig("Language", "language", lang);
    loadCupLanguage();
}

export { loadCupLanguage, getText, setLanguage };