import { Edge, Node } from "@reactflow/core";
import {
    Component,
    Container,
    ContainerInstance,
    DeploymentNode,
    Element,
    Group,
    InfrastructureNode,
    IView,
    IVisitor,
    Person,
    Position,
    Relationship,
    SoftwareSystem,
    SoftwareSystemInstance,
    Styles,
    Tag,
    ViewType,
    Workspace,
} from "@structurizr/dsl";

export class ReactFlowVisitor implements IVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: IView,
        private nodes: Node[] = [],
        private edges: Edge[] = []
    ) {}

    visitGroup(group: Group) {
        const node = fromElement({
            element: group,
            position: this.selectedView.elements.find(x => x.id === group.identifier) ?? { x: 0, y: 0 },
            expanded: true,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitPerson(person: Person) {
        const node = fromElement({
            element: person,
            position: this.selectedView.elements.find(x => x.id === person.identifier) ?? { x: 0, y: 0 },
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem) {
        const node = fromElement({
            element: softwareSystem,
            position: this.selectedView.elements.find(x => x.id === softwareSystem.identifier) ?? { x: 0, y: 0 },
            expanded: this.selectedView.type === ViewType.Container && softwareSystem.identifier === this.selectedView.identifier,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitContainer(container: Container) {
        const node = fromElement({
            element: container,
            position: this.selectedView.elements.find(x => x.id === container.identifier) ?? { x: 0, y: 0 },
            expanded: this.selectedView.type === ViewType.Component && container.identifier === this.selectedView.identifier,
            parentId: this.selectedView.type === ViewType.Container ? this.selectedView.identifier : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitComponent(component: Component) {
        const node = fromElement({
            element: component,
            position: this.selectedView.elements.find(x => x.id === component.identifier) ?? { x: 0, y: 0 },
            parentId: this.selectedView.type === ViewType.Component ? this.selectedView.identifier : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode) {
        const node = fromElement({
            element: deploymentNode,
            position: this.selectedView.elements.find(x => x.id === deploymentNode.identifier) ?? { x: 0, y: 0 },
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }
    
    visitInfrastructureNode(infrastructureNode: InfrastructureNode) {

    }

    visitSoftwareSystemInstance(softwareSystemInstance: SoftwareSystemInstance) {
        
    }

    visitContainerInstance(containerInstance: ContainerInstance) {

    }

    visitRelationship(relationship: Relationship) {
        const edge = fromRelationship({
            relationship,
            styles: this.workspace.views.styles,
        });
        this.edges.push(edge);
    }

    getGraph() {
        return {
            nodes: this.nodes,
            edges: this.edges
        }
    };
}

export type ElementParams<TElement extends Element = any> = {
    element: TElement;
    parentId?: string;
    expanded?: boolean;
    position: Position;
    styles: Styles;
}

export const fromElement = (params: ElementParams): Node => {
    const { element, parentId, expanded, position, styles } = params;

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
        id: element.identifier,
        type: getNoteTypeIfBoundary(expanded)
            ?? getNodeTypeByTag(element)
            ?? "element",
        data: {
            element: element,
            style: styles.element,
        },
        position: position,
        parentNode: parentId,
        extent: parentId ? "parent" : undefined,
        style: parentId ? undefined : { zIndex: -1 }
    }
}

export type RelationshipParams = {
    relationship: Relationship;
    styles: Styles;
}

export const fromRelationship = (params: RelationshipParams): Edge => {
    const { relationship, styles } = params;

    return {
        id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
        type: "simplebezier",
        data: {
            relationship: relationship,
            style: styles.relationship,
        },
        source: relationship.sourceIdentifier,
        target: relationship.targetIdentifier
    };
}