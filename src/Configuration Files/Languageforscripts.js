function loadLanguage() {
    const jsonFile = `host:/src/Configuration Files/current_language.json`;
    try {
        const fileContent = std.open(jsonFile, "r").readAsString().trim();
        const json = JSON.parse(fileContent);
        const language = json.currentLanguage || "en"; 

        const langFile = `src/Configuration Files/Languages/${language}.cfg`;
        const langContent = std.open(langFile, "r").readAsString();
        texts = parseLanguageFile(langContent); 

        function parseLanguageFile(content) {
            const lines = content.split('\n');
            const result = {};
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {

                    result[key.trim()] = value.trim().replace(/^"|"$/g, '');
                }
            });
            return result;
        }
    } catch (e) {
        console.log(`Erro ao carregar a linguagem do JSON ou arquivo de configuração: ${e.message}`);
    }
}

loadLanguage(); 
