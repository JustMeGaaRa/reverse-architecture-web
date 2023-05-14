import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { Group } from "../../types/model/Group";

export class GroupElement implements IElement {
    constructor(
        private group: Group,
        private parentId?: string
    ) { }
    
    accept(visitor: IVisitor): void {
        visitor.visitGroup(this.group, { parentId: this.parentId });
    }
}