import { Workspace } from "../workspace/Workspace";
import { IClient } from "./IClient";
import { IVisitor } from "./IVisitor";

export class DeploymentViewClient implements IClient {
    constructor(
        private workspace: Workspace,
        private environment: string,
        private softwareSystemIdentifier: string
    ) {}

    accept(visitor: IVisitor) {
        
    }
}