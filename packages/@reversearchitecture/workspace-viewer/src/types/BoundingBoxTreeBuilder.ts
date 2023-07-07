import { IBuilder } from "@structurizr/dsl";
import { BoundingBox } from "./BoundingBox";
import { BoundingBoxTree } from "./BoundingBoxTree";
import { IBoundingBoxNode } from "./IBoundingBoxNode";

export class BoundingBoxTreeBuilder implements IBuilder<Map<string, IBoundingBoxNode>> {
    private readonly topLevelTreeId: string = "tree";
    private readonly branches: Map<string, IBoundingBoxNode>;

    constructor() {
        this.branches = new Map<string, IBoundingBoxNode>()
        this.branches.set(this.topLevelTreeId, new BoundingBoxTree());
    }
    
    build(): Map<string, IBoundingBoxNode> {
        return this.branches;
    }

    addBranch(identifier: string, parentId?: string) {
        const parent = this.branches.get(parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const branch = parent.addBranch();
        this.branches.set(identifier, branch);
    }

    addLeaf(box: BoundingBox, identifier: string, parentId?: string) {
        const parent = this.branches.get(parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(identifier, leaf);
    }
}