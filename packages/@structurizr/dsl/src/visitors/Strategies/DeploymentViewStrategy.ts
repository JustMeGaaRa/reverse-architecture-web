import { Workspace } from "../../types/Workspace";
import { IVisitor } from "../../shared/IVisitor";
import { IViewStrategy } from "../../shared/IViewStrategy";
import { IView } from "../../shared/IView";
import { ViewType } from "../../types/views/ViewType";
import { DeploymentNodeElement } from "../Elements";

export class DeploymentViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView,
        private environment: string
    ) {}

    accept(visitor: IVisitor): void {
        this.workspace.model.deploymentEnvironments
            .filter(deploymentEnvironment => deploymentEnvironment.name === this.environment)
            .filter(deploymentEnvironment => deploymentEnvironment.identifier === this.view.identifier)
            .forEach(deploymentEnvironment => {
                deploymentEnvironment.deploymentNodes
                    .forEach(deploymentNode => {
                        new DeploymentNodeElement(deploymentNode).accept(visitor);
                    });
            });
    }

    getPath(): Array<IView> {
        for (let softwareSystem of this.workspace.model.softwareSystems) {
            if (softwareSystem.identifier === this.view.identifier) {
                return [
                    {
                        type: ViewType.Deployment,
                        identifier: softwareSystem.identifier,
                        title: softwareSystem.name,
                        elements: []
                    }
                ];
            }
        }

        return [];
    }
}