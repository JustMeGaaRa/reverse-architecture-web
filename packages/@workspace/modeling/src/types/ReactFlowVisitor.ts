import {
    IComponent,
    IConfiguration,
    IContainer,
    IContainerInstance,
    IDeploymentNode,
    IElementVisitor,
    IGroup,
    IInfrastructureNode,
    IModel,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IViewDefinition
} from "@structurizr/dsl";
import { ReactFlowBuilder } from "@workspace/core";

export class ReactFlowVisitor implements IElementVisitor {
    private readonly nodeHeight = 70;
    private readonly nodeWidth = 300;
    private readonly nodeHeightSpacing = 64;
    private readonly nodeWidthSpacing = 32;

    constructor(
        private model: IModel,
        private builder: ReactFlowBuilder
    ) { }
    
    visitGroup(group: IGroup, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitPerson(person: IPerson, params?: { parentId?: string; }): void {
        const positionX = (-1) * (this.nodeWidth + this.nodeWidthSpacing);
        const positionY = 0;
        const personNode = ({
            id: person.identifier,
            type: "element",
            data: {
                element: person
            },
            position: { x: positionX, y: positionY },
        })
        this.builder.addNode(personNode);
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; }): void {
        const positionX = (this.nodeWidth + this.nodeWidthSpacing);
        const positionY = 0;
        const softwareSystemNode: any = ({
            id: softwareSystem.identifier,
            type: "element",
            data: {
                element: softwareSystem,
                elementChildrenCount: softwareSystem.containers.length
            },
            position: { x: positionX, y: positionY },
        })
        this.builder.addNode(softwareSystemNode);
    }
    visitContainer(container: IContainer, params?: { parentId?: string; }): void {
        const positionX = (this.nodeWidth + this.nodeWidthSpacing);
        const positionY = this.nodeHeight + this.nodeHeightSpacing;
        const containerNode: any = ({
            id: container.identifier,
            type: "element",
            data: {
                element: container,
                elementChildrenCount: container.components.length
            },
            position: { x: positionX, y: positionY },
        })
        this.builder.addNode(containerNode);
    }
    visitComponent(component: IComponent, params?: { parentId?: string; }): void {
        const positionX = (this.nodeWidth + this.nodeWidthSpacing);
        const positionY = 2 * (this.nodeHeight + this.nodeHeightSpacing);
        const componentNode = ({
            id: component.identifier,
            type: "element",
            data: {
                element: component
            },
            position: { x: positionX, y: positionY },
        })
        this.builder.addNode(componentNode);
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitRelationship(relationship: IRelationship): void {
        const edge = ({
            id: `${relationship.sourceIdentifier}-${relationship.targetIdentifier}`,
            type: "smoothstep",
            source: relationship.sourceIdentifier,
            target: relationship.targetIdentifier,
        })
        this.builder.addEdge(edge);
    }
}