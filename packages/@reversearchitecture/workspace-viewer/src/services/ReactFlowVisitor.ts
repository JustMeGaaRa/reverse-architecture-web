import { position } from "@chakra-ui/react";
import { Edge, Node } from "@reactflow/core";
import {
    Component,
    Container,
    ContainerInstance,
    defaultElementStyle,
    DeploymentNode,
    Element,
    ElementStyle,
    findContainer,
    findSoftwareSystem,
    foldStyles,
    Group,
    IElementPosition,
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
        private builder: ReactFlowJsonObjectBuilder,
        private defaultPosition: Position = { x: 0, y: 0 },
        private defaultPadding: number = 50
    ) { }

    visitWorkspace(workspace: Workspace): void {
        throw new Error("Method not implemented.");
    }

    visitModel(model: Model): void {
        throw new Error("Method not implemented.");
    }

    visitGroup(group: Group, params?: { parentId?: string }): void {
        const boundingBox = extendBoundingBox(
            foldBoundingBoxes(
                Array.from<{ identifier: string, tags: Tag[] }>([])
                    .concat(group.softwareSystems)
                    .concat(group.people)
                    .concat(group.containers)
                    .concat(group.components)
                    .map(element => extendElementBoundingBox(
                        this.workspace.views.styles.element,
                        this.selectedView.elements,
                        element,
                        this.defaultPadding
                    ))
            ), this.defaultPadding
        )
        
        const node = fromElement({
            elementId: group.identifier,
            element: group,
            isBoundary: true,
            parentId: params?.parentId,
            position: getPosition(boundingBox),
            size: getSize(boundingBox),
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitPerson(person: Person, params?: { parentId?: string }): void {
        const node = fromElement({
            element: person,
            position: this.selectedView.elements.find(x => x.id === person.identifier)
                ?? this.defaultPosition,
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string }): void {
        const getSoftwareSystemBoundingBox = (softwareSystem: SoftwareSystem) => {
            const containerBoundingBoxes = softwareSystem.containers.map(element => {
                return extendElementBoundingBox(
                    this.workspace.views.styles.element,
                    this.selectedView.elements,
                    element,
                    this.defaultPadding
                );
            });
            const groupBoundingBoxes = softwareSystem.groups.flatMap(group => {
                const groupBoundingBoxes = foldBoundingBoxes(group.containers.map(element => {
                    return extendElementBoundingBox(
                        this.workspace.views.styles.element,
                        this.selectedView.elements,
                        element,
                        this.defaultPadding
                    );
                }));
                return extendBoundingBox(groupBoundingBoxes, this.defaultPadding)
            });
            const softwareSystemBoundingBox = foldBoundingBoxes(containerBoundingBoxes.concat(groupBoundingBoxes));
            return extendBoundingBox(softwareSystemBoundingBox, this.defaultPadding);
        }
        
        const isBoundary = this.selectedView.type === ViewType.Container
            && softwareSystem.identifier === this.selectedView.identifier;
        const softwareSystemPosition = this.selectedView.elements.find(element => element.id === softwareSystem.identifier)
            ?? this.defaultPosition;
        const softwareSystemSize = { height: defaultElementStyle.height, width: defaultElementStyle.width };
        const boundingBox = isBoundary
            ? getSoftwareSystemBoundingBox(softwareSystem)
            : createBoundingBox(softwareSystemPosition, softwareSystemSize);
        
        const node = fromElement({
            element: softwareSystem,
            isBoundary,
            parentId: params?.parentId,
            position: isBoundary ? getPosition(boundingBox) : softwareSystemPosition,
            size: isBoundary ? getSize(boundingBox) : softwareSystemSize,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitContainer(container: Container, params?: { parentId?: string }): void {
        const getContainerBoundingBox = (container: Container) => {
            const componentBoundingBoxes = container.components.map(element => {
                return extendElementBoundingBox(
                    this.workspace.views.styles.element,
                    this.selectedView.elements,
                    element,
                    this.defaultPadding
                );
            });
            const groupBoundingBoxes = container.groups.flatMap(group => {
                const groupBoundingBoxes = foldBoundingBoxes(group.components.map(element => {
                    return extendElementBoundingBox(
                        this.workspace.views.styles.element,
                        this.selectedView.elements,
                        element,
                        this.defaultPadding
                    );
                }));
                return extendBoundingBox(groupBoundingBoxes, this.defaultPadding)
            });
            const containerBoundingBox = foldBoundingBoxes(componentBoundingBoxes.concat(groupBoundingBoxes));
            return extendBoundingBox(containerBoundingBox, this.defaultPadding);
        }

        const isBoundary = this.selectedView.type === ViewType.Component
            && container.identifier === this.selectedView.identifier;
        const containerPosition = this.selectedView.elements.find(element => element.id === container.identifier)
            ?? this.defaultPosition;
        const containerSize = { height: defaultElementStyle.height, width: defaultElementStyle.width };
        const boundingBox = isBoundary
            ? getContainerBoundingBox(container)
            : createBoundingBox(containerPosition, containerSize);
        
        const node = fromElement({
            element: container,
            isBoundary,
            parentId: params?.parentId,
            position: isBoundary ? getPosition(boundingBox) : containerPosition,
            size: isBoundary ? getSize(boundingBox) : containerSize,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitComponent(component: Component, params?: { parentId?: string }): void {
        const node = fromElement({
            element: component,
            position: this.selectedView.elements.find(x => x.id === component.identifier)
                ?? this.defaultPosition,
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string }): void {
        const getDepoymentNodeBoundingBox = (deploymentNode: DeploymentNode) => {
            const elementsBoundingBoxes = Array.from<ElementProps>([])
                .concat(deploymentNode.infrastructureNodes ?? [])
                .concat(deploymentNode.containerInstances
                    ?.map(instance => findContainer(this.workspace, instance.containerIdentifier)) ?? [])
                .concat(deploymentNode.softwareSystemInstances
                    ?.map(instance => findSoftwareSystem(this.workspace, instance.softwareSystemIdentifier)) ?? [])
                .map(element => {
                    return extendElementBoundingBox(
                        this.workspace.views.styles.element,
                        this.selectedView.elements,
                        element,
                        this.defaultPadding
                    );
                });

            const nestedBoundingBoxes = deploymentNode.deploymentNodes
                ?.map(getDepoymentNodeBoundingBox) ?? [];
            
            const deploymentNodeBoundingBox = foldBoundingBoxes(elementsBoundingBoxes.concat(nestedBoundingBoxes));
            return extendBoundingBox(deploymentNodeBoundingBox, this.defaultPadding);
        }
        
        const boundingBox = getDepoymentNodeBoundingBox(deploymentNode);

        const node = fromElement({
            element: deploymentNode,
            parentId: params?.parentId,
            position: getPosition(boundingBox),
            size: getSize(boundingBox),
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string }): void {
        const node = fromElement({
            element: infrastructureNode,
            position: this.selectedView.elements.find(x => x.id === infrastructureNode.identifier)
                ?? this.defaultPosition,
            parentId: params?.parentId,
            styles: this.workspace.views.styles,
        });
        this.builder.addNode(node);
    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance, params?: { parentId?: string }): void {
        const position = this.selectedView.elements.find(x => x.id === softwareSystemInstance.identifier)
            ?? this.defaultPosition;
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
            ?? this.defaultPosition;
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

// TODO: cache the bounding boxes to resuse them and optimize computation time required
const boundingBoxes: { [id: string]: BoundingBox } = {}

type ElementProps = {
    identifier: string,
    tags: Tag[]
}

type BoundingBox = { minX: number, minY: number, maxX: number, maxY: number };

const createBoundingBox = (position: Position, size: Size): BoundingBox => {
    return {
        minX: position.x,
        minY: position.y,
        maxX: position.x + size.width,
        maxY: position.y + size.height,
    }
}

const extendBoundingBox = (boundingBox: BoundingBox, shift: number): BoundingBox => {
    return {
        minX: boundingBox.minX - shift,
        minY: boundingBox.minY - shift,
        maxX: boundingBox.maxX + shift,
        maxY: boundingBox.maxY + shift,
    }
}

const foldBoundingBoxes = (boundingBoxes: Array<BoundingBox>): BoundingBox => {
    return boundingBoxes.reduce((state, box) => ({
        minX: Math.min(state.minX, box.minX),
        minY: Math.min(state.minY, box.minY),
        maxY: Math.max(state.maxY, box.maxY),
        maxX: Math.max(state.maxX, box.maxX),
    }), boundingBoxes?.at(0) ?? { minX: 0, minY: 0, maxY: 0, maxX: 0 });
}

const createElementBoundingBox = (
    styles: ElementStyle,
    element: ElementProps,
    position: Position
): BoundingBox => {
    const style = foldStyles(
        defaultElementStyle,
        styles,
        element.tags?.reverse() ?? []
    );
    return {
        minX: position.x,
        minY: position.y,
        maxX: position.x + style.width,
        maxY: position.y + style.height,
    }
}

const extendElementBoundingBox = (
    styles: ElementStyle,
    positions: IElementPosition[],
    element: ElementProps,
    padding: number
): BoundingBox => {
    const defaultPosition = { x: 0, y: 0 };
    const position = positions.find(y => y.id === element.identifier) ?? defaultPosition;
    const elementBoundingBox = createElementBoundingBox(styles, element, position);
    return extendBoundingBox(elementBoundingBox, padding);
}

const getPosition = (boundingBox: BoundingBox): Position => {
    return {
        x: boundingBox.minX,
        y: boundingBox.minY,
    }
}

const getSize = (boundingBox: BoundingBox): Size => {
    return {
        height: boundingBox.maxY - boundingBox.minY,
        width: boundingBox.maxX - boundingBox.minX,
    }
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