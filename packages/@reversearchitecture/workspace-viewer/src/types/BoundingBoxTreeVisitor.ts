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
    IView,
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
import { BoundingBoxTree } from "./BoundingBoxTree";
import { IBoundingBoxNode } from "./IBoundingBoxNode";

export class BoundingBoxTreeVisitor implements IElementVisitor {
    private topLevelTreeId: string = "tree";

    constructor(
        private workspace: Workspace,
        private selectedView: IView,
        private branches: Map<string, IBoundingBoxNode>
    ) {
        this.branches.set(this.topLevelTreeId, new BoundingBoxTree());
    }    

    visitGroup(group: Group, params?: { parentId?: string }): void {
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const branch = parent.addBranch();
        this.branches.set(group.identifier, branch);
    }

    visitPerson(person: Person, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, person);
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(person.identifier, leaf);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;

        if (isBoundary) {
            const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
            const branch = parent.addBranch();
            this.branches.set(softwareSystem.identifier, branch);
        } else {
            const box = getElementBox(this.workspace, this.selectedView, softwareSystem);
            const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
            const leaf = parent.addLeaf(box);
            this.branches.set(softwareSystem.identifier, leaf);
        }
    }

    visitContainer(container: Container, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;

        if (isBoundary) {
            const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
            const branch = parent.addBranch();
            this.branches.set(container.identifier, branch);
        } else {
            const box = getElementBox(this.workspace, this.selectedView, container);
            const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
            const leaf = parent.addLeaf(box);
            this.branches.set(container.identifier, leaf);
        }
    }

    visitComponent(component: Component, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, component);
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(component.identifier, leaf);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string }): void {
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const branch = parent.addBranch();
        this.branches.set(deploymentNode.identifier, branch);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string }): void {
        const box = getElementBox(this.workspace, this.selectedView, infrastructureNode);
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(infrastructureNode.identifier, leaf);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string }): void {
        const softwareSystem = findSoftwareSystem(this.workspace, softwareSystemInstance.softwareSystemIdentifier);
        const box = getElementBox(this.workspace, this.selectedView, softwareSystem, softwareSystemInstance.identifier);
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(softwareSystemInstance.identifier, leaf);
    }

    visitContainerInstance(containerInstance: ContainerInstance, params?: { parentId?: string }): void {
        const container = findContainer(this.workspace, containerInstance.containerIdentifier);
        const box = getElementBox(this.workspace, this.selectedView, container, containerInstance.identifier);
        const parent = this.branches.get(params?.parentId ?? this.topLevelTreeId) as BoundingBoxTree;
        const leaf = parent.addLeaf(box);
        this.branches.set(containerInstance.identifier, leaf);
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
    view: IView,
    element: Element,
    elementId?: string
) => {
    const defaultPosition: Position = { x: 0, y: 0 };
    const position = view.elements.find(x => x.id === (elementId ?? element.identifier)) ?? defaultPosition;
    return createElementBox(workspace.views.configuration.styles.elements, element, position);
}