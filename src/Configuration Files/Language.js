console.log("Language Loaded!!!");
let languages = [];
let currentLanguageIndex = 0;

function loadAvailableLanguages() {
    const languageFile = "host:/src/Configuration Files/languagesavaible.cfg";
    const fileContent = std.open(languageFile, "r").readAsString().trim();
    languages = fileContent.split(',');
}

function loadLanguage(language) {
    const languagePath = `host:/src/Configuration Files/Languages/${language}.cfg`;
    const languageFileContent = std.open(languagePath, "r").readAsString();
    const lines = languageFileContent.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        const [key, value] = trimmedLine.split('=');
        if (key && value) {
            texts[key.trim()] = value.trim().replace(/"/g, '');
        }
    }

    function stringToArrayBuffer(str) {
      const buffer = new ArrayBuffer(str.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i);
      }
      return buffer;
    }

    function saveCurrentLanguageToJson(language) {
      const jsonFile = "host:/src/Configuration Files/current_language.json";
      const content = JSON.stringify({ currentLanguage: language });
    
      function stringToArrayBuffer(str) {
        const length = str.length;
        const buffer = new ArrayBuffer(length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < length; i++) {
          view[i] = str.charCodeAt(i);
        }
        return buffer;
      }
    
      try {
        const file = std.open(jsonFile, "w");
    
        const buffer = stringToArrayBuffer(content);
    
        file.write(buffer, 0, buffer.byteLength);
        file.close();
        console.log(`Idioma salvo com sucesso: ${language}`);
      } catch (e) {
        console.log(`Erro ao salvar o idioma no JSON: ${e.message}`);
      }
    }
    saveCurrentLanguageToJson(language); 
}

function initializeLanguage() {
    const jsonFile = "host:/src/Configuration Files/current_language.json";
    try {
        const fileContent = std.open(jsonFile, "r").readAsString().trim();
        const json = JSON.parse(fileContent);
        const language = json.currentLanguage || "default_language"; 
  
        currentLanguageIndex = languages.indexOf(language);
        if (currentLanguageIndex === -1) currentLanguageIndex = 0;
  
        loadLanguage(languages[currentLanguageIndex]);
    } catch (e) {
        console.log(`Erro ao carregar a linguagem do JSON: ${e.message}`);
    }
}

console.log("Teste 1");
loadAvailableLanguages();
console.log("Teste 2");
initializeLanguage();
console.log("Done!!!");