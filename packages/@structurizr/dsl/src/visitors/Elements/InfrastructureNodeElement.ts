import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { InfrastructureNode } from "../../types/model/InfrastructureNode";

export class InfrastructureNodeElement implements IElement {
    constructor(
        private infrastructureNode: InfrastructureNode
    ) { }
    
    accept(visitor: IVisitor): void {
        visitor.visitInfrastructureNode(this.infrastructureNode);
    }
}