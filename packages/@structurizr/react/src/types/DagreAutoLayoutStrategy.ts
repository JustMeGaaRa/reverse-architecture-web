import Dagre, { graphlib } from "@dagrejs/dagre";
import { ReactFlowJsonObject } from "@reactflow/core";
import { IAutoLayoutStrategy } from "@structurizr/dsl";

export class DagreAutoLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const graph = new graphlib.Graph()
            .setDefaultEdgeLabel(() => ({}))
            .setGraph({ rankdir: "TB" });

        reactFlow.edges.forEach((edge) => graph.setEdge(edge.source, edge.target));
        reactFlow.nodes.forEach((node) => graph.setNode(node.id, node));

        Dagre.layout(graph, { rankdir: "TB" });

        return {
            ...reactFlow,
            nodes: reactFlow.nodes.map((node) => {
                const { x, y } = graph.node(node.id);
                return { ...node, position: { x, y } };
            }),
            edges: reactFlow.edges,
        };
    }
}