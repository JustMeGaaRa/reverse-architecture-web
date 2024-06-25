import { Graphviz } from "@hpcc-js/wasm";
import { Graph, Subgraph } from "@justmegaara/graphviz-dot";
import { Dimensions, IAutoLayoutStrategy } from "@structurizr/dsl";
import { Edge, Vertex } from "./GraphElementVisitor";

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
    cluster: boolean;
    name: string;
    nodes: Array<number>;
    subgraphs?: Array<number>;
}

type DotNode = {
    _draw_: Array<DotDraw>;
    name: string;
    pos: string;
}

type DotGraph = {
    directed: boolean;
    name: string;
    edges: Array<DotEdge>;
    objects: Array<DotCluster | DotNode>;
}

export class GraphvizLayoutStrategy implements IAutoLayoutStrategy<{ nodes: Vertex[]; edges: Edge[] }> {
    constructor() { }

    async execute(graph: { nodes: Vertex[]; edges: Edge[] }): Promise<{ nodes: Vertex[]; edges: Edge[] }> {
        const { nodes, edges } = graph;

        const buildSubgraph = (node: Vertex, graph: Subgraph) => {
            const children = nodes.filter(x => x.parentNode === node.id);

            if (children.length > 0) {
                const subgraph = graph.addSubgraph(node.id, node.label, true);
                children.forEach(child => buildSubgraph(child, subgraph));
            }
            else {
                graph.addNode(node.id, node.label);
            }
        }

        const graphvizGraph = new Graph("G");
        nodes.filter(node => node.parentNode === undefined).forEach(node => {
            const children = nodes.filter(x => x.parentNode === node.id);

            if (children.length > 0) {
                const subgraph = graphvizGraph.addSubgraph(node.id, node.label, true);
                children.forEach(child => buildSubgraph(child, subgraph));
            }
            else {
                graphvizGraph.addNode(node.id, node.label);
            }
        });
        edges.forEach(edge => {
            graphvizGraph.addEdge(edge.sourceId, edge.targetId, edge.label);
        });
        
        const graphviz = await Graphviz.load();
        const graphDotSrc = graphvizGraph.toString();
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
            const size = nodes.some(x => x.parentNode === node.id)
                ? {
                    width: dimensionsAbsolute[node.id].width,
                    height: dimensionsAbsolute[node.id].height
                }
                : {
                    width: node.width,
                    height: node.height
                };
            
            return { ...node, ...position, ...size };
        });

        // TODO: flip the y axis on the layout
        // TODO: parse ajd return bending points for edges
        return { ...graph, nodes: positionedNodes, edges };
    }
}