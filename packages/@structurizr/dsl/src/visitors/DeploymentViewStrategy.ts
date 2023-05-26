import {
    IVisitor,
    IView,
    Workspace,
    DeploymentNode,
    ISupportVisitor
} from "../";

export class DeploymentViewStrategy implements ISupportVisitor {
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
}