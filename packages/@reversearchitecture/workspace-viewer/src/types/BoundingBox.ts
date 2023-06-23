export class BoundingBox {
    constructor(
        minX: number,
        minY: number,
        maxX: number,
        maxY: number,
    ) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.width = maxX - minX;
        this.height = maxY - minY;
    }
    
    public readonly minX: number;
    public readonly minY: number;
    public readonly maxX: number;
    public readonly maxY: number;
    public readonly width: number;
    public readonly height: number;

    static readonly Empty: BoundingBox = new BoundingBox(0, 0, 0, 0);

    static create({ minX, minY, maxX, maxY }): BoundingBox {
        return new BoundingBox(minX, minY, maxX, maxY);
    }

    static shift(boundingBox: BoundingBox, shift: number): BoundingBox {
        return new BoundingBox(
            boundingBox.minX + shift,
            boundingBox.minY + shift,
            boundingBox.maxX + shift,
            boundingBox.maxY + shift,
        );
    }

    static extend(boundingBox: BoundingBox, shift: number): BoundingBox {
        return new BoundingBox(
            boundingBox.minX,
            boundingBox.minY,
            boundingBox.maxX + shift,
            boundingBox.maxY + shift,
        );
    }

    static expand(boundingBox: BoundingBox, shift: number): BoundingBox {
        return new BoundingBox(
            boundingBox.minX - shift,
            boundingBox.minY - shift,
            boundingBox.maxX + shift,
            boundingBox.maxY + shift,
        );
    }

    static scale(boundingBox: BoundingBox, scale: number): BoundingBox {
        return new BoundingBox(
            boundingBox.minX,
            boundingBox.minY,
            boundingBox.minX + boundingBox.width * scale,
            boundingBox.minY + boundingBox.height * scale,
        );
    }

    static fold(boundingBoxes: Array<BoundingBox>): BoundingBox {
        return boundingBoxes.reduce((state, box) => BoundingBox.create({
            minX: Math.min(state.minX, box.minX),
            minY: Math.min(state.minY, box.minY),
            maxY: Math.max(state.maxY, box.maxY),
            maxX: Math.max(state.maxX, box.maxX),
        }), boundingBoxes?.at(0) ?? BoundingBox.Empty);
    }
};