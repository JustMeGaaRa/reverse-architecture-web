import { IElement } from "../../shared/IElement";
import { IVisitor } from "../../shared/IVisitor";
import { DeploymentNode } from "../../types/model/DeploymentNode";

export class DeploymentNodeElement implements IElement {
    constructor(
        private deploymentNode: DeploymentNode
    ) {}

    accept(visitor: IVisitor) {
        visitor.visitDeploymentNode(this.deploymentNode);
    }

}