export function setSceneToLoad(scriptName) {

    const content = std.loadFile("src/Configuration Files/config.json");

    const file = std.open("src/Configuration Files/config.json", "w");

    let newJSON = JSON.parse(content);

    newJSON.sceneToLoad = "src/Scenes/" + scriptName;

    file.puts(JSON.stringify(newJSON));
    file.flush();
    file.close();
}

export function getSceneToLoad() {

    let sceneToLoad;

    const content = std.loadFile("src/Configuration Files/config.json");

    sceneToLoad = JSON.parse(content).sceneToLoad;

    return sceneToLoad;
}