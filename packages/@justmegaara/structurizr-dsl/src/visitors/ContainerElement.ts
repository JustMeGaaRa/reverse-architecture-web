import { Container } from "../model/Container";
import { IElement } from "./IElement";
import { IVisitor } from "./IVisitor";

export class ContainerElement implements IElement {
    constructor(
        private container: Container
    ) {}
    
    accept(visitor: IVisitor): void {
        visitor.visitContainer(this.container);
    }
}