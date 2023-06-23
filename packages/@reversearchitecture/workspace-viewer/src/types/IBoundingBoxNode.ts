import { BoundingBox } from "./BoundingBox";

interface ISupportBoundingBox {
    getBoundingBox(): BoundingBox;
}

interface ISupportSize {
    getSize(): Size;
}

interface ISupportAbsolutePosition {
    getAbsolutePosition(): Position;
}

interface ISupportRelativePosition {
    getRelativePosition(): Position;
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface IBoundingBoxNode extends
    ISupportBoundingBox,
    ISupportRelativePosition,
    ISupportAbsolutePosition,
    ISupportSize { }