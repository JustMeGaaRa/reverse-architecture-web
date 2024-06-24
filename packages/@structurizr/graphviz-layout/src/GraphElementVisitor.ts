import { IBuilder, IComponent, IContainer, IContainerInstance, IDeploymentNode, IElementVisitor, IGroup, IInfrastructureNode, IPerson, IRelationship, ISoftwareSystem, ISoftwareSystemInstance, IWorkspaceSnapshot } from "@structurizr/dsl";

export type Vertex = {
    id: string;
    parentNode?: string;
    x: number;
    y: number;
    height: number;
    width: number;
    label?: string;
};

export type Edge = {
    id: string;
    sourceId: string;
    targetId: string;
    label?: string;
};

export type Graph = {
    nodes: Array<Vertex>;
    edges: Array<Edge>;
};

export type GraphElement =
    | Vertex
    | Edge;

export class GraphBuilder implements IBuilder<Graph> {
    constructor(
        private readonly nodes: Array<Vertex> = [],
        private readonly edges: Array<Edge> = [],
    ) { }

    build(): Graph {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }

    addNode(node: Vertex): Vertex {
        this.nodes.push(node);
        return node;
    }

    addEdge(edge: Edge): Edge {
        this.edges.push(edge);
        return edge;
    }
}

export class GraphElementVisitor implements IElementVisitor<GraphElement> {
    constructor(
        private readonly builder: GraphBuilder
    ) {}
    
    visitWorkspace(workspace: IWorkspaceSnapshot, params?: { children?: any[]; }): GraphElement {
        return this.builder.addNode({ 
            id: "workspace",
            label: workspace.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitGroup(group: IGroup, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({ 
            id: group.identifier,
            parentNode: params?.parentId,
            label: group.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitPerson(person: IPerson, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: person.identifier,
            parentNode: params?.parentId,
            label: person.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: softwareSystem.identifier,
            parentNode: params?.parentId,
            label: softwareSystem.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitContainer(container: IContainer, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: container.identifier,
            parentNode: params?.parentId,
            label: container.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitComponent(component: IComponent, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: component.identifier,
            parentNode: params?.parentId,
            label: component.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: deploymentNode.identifier,
            parentNode: params?.parentId,
            label: deploymentNode.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: infrastructureNode.identifier,
            parentNode: params?.parentId,
            label: infrastructureNode.name,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: softwareSystemInstance.identifier as any,
            parentNode: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return this.builder.addNode({
            id: containerInstance.identifier as any,
            parentNode: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        });
    }
    visitRelationship(relationship: IRelationship, params?: { children?: any[]; }): GraphElement {
        return this.builder.addEdge({
            id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
            sourceId: relationship.sourceIdentifier,
            targetId: relationship.targetIdentifier,
            label: relationship.description
        });
    }
}
