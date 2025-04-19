let configData = {};

(function loadConfig(path = "source/config.ini") {
    configData = {};
    let file;

    try {
        file = std.open(path, "r");
    } catch (err) {
        console.log("Erro ao abrir o arquivo de configuração:", err);
        return;
    }

    let currentSection = null;

    while (!file.eof()) {
        let line = file.getline();
        if (!line) continue;

        line = line.trim();
        if (line.startsWith(";") || line === "") continue;

        if (line.startsWith("[") && line.endsWith("]")) {
            currentSection = line.slice(1, -1);
            configData[currentSection] = {};
        } else if (currentSection) {
            let [key, value] = line.split("=", 2).map(s => s.trim());

            if (typeof value === "string") {
                let lower = value.toLowerCase();
                if (lower === "true") value = true;
                else if (lower === "false") value = false;
                else if (!isNaN(value)) value = parseFloat(value);
            }

            configData[currentSection][key] = value;
        }
    }

    file.close();
})();

function getConfig(section, key, defaultValue = null) {
    return (configData[section] && configData[section][key] !== undefined)
        ? configData[section][key]
        : defaultValue;
}

export { getConfig };
