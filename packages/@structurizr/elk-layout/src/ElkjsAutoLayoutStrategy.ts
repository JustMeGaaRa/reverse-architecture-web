import { ReactFlowJsonObject } from "@reactflow/core";
import { IAutoLayoutStrategy } from "@structurizr/dsl";
import ELK, { ElkNode } from "elkjs";

export class ElkjsAutoLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const mapChildren = (parentNode?: string) => {
            return reactFlow.nodes
                .filter(node => node.parentNode === parentNode)
                .map(node => ({
                    id: node.id,
                    height: (node.height ?? 200) * 1.5,
                    width: (node.width ?? 200) * 1.5,
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