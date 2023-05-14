import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { SoftwareSystem } from "../../types/model/SoftwareSystem";

export class SoftwareSystemElement implements IElement {
    constructor(
        private softwareSystem: SoftwareSystem,
        private parentId?: string
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitSoftwareSystem(this.softwareSystem, { parentId: this.parentId });
    }
}