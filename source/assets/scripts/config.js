let configData = {};

function getConfig(section, key, defaultValue = null) {
    if (Object.keys(configData).length === 0) load(); 
    return (configData[section] && configData[section][key] !== undefined)
        ? configData[section][key]
        : defaultValue;
}

function setConfig(section, key, value) {
    if (Object.keys(configData).length === 0) load(); 
    if (!configData[section]) configData[section] = {};
    configData[section][key] = value;
    save(); 
}

function load(path = "source/config.ini") {
    configData = {};
    let file;
    try {
        file = std.open(path, "r");
    } catch (err) {
        console.log("Erro ao abrir o arquivo de configuração:", err);
        return;
    }

    let section = null;
    while (!file.eof()) {
        let line = file.getline();
        if (!line) continue;

        line = line.trim();
        if (line.startsWith(";") || line === "") continue;

        if (line.startsWith("[") && line.endsWith("]")) {
            section = line.slice(1, -1);
            configData[section] = {};
        } else if (section) {
            let [key, value] = line.split("=", 2).map(s => s.trim());
            if (typeof value === "string") {
                let lower = value.toLowerCase();
                if (lower === "true") value = true;
                else if (lower === "false") value = false;
                else if (!isNaN(value)) value = parseFloat(value);
            }
            configData[section][key] = value;
        }
    }

    file.close();
}

function save(path = "source/config.ini") {
    let file;
    try {
        file = std.open(path, "w");
    } catch (err) {
        console.log("Erro ao salvar o arquivo de configuração:", err);
        return;
    }

    for (const section in configData) {
        file.puts(`[${section}]\n`);
        for (const key in configData[section]) {
            let value = configData[section][key];
            if (typeof value === "boolean") value = value ? "true" : "false";
            file.puts(`${key}=${value}\n`);
        }
        file.puts("\n");
    }

    file.close();
}

export { getConfig, setConfig };
