import { Node, Edge, ReactFlowJsonObject } from "@reactflow/core";
import { IBuilder } from "@structurizr/dsl";

export class ReactFlowBuilder implements IBuilder<ReactFlowJsonObject> {
    constructor(
        private nodes: Array<Node> = [],
        private edges: Array<Edge> = [],
    ) { }

    build(): ReactFlowJsonObject {
        return {
            nodes: this.nodes,
            edges: this.edges,
            viewport: {
                x: 0,
                y: 0,
                zoom: 1
            }
        }
    }

    addNode(node: Node): void {
        this.nodes.push(node);
    }

    addEdge(edge: Edge): void {
        this.edges.push(edge);
    }
}