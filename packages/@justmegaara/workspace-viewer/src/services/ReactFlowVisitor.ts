import {
    Component,
    Container,
    GenericView,
    Person,
    Relationship,
    SoftwareSystem,
    Workspace,
} from "@justmegaara/structurizr-dsl";
import { Edge, Node } from "@reactflow/core";
import { fromElement, fromRelationship } from "../utils/ReactFlow";
import { IReactFlowVisitor } from "./IReactFlowVisitor";

export class ReactFlowVisitor implements IReactFlowVisitor {
    constructor(
        private workspace: Workspace,
        private selectedView: GenericView,
        private nodes: Node[] = [],
        private edges: Edge[] = []
    ) {}

    visitPerson(person: Person) {
        const node = fromElement({
            element: person,
            size: this.selectedView.layout[person.identifier],
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem) {
        const node = fromElement({
            element: softwareSystem,
            size: this.selectedView.layout[softwareSystem.identifier],
            expanded: this.selectedView.type === "Container" && softwareSystem.identifier === this.selectedView.identifier,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitContainer(container: Container) {
        const node = fromElement({
            element: container,
            size: this.selectedView.layout[container.identifier],
            expanded: this.selectedView.type === "Component" && container.identifier === this.selectedView.identifier,
            parentId: this.selectedView.type === "Container" ? this.selectedView.identifier : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitComponent(component: Component) {
        const node = fromElement({
            element: component,
            size: this.selectedView.layout[component.identifier],
            parentId: this.selectedView.type === "Component" ? this.selectedView.identifier : undefined,
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

    getReactFlow() {
        return {
            nodes: this.nodes,
            edges: this.edges
        }
    };
}