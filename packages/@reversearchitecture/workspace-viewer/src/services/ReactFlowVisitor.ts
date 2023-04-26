import { Edge, Node } from "@reactflow/core";
import {
    Component,
    Container,
    DeploymentNode,
    IView,
    Person,
    Relationship,
    SoftwareSystem,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import { fromElement, fromRelationship } from "../utils/ReactFlow";
import { IReactFlowVisitor } from "./IReactFlowVisitor";

export class ReactFlowVisitor implements IReactFlowVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: IView,
        private nodes: Node[] = [],
        private edges: Edge[] = []
    ) {}

    visitPerson(person: Person) {
        const node = fromElement({
            element: person,
            size: this.selectedView.layout[person.identifier] ?? { x: 0, y: 0 },
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem) {
        const node = fromElement({
            element: softwareSystem,
            size: this.selectedView.layout[softwareSystem.identifier] ?? { x: 0, y: 0 },
            expanded: this.selectedView.type === ViewType.Container && softwareSystem.identifier === this.selectedView.identifier,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitContainer(container: Container) {
        const node = fromElement({
            element: container,
            size: this.selectedView.layout[container.identifier] ?? { x: 0, y: 0 },
            expanded: this.selectedView.type === ViewType.Component && container.identifier === this.selectedView.identifier,
            parentId: this.selectedView.type === ViewType.Container ? this.selectedView.identifier : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitComponent(component: Component) {
        const node = fromElement({
            element: component,
            size: this.selectedView.layout[component.identifier] ?? { x: 0, y: 0 },
            parentId: this.selectedView.type === ViewType.Component ? this.selectedView.identifier : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitDeploymentNode(deploymentNode: DeploymentNode) {
        const node = fromElement({
            element: deploymentNode,
            size: this.selectedView.layout[deploymentNode.identifier] ?? { x: 0, y: 0 },
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
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