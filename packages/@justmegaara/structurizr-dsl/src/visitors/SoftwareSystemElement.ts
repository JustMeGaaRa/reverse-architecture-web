import { SoftwareSystem } from "../model/SoftwareSystem";
import { IElement } from "./IElement";
import { IVisitor } from "./IVisitor";

export class SoftwareSystemElement implements IElement {
    constructor(
        private softwareSystem: SoftwareSystem
    ) {}

    accept(visitor: IVisitor): void {
        visitor.visitSoftwareSystem(this.softwareSystem);
    }
}