import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { Container } from "../../types/model/Container";

export class ContainerElement implements IElement {
    constructor(
        private container: Container
    ) {}
    
    accept(visitor: IVisitor): void {
        visitor.visitContainer(this.container);
    }
}