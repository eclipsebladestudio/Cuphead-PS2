console.log("config Loaded!!!");

function loadConfig() {
  const iniFile = 'host:/src/Configuration Files/config.ini';
  try {
    const file = std.open(iniFile, 'r');
    const fileContent = file.readAsString();
    file.close();
    
    const parsedConfig = parseIni(fileContent);
    
    return {
      audio: {
        mainVolume: parsedConfig['Audio']?.master ?? 'unknown',
        soundEffects: parsedConfig['Audio']?.sfx ?? 'unknown',
        music: parsedConfig['Audio']?.music ?? 'unknown',
        reverb: parsedConfig['Audio']?.reverb ?? 'False'
      },
      controls: parsedConfig['Controls'] ?? {}
    };
  } catch (e) {
    console.log(`Erro ao carregar config.ini: ${e.message}`);
    
    return {
      audio: {
        mainVolume: 'unknown',
        soundEffects: 'unknown',
        music: 'unknown',
        reverb: 'False'
      },
      controls: {}
    };
  }
}

function parseIni(iniString) {
  const lines = iniString.split('\n');
  const config = {};
  let currentSection = null;
  
  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.substring(1, line.length - 1);
      config[currentSection] = {};
    } else if (currentSection) {
      const [key, value] = line.split('=').map(part => part.trim());
      if (key && value) {
        config[currentSection][key] = value;
      }
    }
  });
  
  return config;
}

const config = loadConfig();

function saveConfig() {
  const iniFile = "host:/src/Configuration Files/config.ini";
  const content = formatIni(config);

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
    const file = std.open(iniFile, "w");
    const buffer = stringToArrayBuffer(content);
    file.write(buffer, 0, buffer.byteLength);
    file.close();
    console.log("Configuração salva com sucesso.");
  } catch (e) {
    console.log(`Erro ao salvar a configuração no INI: ${e.message}`);
  }
}

function formatIni(config) {
  let iniContent = `[Audio]
master = ${config.audio.mainVolume}
sfx = ${config.audio.soundEffects}
music = ${config.audio.music}
reverb = ${config.audio.reverb}
`;

  if (config.controls && Object.keys(config.controls).length > 0) {
    iniContent += `[Controls]
`;
    for (const [key, value] of Object.entries(config.controls)) {
      iniContent += `${key} = ${value}\n`;
    }
  }

  return iniContent;
}

function adjustVolume(option, change) {
  switch (option) {
    case 1:
      if (config.audio.mainVolume !== 'unknown') {
        config.audio.mainVolume = Math.max(0, Math.min(10, parseInt(config.audio.mainVolume) + change)).toString();
      }
      break;
    case 2:
      if (config.audio.soundEffects !== 'unknown') {
        config.audio.soundEffects = Math.max(0, Math.min(10, parseInt(config.audio.soundEffects) + change)).toString();
      }
      break;
    case 3:
      if (config.audio.music !== 'unknown') {
        config.audio.music = Math.max(0, Math.min(10, parseInt(config.audio.music) + change)).toString();
      }
      break;
  }
  saveConfig();
}

function loadButtonConfigs() {
  const iniFile = 'host:/src/Configuration Files/config.ini';
  try {
      const file = std.open(iniFile, 'r');
      const fileContent = file.readAsString();
      file.close();

      buttonConfigs = parseIniFile(fileContent);
      console.log('Configuração dos botões carregada com sucesso.');
  } catch (e) {
      console.log(`Erro ao carregar config.ini: ${e.message}`);
  }
}

function saveButtonConfigs() {
  const iniFile = 'host:/src/Configuration Files/config.ini';
  const content = stringifyIniFile(buttonConfigs);

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
      const file = std.open(iniFile, 'w');
      
      // Verifique se o arquivo foi aberto corretamente
      if (!file) {
          console.log(`Não foi possível abrir o arquivo ${iniFile} para escrita.`);
      }

      const buffer = stringToArrayBuffer(content);
      file.write(buffer, 0, buffer.byteLength);
      file.close();
      console.log('Configuração dos botões salva com sucesso.');
  } catch (e) {
      console.log(`Erro ao salvar a configuração dos botões: ${e.message}`);
  }
}

function parseIniFile(content) {
  const lines = content.split('\n');
  const config = {};

  lines.forEach(line => {
      const [key, value] = line.split('=').map(part => part.trim());
      if (key && value) {
          config[key] = value === 'True' ? true : (value === 'False' ? false : value);
      }
  });

  return config;
}

function stringifyIniFile(config) {
  let iniContent = '[Controls]\n';

  for (const [key, value] of Object.entries(config)) {
      iniContent += `${key} = ${value}\n`;
  }

  return iniContent;
}
