import { BoundingBox } from "./BoundingBox";
import { BoundingBoxTree } from "./BoundingBoxTree";
import { IBoundingBoxNode, Position, Size } from "./IBoundingBoxNode";

export class BoundingBoxLeaf implements IBoundingBoxNode {
    constructor(
        private readonly box: BoundingBox,
        private readonly parent: BoundingBoxTree,
    ) { }

    getBoundingBox(): BoundingBox {
        return this.box;
    }

    getRelativePosition(): Position {
        return {
            x: this.getBoundingBox().minX - this.parent.getBoundingBox().minX,
            y: this.getBoundingBox().minY - this.parent.getBoundingBox().minY,
        };
    }

    getAbsolutePosition(): Position {
        return {
            x: this.getBoundingBox().minX,
            y: this.getBoundingBox().minY,
        };
    }

    getSize(): Size {
        return {
            width: this.getBoundingBox().width,
            height: this.getBoundingBox().height,
        };
    }
}