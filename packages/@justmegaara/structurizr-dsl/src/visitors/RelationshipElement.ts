import { Relationship } from "../model/Relationship";
import { IElement } from "./IElement";
import { IVisitor } from "./IVisitor";

export class RelationshipElement implements IElement {
    constructor(
        private relationship: Relationship
    ) {}
    
    accept(visitor: IVisitor): void {
        visitor.visitRelationship(this.relationship);
    }
}