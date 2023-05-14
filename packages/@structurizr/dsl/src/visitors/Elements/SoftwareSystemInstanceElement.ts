import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { SoftwareSystemInstance } from "../../types/model/SoftwareSystemInstance";

export class SoftwareSystemInstanceElement implements IElement {
    constructor(
        private softwareSystemInstance: SoftwareSystemInstance,
        private parentId?: string
    ) { }
    
    accept(visitor: IVisitor): void {
        visitor.visitSoftwareSystemInstance(this.softwareSystemInstance, { parentId: this.parentId });
    }
}