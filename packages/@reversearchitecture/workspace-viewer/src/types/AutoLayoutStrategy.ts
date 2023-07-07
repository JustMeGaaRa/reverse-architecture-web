import { ReactFlowJsonObject } from "@reactflow/core";
import { IElementPosition } from "@structurizr/dsl";
import ELK, { ElkNode } from "elkjs";

export interface IGraph {
    nodes: Array<{ id: string; height: number; width: number; parentId?: string }>;
    edges: Array<{ id: string; source: string; target: string; }>;
}

export class AutoLayout {
    constructor(

    ) { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const getChildren = (parentNode?: string) => {
            return reactFlow.nodes
                .filter(node => node.parentNode === parentNode)
                .map(node => ({
                    id: node.id,
                    height: (node.height ?? 200) * 2,
                    width: (node.width ?? 300) * 2,
                    children: getChildren(node.id)
                }));
        }

        const getEdges = () => {
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

        const getPositions = (children: Array<ElkNode>) => {
            return children.flatMap(child => {
                const childPositions = getPositions(child.children);
                return [
                    { id: child.id, x: child.x, y: child.y },
                    ...childPositions
                ];
            });
        }

        const elk = new ELK();
        const elkGraph = await elk.layout({
            id: "root",
            // [ 'layered', 'stress', 'mrtree', 'radial', 'force', 'disco' ]
            layoutOptions: { "elk.algorithm": "stress" },
            children: getChildren(undefined),
            edges: getEdges()
        });

        const positions = getPositions(elkGraph.children)

        return {
            nodes: reactFlow.nodes.map(node => ({
                ...node,
                position: positions.find(x => x.id === node.id)
            })),
            edges: reactFlow.edges,
            viewport: reactFlow.viewport
        }
    }
}