import { Edge, Node } from "@reactflow/core";
import {
    Component,
    Container,
    ContainerInstance,
    defaultElementStyle,
    DeploymentNode,
    Element,
    ElementStyle,
    Group,
    InfrastructureNode,
    IView,
    IVisitor,
    Model,
    Person,
    Position,
    Relationship,
    RelationshipStyle,
    Size,
    SoftwareSystem,
    SoftwareSystemInstance,
    Styles,
    Tag,
    Views,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import { ReactFlowJsonObjectBuilder } from "./ReactFlowJsonObjectBuilder";

export class ReactFlowVisitor implements IVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: IView,
        private builder: ReactFlowJsonObjectBuilder
    ) { }

    visitWorkspace(workspace: Workspace): void {
        throw new Error("Method not implemented.");
    }

    visitModel(model: Model): void {
        throw new Error("Method not implemented.");
    }

    visitGroup(group: Group, params?: { parentId?: string }): void {
        const boundingBox = getBoundingBox(
            this.selectedView,
            Array.from<{ identifier: string }>([])
                .concat(group.softwareSystems)
                .concat(group.people)
                .concat(group.containers)
                .concat(group.components));
        
        const node = fromElement({
            elementId: group.identifier,
            element: group,
            isBoundary: true,
            position: boundingBox,
            parentId: params?.parentId,
            size: boundingBox,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitPerson(person: Person, params?: { parentId?: string }): void {
        const node = fromElement({
            element: person,
            position: this.selectedView.elements.find(x => x.id === person.identifier) ?? { x: 0, y: 0 },
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;
        const position = this.selectedView.elements.find(x => x.id === softwareSystem.identifier)
            ?? { x: 0, y: 0 };
        const boundingBox = isBoundary
            ? getBoundingBox(
                this.selectedView,
                softwareSystem.groups.flatMap(x => x.containers).concat(softwareSystem.containers))
            : { ...position, width: defaultElementStyle.width, height: defaultElementStyle.height };
        const node = fromElement({
            element: softwareSystem,
            isBoundary,
            position,
            parentId: params?.parentId,
            size: boundingBox,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitContainer(container: Container, params?: { parentId?: string }): void {
        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;
        const position = this.selectedView.elements.find(x => x.id === container.identifier)
            ?? { x: 0, y: 0 };
        const boundingBox = isBoundary
            ? getBoundingBox(
                this.selectedView,
                container.groups.flatMap(x => x.components).concat(container.components))
            : { ...position, width: defaultElementStyle.width, height: defaultElementStyle.height };
        const node = fromElement({
            element: container,
            position,
            isBoundary,
            parentId: params?.parentId,
            size: boundingBox,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitComponent(component: Component, params?: { parentId?: string }): void {
        const node = fromElement({
            element: component,
            position: this.selectedView.elements.find(x => x.id === component.identifier) ?? { x: 0, y: 0 },
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string }): void {
        const node = fromElement({
            element: deploymentNode,
            position: this.selectedView.elements.find(x => x.id === deploymentNode.identifier) ?? { x: 0, y: 0 },
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string }): void {
        const node = fromElement({
            element: infrastructureNode,
            position: this.selectedView.elements.find(x => x.id === infrastructureNode.identifier) ?? { x: 0, y: 0 },
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string }): void {
        const position = this.selectedView.elements.find(x => x.id === softwareSystemInstance.identifier)
            ?? { x: 0, y: 0 };
        const node = fromElement({
            element: softwareSystemInstance,
            position,
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitContainerInstance(containerInstance: ContainerInstance, params?: { parentId?: string }): void {
        const position = this.selectedView.elements.find(x => x.id === containerInstance.identifier)
            ?? { x: 0, y: 0 };
        const node = fromElement({
            element: containerInstance,
            position,
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitRelationship(relationship: Relationship): void {
        const edge = fromRelationship({
            relationship,
            styles: this.workspace.views.styles,
        });
        this.builder.addEdge(edge);
    }

    visitViews(views: Views): void {
        throw new Error("Method not implemented.");
    }

    visitStyles(styles: Styles): void {
        throw new Error("Method not implemented.");
    }

    visitElementStyle(elementStyle: ElementStyle): void {
        throw new Error("Method not implemented.");
    }

    visitRelationshipStyle(relationshipStyle: RelationshipStyle): void {
        throw new Error("Method not implemented.");
    }
}

const getBoundingBox = (selectedView: IView, elements: Array<{ identifier: string }>) => {
    const defaultPosition = { x: 0, y: 0 };
    const positions = elements
        .map(x => selectedView.elements.find(y => y.id === x.identifier) ?? defaultPosition);
    const padding = 100;
    const boundaries = positions.reduce((state, item) => ({
        min: {
            x: Math.min(state.min.x, item.x),
            y: Math.min(state.min.y, item.y),
        },
        max: {
            x: Math.max(state.max.x, item.x + defaultElementStyle.width),
            y: Math.max(state.max.y, item.y + defaultElementStyle.height),
        }
    }), {
        min: positions.at(0) ?? defaultPosition,
        max: positions.at(0) ?? defaultPosition
    });
    return {
        x: boundaries.min.x - padding / 2,
        y: boundaries.min.y - padding / 2,
        width: boundaries.max.x - boundaries.min.x + padding / 2,
        height: boundaries.max.y - boundaries.min.y + padding / 2,
    };
}

export type ElementParams<TElement extends Element = any> = {
    element: TElement;
    elementId?: string;
    parentId?: string;
    isBoundary?: boolean;
    position: Position;
    size?: Size;
    styles: Styles;
}

export const fromElement = (params: ElementParams): Node => {
    const getNoteTypeIfBoundary = (isBoundary: boolean) => {
        return isBoundary
            ? "boundary"
            : undefined;
    };

    const getNodeTypeByTag = (element: Element) => {
        return element.tags.some(x => x.name === Tag.DeploymentNode.name)
            ? "deploymentNode"
            : undefined;
    }

    return {
        id: params.elementId ?? params.element.identifier,
        type: getNoteTypeIfBoundary(params.isBoundary)
            ?? getNodeTypeByTag(params.element)
            ?? "element",
        data: {
            element: params.element,
            style: params.styles.element,
            height: params.size?.height,
            width: params.size?.width,
        },
        position: params.position,
        parentNode: params.parentId,
        extent: params.parentId ? "parent" : undefined,
        style: params.parentId ? undefined : { zIndex: -1 }
    }
}

export type RelationshipParams = {
    relationship: Relationship;
    styles: Styles;
}

export const fromRelationship = (params: RelationshipParams): Edge => {
    return {
        id: `${params.relationship.sourceIdentifier}_${params.relationship.targetIdentifier}`,
        type: "simplebezier",
        data: {
            relationship: params.relationship,
            style: params.styles.relationship,
        },
        source: params.relationship.sourceIdentifier,
        target: params.relationship.targetIdentifier
    };
}