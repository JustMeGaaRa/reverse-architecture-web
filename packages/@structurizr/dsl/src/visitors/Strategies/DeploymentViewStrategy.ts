import { IVisitor } from "../../shared/IVisitor";
import { IViewStrategy } from "../../shared/IViewStrategy";
import { IView } from "../../shared/IView";
import { Workspace } from "../../types/Workspace";
import { DeploymentNode } from "../../types/model/DeploymentNode";
import { ViewType } from "../../types/views/ViewType";
import {
    ContainerInstanceElement,
    DeploymentNodeElement,
    InfrastructureNodeElement,
    SoftwareSystemInstanceElement
} from "../Elements";

export class DeploymentViewStrategy implements IViewStrategy {
    constructor(
        private workspace: Workspace,
        private view: IView,
        private environment: string
    ) {}

    accept(visitor: IVisitor): void {
        const visitDeploymentNode = (
            deploymentNode: DeploymentNode,
            parentId?: string
        ) => {
            new DeploymentNodeElement(deploymentNode, parentId).accept(visitor);

            deploymentNode.infrastructureNodes
                ?.forEach(infrastructureNode => {
                    new InfrastructureNodeElement(
                        infrastructureNode,
                        deploymentNode.identifier
                    ).accept(visitor);
                });

            deploymentNode.softwareSystemInstances
                ?.forEach(softwareSystemInstance => {
                    new SoftwareSystemInstanceElement(
                        softwareSystemInstance,
                        deploymentNode.identifier
                    ).accept(visitor);
                });

            deploymentNode.containerInstances
                ?.forEach(containerInstance => {
                    new ContainerInstanceElement(
                        containerInstance,
                        deploymentNode.identifier
                    ).accept(visitor);
                });

            deploymentNode.deploymentNodes
                ?.forEach(subNode => visitDeploymentNode(subNode, deploymentNode.identifier));
        };

        // TODO: handle the deployment view scoped to a specific software system instance
        this.workspace.model.deploymentEnvironments
            .filter(deploymentEnvironment => deploymentEnvironment.name === this.environment)
            // .filter(deploymentEnvironment => deploymentEnvironment.identifier === this.view.identifier)
            .forEach(deploymentEnvironment => {
                deploymentEnvironment.deploymentNodes
                    .forEach(deploymentNode => visitDeploymentNode(deploymentNode));
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