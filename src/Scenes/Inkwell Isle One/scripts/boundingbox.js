class BoundingBox {
    constructor() {
        this.boxes = [
            { x: 106, y: 325, width: 100, height: 50 },
            { x: 100, y: 227, width: 50, height: 100 },
            { x: 297, y: 163, width: 60, height: 150 },
            { x: 480, y: 183, width: 130, height: 50 },
            { x: 480, y: 295, width: 130, height: 50 },
            { x: 415, y: 146, width: 50, height: 50 },
            { x: 358, y: 116, width: 50, height: 50 },
            { x: 395, y: 384, width: 50, height: 50 },
            { x: 430, y: 366, width: 50, height: 50 },
            { x: 254, y: 387, width: 100, height: 50 },
            { x: 727, y: 249, width: 75, height: 75 }
        ];
    }

    getBoundingBoxes() {
        return this.boxes;
    }
}

export default BoundingBox;
