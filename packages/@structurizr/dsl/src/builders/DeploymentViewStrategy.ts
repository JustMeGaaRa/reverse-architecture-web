import {
    IDeploymentNode,
    IDeploymentView,
    IElementVisitor,
    IModel,
    ISupportVisitor
} from "../interfaces";
import {
    getRelationships,
    relationshipExistsForElementsInView
} from "../utils";

export class DeploymentViewStrategy implements ISupportVisitor {
    constructor(
        private model: IModel,
        private view: IDeploymentView
    ) {}

    accept<T>(visitor: IElementVisitor<T>): Array<T> {
        const visitedElements = new Set<string>();
        const relationships = getRelationships(this.model, true);
        
        const visitDeploymentNode = (deploymentNode: IDeploymentNode, parentId?: string) => {
            const visitedInfrastructureNodes = deploymentNode.infrastructureNodes?.map(infrastructureNode => {
                visitedElements.add(infrastructureNode.identifier);
                return visitor.visitInfrastructureNode(infrastructureNode, { parentId: deploymentNode.identifier })
            });

            const visitedSoftwareSystemInstances = deploymentNode.softwareSystemInstances?.map(softwareSystemInstance => {
                visitedElements.add(softwareSystemInstance.identifier);
                return visitor.visitSoftwareSystemInstance(softwareSystemInstance, { parentId: deploymentNode.identifier });
            });

            const visitedContainerInstances = deploymentNode.containerInstances?.map(containerInstance => {
                visitedElements.add(containerInstance.identifier);
                return visitor.visitContainerInstance(containerInstance, { parentId: deploymentNode.identifier });
            });

            const visistedDeploymentNodes = deploymentNode.deploymentNodes?.map(subNode => {
                visitedElements.add(subNode.identifier);
                return visitDeploymentNode(subNode, deploymentNode.identifier);
            });

            visitedElements.add(deploymentNode.identifier);
            const children = visitedInfrastructureNodes
                .concat(visitedSoftwareSystemInstances)
                .concat(visitedContainerInstances)
                .concat(visistedDeploymentNodes);
            
            return visitor.visitDeploymentNode(deploymentNode, { parentId, children });
        };

        // TODO: handle the deployment view scoped to a specific software system instance
        const visitedDeploymentEnvironment = this.model.deploymentEnvironments
            // .filter(deploymentEnvironment => deploymentEnvironment.identifier == this.view.softwareSystemIdentifier)
            .filter(deploymentEnvironment => deploymentEnvironment.name === this.view.environment)
            // .filter(deploymentEnvironment => deploymentEnvironment.identifier === this.view.identifier)
            .flatMap(deploymentEnvironment => {
                return deploymentEnvironment.deploymentNodes.map(deploymentNode => {
                    return visitDeploymentNode(deploymentNode);
                });
            });
        
        const visitedRelationships = relationships
            .filter(relationship => relationshipExistsForElementsInView(Array.from(visitedElements), relationship))
            .map(relationship => visitor.visitRelationship(relationship));
            
        console.log(visitedDeploymentEnvironment);
        return visitedDeploymentEnvironment.concat(visitedRelationships);
    }
}