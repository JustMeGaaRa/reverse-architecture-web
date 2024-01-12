import { Rect } from "@reactflow/core";

type Position = { x: number, y: number };

export class BoundingBox {
    constructor(rect: { x1: number, y1: number, x2: number, y2: number }) {
        this.x1 = rect?.x1 ?? 0;
        this.y1 = rect?.y1 ?? 0;
        this.x2 = rect?.x2 ?? 0;
        this.y2 = rect?.y2 ?? 0;
    }

    public static Empty = new BoundingBox({ x1: 0, y1: 0, x2: 0, y2: 0 });

    public static fromRect(rect: Rect) {
        return new BoundingBox({
            x1: rect?.x ?? 0,
            y1: rect?.y ?? 0,
            x2: rect?.x + rect?.width ?? 0,
            y2: rect?.y + rect?.height ?? 0
        });
    }

    public static createSquare(x: number, y: number, side: number) {
        return new BoundingBox({
            x1: x,
            y1: y,
            x2: x + side,
            y2: y + side
        });
    }

    public static createRectangle(x: number, y: number, height: number, width: number) {
        return new BoundingBox({
            x1: x,
            y1: y,
            x2: x + width,
            y2: y + height
        });
    }

    public static combine(boundingBoxes: BoundingBox[]) {
        return boundingBoxes.reduce((box, current) => {
            return new BoundingBox({
                x1: Math.min(box.x1, current.x1),
                y1: Math.min(box.y1, current.y1),
                x2: Math.max(box.x2, current.x2),
                y2: Math.max(box.y2, current.y2)
            })
        }, BoundingBox.Empty);
    }

    public readonly x1: number;
    public readonly y1: number;
    public readonly x2: number;
    public readonly y2: number;
    public get width(): number { return this.x2 - this.x1; }
    public get height(): number { return this.y2 - this.y1; }
    public get position(): Position { return { x: this.x1, y: this.y1 }; }

    public hitTest(pointX: number, pointY: number): boolean {
        return (
            pointX >= this.x1 &&
            pointX <= this.x1 + this.width &&
            pointY >= this.y1 &&
            pointY <= this.y1 + this.height
        );
    }

    public shift(offset: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1 + offset,
            y1: this.y1 + offset,
            x2: this.x2 + offset,
            y2: this.y2 + offset
        });
    }

    public marginX(offset: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1 - offset,
            y1: this.y1,
            x2: this.x2 + offset,
            y2: this.y2
        });
    }

    public marginY(offset: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1,
            y1: this.y1 - offset,
            x2: this.x2,
            y2: this.y2 + offset
        });
    }

    public margin(offset: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1 - offset,
            y1: this.y1 - offset,
            x2: this.x2 + offset,
            y2: this.y2 + offset
        });
    }

    public scale(factor: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1,
            y1: this.y1,
            x2: this.x1 + this.width * factor,
            y2: this.y1 + this.height * factor
        });
    }

    public extend(length: number): BoundingBox {
        return new BoundingBox({
            x1: this.x1,
            y1: this.y1,
            x2: this.x2 + length,
            y2: this.y2 + length
        });
    }
}