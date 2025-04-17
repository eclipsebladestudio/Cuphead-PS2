export class ImageManager {
    constructor(path) {
        this.image = new Image(path);
        this.x = 0;
        this.y = 0;
        this.width = this.image.width;
        this.height = this.image.height;
        this.color = null;

        SceneManager.trackImage(this);
    }

    draw(x, y) {
        if (this.image) {
            this.image.width = this.width;
            this.image.height = this.height;

            if (this.color) {
                this.image.color = this.color;
            }

            this.image.draw(x, y);
        }
    }

    free() {
        this.image = null;
    }
}

export const SceneManager = {
    currentScene: null,
    loadedImages: new Set(),

    trackImage(image) {
        this.loadedImages.add(image);
    },

    clear() {
        this.loadedImages.forEach(image => {
            if (image && image.free) image.free();
        });
        this.loadedImages.clear();

        if (typeof std !== "undefined" && std.gc) {
            std.gc();
        }

        this.currentScene = null;
    },

    load(sceneFunction) {
        this.clear();
        this.currentScene = sceneFunction;
        sceneFunction();
    },

    update() {
        if (this.currentScene) {
            this.currentScene();
        }
    }
};
