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
import { getModelEdgeFromRelationship, getModelNodeFromElement } from "../utils";

export class ReactFlowModelVisitor implements IElementVisitor {
    private readonly nodeHeight = 70;
    private readonly nodeWidth = 300;
    private readonly nodeHeightSpacing = 64;
    private readonly nodeWidthSpacing = 32;

    constructor(
        private model: IModel,
        private configuration: IConfiguration,
        private builder: ReactFlowBuilder
    ) { }
    
    visitGroup(group: IGroup, params?: { parentId?: string; }): void {
        throw new Error("Method not supported.");
    }
    visitPerson(person: IPerson, params?: { parentId?: string; }): void {
        const x = (-1) * (this.nodeWidth + this.nodeWidthSpacing);
        const y = 0;
        const personNode = getModelNodeFromElement({
            element: person,
            elementChildrenCount: undefined,
            type: "element",
            styles: this.configuration.styles,
            position: { x, y }
        });
        this.builder.addNode(personNode);
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; }): void {
        const x = (this.nodeWidth + this.nodeWidthSpacing);
        const y = 0;
        const softwareSystemNode = getModelNodeFromElement({
            element: softwareSystem,
            elementChildrenCount: softwareSystem.containers.length,
            type: "element",
            styles: this.configuration.styles,
            position: { x, y }
        });
        this.builder.addNode(softwareSystemNode);
    }
    visitContainer(container: IContainer, params?: { parentId?: string; }): void {
        const x = (this.nodeWidth + this.nodeWidthSpacing);
        const y = this.nodeHeight + this.nodeHeightSpacing;
        const containerNode = getModelNodeFromElement({
            element: container,
            elementChildrenCount: container.components.length,
            type: "element",
            styles: this.configuration.styles,
            position: { x, y }
        });
        this.builder.addNode(containerNode);
    }
    visitComponent(component: IComponent, params?: { parentId?: string; }): void {
        const x = (this.nodeWidth + this.nodeWidthSpacing);
        const y = 2 * (this.nodeHeight + this.nodeHeightSpacing);
        const componentNode = getModelNodeFromElement({
            element: component,
            elementChildrenCount: undefined,
            type: "element",
            styles: this.configuration.styles,
            position: { x, y }
        });
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
        const edge = getModelEdgeFromRelationship({
            relationship: relationship,
            styles: this.configuration.styles,
        });
        this.builder.addEdge(edge);
    }
}