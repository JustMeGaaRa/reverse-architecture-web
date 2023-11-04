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
    ReactFlowBuilder,
    ReverseArchitectureElementStyle,
} from "@workspace/core";
import {
    getNodeFromElement,
    getEdgeFromRelationship,
} from "../utils";

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
            isBoundary: true,
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