import { ReactFlowJsonObject } from "@reactflow/core";
import ELK, { ElkNode } from "elkjs";

export class AutoLayout {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const mapChildren = (parentNode?: string) => {
            return reactFlow.nodes
                .filter(node => node.parentNode === parentNode)
                .map(node => ({
                    id: node.id,
                    height: (node.height ?? 200) * 2,
                    width: (node.width ?? 300) * 2,
                    children: mapChildren(node.id)
                }));
        }

        const mapEdges = () => {
            return reactFlow.edges
                .filter(edge => {
                    return !reactFlow.nodes.some(node => node.id === edge.source)
                        && !reactFlow.nodes.some(node => node.id === edge.target)
                })
                .map(edge => ({
                    id: edge.id,
                    sources: [edge.source],
                    targets: [edge.target]
                }));
        }

        const flatMapChildren = (children: Array<ElkNode>): Array<ElkNode> => {
            return children.flatMap(child => {
                return [
                    child,
                    ...flatMapChildren(child.children)
                ];
            });
        }

        const elk = new ELK();
        const elkGraph = await elk.layout({
            id: "root",
            // [ 'layered', 'stress', 'mrtree', 'radial', 'force', 'disco' ]
            layoutOptions: {
                "elk.algorithm": "layered",
                "elk.direction": "DOWN",
                "elk.layered.spacing.edgeNodeBetweenLayers": "100",
                "elk.layered.spacing.nodeNodeBetweenLayers": "100",
                "elk.layered.spacing.edgeNode": "100",
                "elk.layered.spacing.nodeNode": "100",
                "elk.layered.spacing.edgeEdge": "100",
                "spacing.componentComponent": "100",
                "spacing": "100"
            },
            children: mapChildren(undefined),
            edges: mapEdges()
        });

        const children = flatMapChildren(elkGraph.children)

        return {
            nodes: reactFlow.nodes.map(node => {
                const child = children.find(x => x.id === node.id);

                return {
                    ...node,
                    data: {
                        ...node.data,
                        width: child.width,
                        height: child.height,
                    },
                    position: {
                        x: child.x,
                        y: child.y
                    }
                }
            }),
            edges: reactFlow.edges,
            viewport: reactFlow.viewport
        };
    }
}