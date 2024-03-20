import { Node, Edge, ReactFlowJsonObject } from "@reactflow/core";
import { Position } from "@structurizr/dsl";
import ELK, { ElkNode } from "elkjs";
import { BoundingBox } from "./BoundingBox";

export interface IAutoLayoutStrategy<T> {
    execute(graph: T): Promise<T>;
}

export class ElkjsAutoLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const mapChildren = (parentNode?: string) => {
            return reactFlow.nodes
                .filter(node => node.parentNode === parentNode)
                .map(node => ({
                    id: node.id,
                    height: (node.height ?? 200) * 2,
                    width: (node.width ?? 200) * 2,
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

export class CustomAutoLayoutStrategy implements IAutoLayoutStrategy<ReactFlowJsonObject> {
    constructor() { }

    async execute(reactFlow: ReactFlowJsonObject): Promise<ReactFlowJsonObject> {
        const nodeDefaultHeight = 70;
        const nodeDefaultWidth = 300;
        const nodeMarginY = 64;
        const nodeMarginX = 32;
    
        const reactFlowGraph = ReactFlowGraph.fromReactFlowObject(reactFlow);
        const rootNodes = reactFlowGraph.getRootNodes();
        const nodePositions = new Map<string, Position>();
    
        const layoutTree = (root: Node, offset: BoundingBox, depth: number): BoundingBox => {
            const children = reactFlowGraph.getChildNodes(root.id);
    
            if (children.length == 0) {
                const position = {
                    x: offset.x2,
                    y: (nodeDefaultHeight + nodeMarginY) * depth
                }
                const rootBox = new BoundingBox({
                    x1: position.x,
                    y1: position.y,
                    x2: position.x + nodeDefaultWidth,
                    y2: position.y + nodeDefaultHeight
                });
                nodePositions.set(root.id, position);
                return rootBox.marginX(nodeMarginX);
            }
    
            let previousOffset = offset;
            const childBoxes = children.map(child => {
                previousOffset = layoutTree(child, previousOffset, depth + 1);
                return previousOffset;
            });
            
            const childTotalBox = BoundingBox.combine(childBoxes);
            const position = {
                x: offset.x1 + childTotalBox.width / 2 - nodeDefaultWidth / 2,
                y: (nodeDefaultHeight + nodeMarginY) * depth
            }
            const rootBox = new BoundingBox({
                x1: position.x,
                y1: position.y,
                x2: position.x + nodeDefaultWidth,
                y2: position.y + nodeDefaultHeight
            });
            nodePositions.set(root.id, position);
            return BoundingBox.combine([rootBox, childTotalBox]);
        }
    
        const initialOffset = BoundingBox.Empty;
        layoutTree(rootNodes[0], initialOffset, 0);
    
        return Promise.resolve<ReactFlowJsonObject>({
            ...reactFlow,
            nodes: reactFlow.nodes.map(node => ({
                ...node,
                position: nodePositions.has(node.id)
                    ? nodePositions.get(node.id)
                    : { x: 0, y: 0 }
            })),
            edges: reactFlow.edges
        });
    }
}

class ReactFlowGraph {
    private nodesMap: Map<string, Node>;
    private nodeIncomingEdgesMap: Map<string, Edge[]>;
    private nodeOutgoingEdgesMap: Map<string, Edge[]>;

    constructor(
        private readonly nodes: Node[],
        private readonly edges: Edge[]
    ) {
        this.nodesMap = new Map<string, Node>(nodes.map(node => [node.id, node]));
        this.nodeIncomingEdgesMap = new Map<string, Edge[]>(nodes.map(node => [node.id, edges.filter(edge => edge.target === node.id)]));
        this.nodeOutgoingEdgesMap = new Map<string, Edge[]>(nodes.map(node => [node.id, edges.filter(edge => edge.source === node.id)]));
    }

    static fromReactFlowObject(reactFlowObject: { nodes: Node[], edges: Edge[] }) {
        return new ReactFlowGraph(
            reactFlowObject.nodes.filter(x => !x.hidden),
            reactFlowObject.edges.filter(x => !x.hidden)
        );
    }

    public hasIncomingEdges(nodeId: string) {
        return this.nodeIncomingEdgesMap.get(nodeId).length > 0;
    }

    public hasOutgoingEdges(nodeId: string) {
        return this.nodeOutgoingEdgesMap.get(nodeId).length > 0;
    }

    public getChildNodes(nodeId: string) {
        return this.nodeOutgoingEdgesMap.get(nodeId).map(edge => this.nodesMap.get(edge.target));
    }

    public getRootNodes() {
        return this.nodes.filter(node => !this.hasIncomingEdges(node.id));
    }
}