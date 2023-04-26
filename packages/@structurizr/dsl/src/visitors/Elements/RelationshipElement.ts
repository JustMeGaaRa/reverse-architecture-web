import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { Relationship } from "../../types/model/Relationship";

export class RelationshipElement implements IElement {
    constructor(
        private relationship: Relationship
    ) {}
    
    accept(visitor: IVisitor): void {
        visitor.visitRelationship(this.relationship);
    }
}