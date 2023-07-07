import {
    Component,
    Container,
    ContainerInstance,
    DeploymentNode,
    Element,
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
    defaultElementStyle,
} from "@structurizr/dsl";
import { BoundingBox } from "./BoundingBox";
import { BoundingBoxTreeBuilder } from "./BoundingBoxTreeBuilder";

export class BoundingBoxTreeVisitor implements IElementVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: IViewDefinition,
        private builder: BoundingBoxTreeBuilder,
    ) { }    

    visitGroup(group: Group, params?: { parentId?: string }): void {
        this.builder.addBranch(group.identifier, params?.parentId);
    }

    visitPerson(person: Person, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, person);
        this.builder.addLeaf(box, person.identifier, params?.parentId);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;

        if (isBoundary) {
            this.builder.addBranch(softwareSystem.identifier, params?.parentId);
        }
        else {
            const box = getElementBox(this.workspace, this.selectedView, softwareSystem);
            this.builder.addLeaf(box, softwareSystem.identifier, params?.parentId);
        }
    }

    visitContainer(container: Container, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;

        if (isBoundary) {
            this.builder.addBranch(container.identifier, params?.parentId);
        }
        else {
            const box = getElementBox(this.workspace, this.selectedView, container);
            this.builder.addLeaf(box, container.identifier, params?.parentId);
        }
    }

    visitComponent(component: Component, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, component);
        this.builder.addLeaf(box, component.identifier, params?.parentId);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string }): void {
        this.builder.addBranch(deploymentNode.identifier, params?.parentId);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, infrastructureNode);
        this.builder.addLeaf(box, infrastructureNode.identifier, params?.parentId);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.workspace, softwareSystemInstance.softwareSystemIdentifier);
        const box = getElementBox(this.workspace, this.selectedView, softwareSystem, softwareSystemInstance.identifier);
        this.builder.addLeaf(box, softwareSystemInstance.identifier, params?.parentId);
    }

    visitContainerInstance(containerInstance: ContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.workspace, containerInstance.containerIdentifier);
        const box = getElementBox(this.workspace, this.selectedView, container, containerInstance.identifier);
        this.builder.addLeaf(box, containerInstance.identifier, params?.parentId);
    }

    visitRelationship(relationship: Relationship): void {
    }
}

const createElementBox = (
    styles: ElementStyle,
    element: Element,
    position: Position
) => {
    const elementStyle = foldStyles(defaultElementStyle, styles, element.tags);
    const elementBoundingBox = BoundingBox.create({
        minX: position.x,
        minY: position.y,
        maxX: position.x + elementStyle.width,
        maxY: position.y + elementStyle.height,
    });
    return elementBoundingBox;
}

const getElementBox = (
    workspace: Workspace,
    view: IViewDefinition,
    element: Element,
    elementId?: string
) => {
    const defaultPosition: Position = { x: 0, y: 0 };
    const position = view.elements.find(x => x.id === (elementId ?? element.identifier)) ?? defaultPosition;
    return createElementBox(workspace.views.configuration.styles.elements, element, position);
}