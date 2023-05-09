import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { ContainerInstance } from "../../types/model/ContainerInstance";

export class ContainerInstanceElement implements IElement {
    constructor(
        private containerInstance: ContainerInstance
    ) { }
    
    accept(visitor: IVisitor): void {
        visitor.visitContainerInstance(this.containerInstance);
    }
}