import {
    Component,
    Container,
    ContainerInstance,
    DeploymentNode,
    IElement,
    findContainer,
    findSoftwareSystem,
    Group,
    InfrastructureNode,
    IViewDefinition,
    IElementVisitor,
    Person,
    Relationship,
    SoftwareSystem,
    SoftwareSystemInstance,
    ViewType,
    Workspace,
    ElementStyle,
    Position,
    foldStyles,
    IWorkspace,
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
    IModel
} from "@structurizr/dsl";
import { BoundingBox } from "./BoundingBox";
import { BoundingBoxTreeBuilder } from "./BoundingBoxTreeBuilder";
import { ReverseArchitectureElementStyle } from "./ReverseArchitectureTheme";

export class BoundingBoxTreeVisitor implements IElementVisitor {
    constructor(
        private model: IModel,
        private configuration: IConfiguration,
        private selectedView: IViewDefinition,
        private builder: BoundingBoxTreeBuilder,
    ) { }    

    visitGroup(group: IGroup, params?: { parentId?: string }): void {
        this.builder.addBranch(group.identifier, params?.parentId);
    }

    visitPerson(person: IPerson, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, person);
        this.builder.addLeaf(box, person.identifier, params?.parentId);
    }
    
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;

        if (isBoundary) {
            this.builder.addBranch(softwareSystem.identifier, params?.parentId);
        }
        else {
            const box = getElementBox(this.configuration, this.selectedView, softwareSystem);
            this.builder.addLeaf(box, softwareSystem.identifier, params?.parentId);
        }
    }

    visitContainer(container: IContainer, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;

        if (isBoundary) {
            this.builder.addBranch(container.identifier, params?.parentId);
        }
        else {
            const box = getElementBox(this.configuration, this.selectedView, container);
            this.builder.addLeaf(box, container.identifier, params?.parentId);
        }
    }

    visitComponent(component: IComponent, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, component);
        this.builder.addLeaf(box, component.identifier, params?.parentId);
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string }): void {
        this.builder.addBranch(deploymentNode.identifier, params?.parentId);
    }
    
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string }): void {
        const box = getElementBox(this.configuration, this.selectedView, infrastructureNode);
        this.builder.addLeaf(box, infrastructureNode.identifier, params?.parentId);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.model, softwareSystemInstance.softwareSystemIdentifier);
        const box = getElementBox(this.configuration, this.selectedView, softwareSystem, softwareSystemInstance.identifier);
        this.builder.addLeaf(box, softwareSystemInstance.identifier, params?.parentId);
    }

    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.model, containerInstance.containerIdentifier);
        const box = getElementBox(this.configuration, this.selectedView, container, containerInstance.identifier);
        this.builder.addLeaf(box, containerInstance.identifier, params?.parentId);
    }

    visitRelationship(relationship: IRelationship): void {
    }
}

const createElementBox = (
    styles: ElementStyle,
    element: IElement,
    position: Position
) => {
    const elementStyle = foldStyles(ReverseArchitectureElementStyle, styles, element.tags);
    const elementBoundingBox = BoundingBox.create({
        minX: position.x,
        minY: position.y,
        maxX: position.x + elementStyle.width,
        maxY: position.y + elementStyle.height,
    });
    return elementBoundingBox;
}

const getElementBox = (
    configuration: IConfiguration,
    view: IViewDefinition,
    element: IElement,
    elementId?: string
) => {
    const defaultPosition: Position = { x: 0, y: 0 };
    const position = view.elements.find(x => x.id === (elementId ?? element.identifier)) ?? defaultPosition;
    return createElementBox(configuration.styles.elements, element, position);
}