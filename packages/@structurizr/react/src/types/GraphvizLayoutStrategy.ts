import { Graphviz } from "@hpcc-js/wasm";
import { Graph, Subgraph } from "@justmegaara/graphviz-dot";
import { Node, ReactFlowJsonObject } from "@reactflow/core";
import { Dimensions, IAutoLayoutStrategy } from "@structurizr/dsl";
import { ReactFlowNodeTypeNames } from "./ReactFlowNodeTypeNames";

type DotDraw = {
    op: "c" | "p";
    grad?: string;
    color?: string;
    points?: Array<[number, number]>;
}

type DotEdge = {
    head: number;
    pos: string;
    tail: number;
}

type DotCluster = {
    _draw_: Array<DotDraw>;
    bb: string;
    cluster: boolean;
    name: string;
    nodes: Array<number>;
    subgraphs?: Array<number>;
}

type DotNode = {
    _draw_: Array<DotDraw>;
    bb: string;
    name: string;
    pos: string;
}

type DotGraph = {
    directed: boolean;
    name: string;
    strict: boolean;
    bb: string;
    xdotversion: string;
    edges: Array<DotEdge>;
    objects: Array<DotCluster | DotNode>;
}

export class GraphvizLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const { nodes, edges } = reactFlow;

        const buildSubgraph = (node: Node, graph: Subgraph) => {
            const children = nodes.filter(x => x.parentNode === node.id);

            if (children.length > 0) {
                const subgraph = graph.addSubgraph(node.id, node.data?.label, true);
                children.forEach(child => buildSubgraph(child, subgraph));
            }
            else {
                graph.addNode(node.id, node.data?.label);
            }
        }

        const graph = new Graph("G");
        nodes.filter(node => node.parentNode === undefined).forEach(node => {
            const children = nodes.filter(x => x.parentNode === node.id);

            if (children.length > 0) {
                const subgraph = graph.addSubgraph(node.id, node.data?.label, true);
                children.forEach(child => buildSubgraph(child, subgraph));
            }
            else {
                graph.addNode(node.id, node.data?.label);
            }
        });
        edges.forEach(edge => {
            graph.addEdge(edge.source, edge.target, edge.data?.label);
        });
        
        const graphviz = await Graphviz.load();
        const graphDotSrc = graph.toString();
        const graphAutoLayout = JSON.parse(graphviz.dot(graphDotSrc, "json")) as DotGraph;

        const dimensionsAbsolute = graphAutoLayout.objects?.reduce((dimensions, obj) => {
            // NOTE: for some reason the dot parser sometimes randonly returns cluster as an object
            // so we need to filter out the preocessed objects
            if (dimensions[obj.name] !== undefined) return dimensions;

            const draw = obj._draw_.find(draw => draw.op === "p");

            const topLeft = draw?.points.reduce((min, point) => {
                return [Math.min(min[0], point[0]), Math.min(min[1], point[1])];
            }, draw?.points[0]) ?? [0, 0];
            const bottomRight = draw?.points.reduce((max, point) => {
                return [Math.max(max[0], point[0]), Math.max(max[1], point[1])];
            }, draw?.points[0]) ?? [0, 0];
            
            const position = { x: topLeft[0], y: topLeft[1] };
            const size = { width: bottomRight[0] - topLeft[0], height: bottomRight[1] - topLeft[1] };

            return { ...dimensions, [obj.name]: { ...position, ...size } };
        }, {} as Record<string, Dimensions>);
        
        const positionedNodes = nodes.map(node => {
            // NOTE: calculate the relative position for nodes inside a group
            const position = node.parentNode !== undefined
                ? {
                    x: dimensionsAbsolute[node.id].x - dimensionsAbsolute[node.parentNode].x,
                    y: dimensionsAbsolute[node.id].y - dimensionsAbsolute[node.parentNode].y
                }
                : {
                    x: dimensionsAbsolute[node.id].x,
                    y: dimensionsAbsolute[node.id].y
                };
            const size = node.type === ReactFlowNodeTypeNames.ViewElementGroup || node.type === ReactFlowNodeTypeNames.ViewElementBoundary
                ? {
                    width: dimensionsAbsolute[node.id].width,
                    height: dimensionsAbsolute[node.id].height
                }
                : {
                    width: node.width,
                    height: node.height
                };
            
            return { ...node, position, data: { ...node.data, ...size } };
        });

        return { ...reactFlow, nodes: positionedNodes, edges };
    }
}