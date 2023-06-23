import { BoundingBox } from "./BoundingBox";
import { BoundingBoxLeaf } from "./BoundingBoxLeaf";
import { IBoundingBoxNode, Position, Size } from "./IBoundingBoxNode";

export class BoundingBoxTree implements IBoundingBoxNode {
    constructor(
        private readonly leaves: Array<BoundingBoxLeaf | BoundingBoxTree> = [],
        private readonly parent?: BoundingBoxTree
    ) { }

    getBoundingBox(): BoundingBox {
        return BoundingBox.expand(BoundingBox.fold(this.leaves.map(x => x.getBoundingBox())), 100);
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

    addLeaf(box: BoundingBox): BoundingBoxLeaf {
        const leaf = new BoundingBoxLeaf(box, this);
        this.leaves.push(leaf);
        return leaf;
    }

    addLeaves(boxes: Array<BoundingBox>): Array<BoundingBoxLeaf> {
        return boxes.map(box => this.addLeaf(box));
    }

    addBranch(): BoundingBoxTree {
        const branch = new BoundingBoxTree([], this);
        this.leaves.push(branch);
        return branch;
    }
}