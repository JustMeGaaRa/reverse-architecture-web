export class BoundingBox {
    constructor(rect: { x: number, y: number, width: number, height: number }) {
        this.x = rect?.x ?? 0;
        this.y = rect?.y ?? 0;
        this.width = rect?.width ?? 0;
        this.height = rect?.height ?? 0;
    }

    public static fromRect(rect: DOMRect) {
        return new BoundingBox({
            x: rect?.left ?? 0,
            y: rect?.top ?? 0,
            width: rect ? rect.left - rect.right : 0,
            height: rect ? rect.top - rect.bottom : 0
        });
    }

    public static createSquare(x: number, y: number, side: number) {
        return new BoundingBox({
            x,
            y,
            width: side,
            height: side
        });
    }

    public static createRectangle(x: number, y: number, height: number, width: number) {
        return new BoundingBox({
            x,
            y,
            width,
            height
        });
    }

    public readonly x: number;
    public readonly y: number;
    public readonly width: number;
    public readonly height: number;

    public hitTest(pointX: number, pointY: number): boolean {
        return (
            pointX >= this.x &&
            pointX <= this.x + this.width &&
            pointY >= this.y &&
            pointY <= this.y + this.height
        );
    }

    public shift(offset: number): BoundingBox {
        return new BoundingBox({
            x: this.x + offset,
            y: this.y + offset,
            width: this.width,
            height: this.height
        });
    }

    public enlarge(area: number): BoundingBox {
        return new BoundingBox({
            x: this.x - area,
            y: this.y - area,
            width: this.width + area * 2,
            height: this.height + area * 2
        });
    }

    public multiply(factor: number): BoundingBox {
        return new BoundingBox({
            x: this.x,
            y: this.y,
            width: this.width * factor,
            height: this.height * factor
        });
    }

    public extend(length: number): BoundingBox {
        return new BoundingBox({
            x: this.x,
            y: this.y,
            width: this.width + length,
            height: this.height + length
        });
    }
}