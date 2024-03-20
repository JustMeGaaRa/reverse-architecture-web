import {
    findContainer,
    findSoftwareSystem,
    IViewDefinition,
    IElementVisitor,
    ViewType,
    IGroup,
    IPerson,
    ISoftwareSystem,
    IContainer,
    IComponent,
    IDeploymentNode,
    IInfrastructureNode,
    ISoftwareSystemInstance,
    IContainerInstance,
    IRelationship,
    IConfiguration,
    IModel,
    IElement,
    foldStyles,
} from "@structurizr/dsl";
import {
    getNodeFromElement,
    getEdgeFromRelationship,
} from "../utils";
import { getModelEdgeFromRelationship, getModelNodeFromElement } from "../utils";
import { ReactFlowBuilder } from "./ReactFlowBuilder";
import { ReverseArchitectureElementStyle } from "./ReverseArchitectureTheme";

export class ReactFlowVisitor implements IElementVisitor {
    constructor(
        private model: IModel,
        private configuration: IConfiguration,
        private selectedView: IViewDefinition,
        private builder: ReactFlowBuilder
    ) { }

    visitGroup(group: IGroup, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, group);
        const node = getNodeFromElement({
            elementId: group.identifier,
            element: group,
            isBoundary: false,
            parentId: params?.parentId,
            position: box,
            size: box,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitPerson(person: IPerson, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, person);
        const node = getNodeFromElement({
            element: person,
            position: box,
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;
        const box = getElementBox(this.configuration, this.selectedView, softwareSystem);
            
        const node = getNodeFromElement({
            element: softwareSystem,
            isBoundary,
            parentId: params?.parentId,
            position: box,
            size: box,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainer(container: IContainer, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;
        const box = getElementBox(this.configuration, this.selectedView, container);
        
        const node = getNodeFromElement({
            element: container,
            isBoundary,
            parentId: params?.parentId,
            position: box,
            size: box,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitComponent(component: IComponent, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, component);
        const node = getNodeFromElement({
            element: component,
            position: box,
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, deploymentNode);
        const node = getNodeFromElement({
            element: deploymentNode,
            parentId: params?.parentId,
            position: box,
            size: box,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }
    
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, infrastructureNode);
        const node = getNodeFromElement({
            element: infrastructureNode,
            position: box,
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.model, softwareSystemInstance.softwareSystemIdentifier);
        const box = getElementBox(this.configuration, this.selectedView, softwareSystem, softwareSystemInstance.identifier);
        const node = getNodeFromElement({
            elementId: softwareSystemInstance.identifier,
            element: softwareSystem,
            position: box,
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.model, containerInstance.containerIdentifier);
        const box = getElementBox(this.configuration, this.selectedView, container, containerInstance.identifier);
        const node = getNodeFromElement({
            elementId: containerInstance.identifier,
            element: container,
            position: box,
            parentId: params?.parentId,
            styles: this.configuration.styles,
        });
        this.builder.addNode(node);
    }

    visitRelationship(relationship: IRelationship): void {
        const edge = getEdgeFromRelationship({
            relationship,
            styles: this.configuration.styles,
        });
        this.builder.addEdge(edge);
    }
}

const getElementBox = (
    configuration: IConfiguration,
    view: IViewDefinition,
    element: IElement,
    elementId?: string
) => {
    const defaultPosition = { x: 0, y: 0, width: undefined, height: undefined };
    const elementMetadata = view.elements.find(x => x.id === (elementId ?? element.identifier))
        ?? defaultPosition;
        
    const elementStyle = foldStyles(
        ReverseArchitectureElementStyle,
        configuration.styles.elements,
        element.tags
    );
    const elementBoundingBox = {
        x: elementMetadata.x,
        y: elementMetadata.y,
        width: (elementMetadata.width ?? elementStyle.width),
        height: (elementMetadata.height ?? elementStyle.height),
    };
    return elementBoundingBox;
}

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
            type: "elementModel",
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
            type: "elementModel",
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
            type: "elementModel",
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
            type: "elementModel",
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