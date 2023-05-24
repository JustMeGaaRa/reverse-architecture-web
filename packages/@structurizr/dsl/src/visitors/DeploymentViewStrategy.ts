import {
    IVisitor,
    IViewStrategy,
    IView,
    Workspace,
    DeploymentNode,
    ViewType
} from "../../";

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
            visitor.visitDeploymentNode(deploymentNode, { parentId });

            deploymentNode.infrastructureNodes?.forEach(infrastructureNode => {
                visitor.visitInfrastructureNode(infrastructureNode, { parentId: deploymentNode.identifier })
            });

            deploymentNode.softwareSystemInstances?.forEach(softwareSystemInstance => {
                visitor.visitSoftwareSystemInstance(softwareSystemInstance, { parentId: deploymentNode.identifier });
            });

            deploymentNode.containerInstances?.forEach(containerInstance => {
                visitor.visitContainerInstance(containerInstance, { parentId: deploymentNode.identifier });
            });

            deploymentNode.deploymentNodes?.forEach(subNode => {
                visitDeploymentNode(subNode, deploymentNode.identifier)
            });
        };

        // TODO: handle the deployment view scoped to a specific software system instance
        this.workspace.model.deploymentEnvironments
            .filter(deploymentEnvironment => deploymentEnvironment.name === this.environment)
            // .filter(deploymentEnvironment => deploymentEnvironment.identifier === this.view.identifier)
            .forEach(deploymentEnvironment => {
                deploymentEnvironment.deploymentNodes.forEach(deploymentNode => {
                    visitDeploymentNode(deploymentNode);
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