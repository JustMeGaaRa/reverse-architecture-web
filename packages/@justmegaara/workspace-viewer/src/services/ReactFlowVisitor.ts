import {
    Component,
    Container,
    Layout,
    Person,
    Relationship,
    SoftwareSystem,
    ViewType,
    Workspace,
} from "@justmegaara/structurizr-dsl";
import { Edge, Node } from "@reactflow/core";
import { fromElement, fromRelationship } from "../utils/ReactFlow";
import { IReactFlowVisitor } from "./IReactFlowVisitor";

export class ReactFlowVisitor implements IReactFlowVisitor {
    constructor(
        private workspace: Workspace,
        private layout: Layout,
        private viewType: ViewType,
        private scopedElementId: string,
        private nodes: Node[] = [],
        private edges: Edge[] = []
    ) {}

    visitPerson(person: Person) {
        const node = fromElement({
            element: person,
            size: this.layout[person.identifier],
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }
    
    visitSoftwareSystem(softwareSystem: SoftwareSystem) {
        const node = fromElement({
            element: softwareSystem,
            size: this.layout[softwareSystem.identifier],
            expanded: this.viewType === "Container" && softwareSystem.identifier === this.scopedElementId,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitContainer(container: Container) {
        const node = fromElement({
            element: container,
            size: this.layout[container.identifier],
            expanded: this.viewType === "Component" && container.identifier === this.scopedElementId,
            parentId: this.viewType === "Container" ? this.scopedElementId : undefined,
            styles: this.workspace.views.styles,
        });
        this.nodes.push(node);
    }

    visitComponent(component: Component) {
        const node = fromElement({
            element: component,
            size: this.layout[component.identifier],
            parentId: this.viewType === "Component" ? this.scopedElementId : undefined,
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